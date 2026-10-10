# SGO Web — Website SGO Việt Nam

Website dịch vụ của SGO Việt Nam: giới thiệu danh mục dịch vụ, bảng giá, FAQ, tin tức,
liên hệ và giỏ hàng thanh toán.

Xây dựng bằng **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4**.
Toàn bộ nội dung (dịch vụ, bảng giá, FAQ, bài viết, thông tin công ty) được lấy động
từ **Core Platform Backend** (`sgodata_web`) qua REST API — không hard-code trong repo này,
trừ dữ liệu FAQ dự phòng ở `src/data/default-faqs.ts`.

## 1. Stack

| Thành phần | Phiên bản | Ghi chú |
| --- | --- | --- |
| Next.js | 16.3.2 | App Router, React Server Components, rewrite trong `next.config.ts` |
| React | 19.2.8 | |
| TypeScript | 5.x | `strict: true`, alias `@/*` → `./src/*` |
| Tailwind CSS | 4.x | qua `@tailwindcss/postcss` (`postcss.config.mjs`) |
| axios | 1.20 | HTTP client duy nhất, đi qua `src/shared/client.ts` |
| jodit-react | 5.5 | Rich-text editor (dùng cho phần nội dung soạn thảo) |
| ESLint | 9 | `eslint-config-next` (flat config `eslint.config.mjs`) |

## 2. Yêu cầu môi trường

- **Node.js 22 trở lên** (khuyến nghị Node 22 LTS; máy phát triển hiện tại dùng Node 24) và npm.
- **Backend Core Platform** đang chạy và truy cập được — mặc định `http://localhost:8080`.
  Backend nằm ở repo riêng `sgodata_web` (Spring Boot + PostgreSQL); xem hướng dẫn build
  trong README của repo đó.

## 3. Cài đặt và chạy local

```bash
npm ci
```

Tạo file `.env.local` ở gốc repo (bắt buộc — `.env*` đã bị `.gitignore`, nên mỗi máy phải tự tạo):

```dotenv
# URL kết nối tới Backend API
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Chạy dev server:

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

> `NEXT_PUBLIC_API_URL` được nhúng vào bundle lúc **build**, không đọc lại lúc runtime.
> Khi trỏ sang môi trường khác (staging/production) phải build lại, không chỉ sửa biến môi trường.

## 4. Script

| Lệnh | Tác dụng | Trạng thái hiện tại |
| --- | --- | --- |
| `npm run dev` | Dev server có hot reload tại cổng 3000 | OK |
| `npm run build` | Build production (`.next/`, Turbopack) | ⚠️ Dừng ở bước type-check — xem §10 |
| `npm run start` | Chạy bản đã build (`next start`) | Cần build thành công trước |
| `npm run lint` | Kiểm tra ESLint | ⚠️ 10 error + 23 warning có sẵn — xem §10 |

Chưa có bộ test tự động trong repo; `docs/BACKEND_VERIFICATION.md` ghi lại các lần
kiểm chứng API thủ công. `next build` đã bật sẵn type-check nên lỗi TypeScript trong
`src/` chặn build production — cần chạy `npx tsc --noEmit` để thấy toàn bộ danh sách.

## 5. Cấu trúc thư mục

```
sgo-web/
├── src/
│   ├── app/                     # App Router — 29 page, mỗi route một thư mục
│   │   ├── [serviceCode]/       # Route động cho dịch vụ chưa có trang riêng
│   │   ├── danh-muc-dich-vu/    # Danh mục dịch vụ (provision catalog)
│   │   ├── web/ vr360/ erp/ pos/ zns/ qr-code/ email/ cloud-server/
│   │   ├── ha-tang/ truy-xuat-nguon-goc/ hop-dong-dien-tu/ hop-dong/
│   │   ├── data-bi/ du-lieu-bi/ ban-quyen/
│   │   ├── gio-hang/ cart/ cart/basket/          # Giỏ hàng & thanh toán
│   │   ├── tin-tuc/ hoi-dap/ faq/ lien-he/ gioi-thieu/ about/
│   │   └── layout.tsx           # Root layout
│   ├── components/              # UI chia theo nhóm chức năng
│   │   ├── home/ layout/ shared/ cart/ provision-catalog/
│   │   └── web/ vr360/ erp/ pos/ zns/ ha-tang/ …   # theo từng trang dịch vụ
│   ├── hooks/                   # Vòng đời async của React (useAsyncData → useProvisions, …)
│   ├── shared/                  # Tầng dữ liệu: client.ts, provision.ts, news.ts, company-info.ts
│   ├── lib/                     # cache.ts (TTL + cacheKey), faq-jsonld.ts
│   └── data/                    # default-faqs.ts — FAQ dự phòng khi backend chưa có dữ liệu
├── docs/                        # Tài liệu kỹ thuật (xem §9)
├── public/                      # Asset tĩnh
├── openapi.json                 # Snapshot OpenAPI của backend, tra cứu contract khi code
├── next.config.ts               # Rewrite /qr-code.html → /qr-code
└── AGENTS.md / CLAUDE.md        # Quy tắc do `next dev` sinh ra (xem §8)
```

## 6. Kiến trúc tầng dữ liệu

Bốn lớp, mỗi lớp một việc — chi tiết đầy đủ ở [docs/DATA_FLOW.md](docs/DATA_FLOW.md):

```
client.ts   →  cache.ts   →  shared/*.ts   →  hooks/*
(vận chuyển)   (cache TTL)    (domain thuần)   (vòng đời React)   →  components
```

1. **`src/shared/client.ts`** — axios instance duy nhất, chuẩn hoá lỗi RFC 7807
   (`{ code, detail, status }`) về `ApiResponse<T>`, và **single-flight cho GET**:
   nhiều component mount cùng lúc gọi cùng endpoint thì chỉ có một HTTP request.
   Áp dụng cho `GET`; `POST/PUT/PATCH/DELETE` cố ý không gộp.
2. **`src/lib/cache.ts`** — `SimpleCache` theo TTL + `cacheKey` tập trung.
3. **`src/shared/provision.ts` | `news.ts` | `company-info.ts`** — model, helper thuần
   (dựng cây category/service, chuẩn hoá payload/giá) và API wrapper. Không phụ thuộc React
   nên dùng chung được cho cả hook, prefetch và server component.
4. **`src/hooks/*`** — chỉ sở hữu vòng đời async: `useAsyncData` là nền, phía trên là
   `useProvisions`, `useProvisionPricing`, `useProvisionContent`, `useProvisionFaq`,
   `usePrefetch`.

Cache key dùng chung (cơ chế khử request trùng lặp):

| Key | Nơi ghi | TTL |
| --- | --- | --- |
| `provisions:all` | `useProvisions()`, `loadProvisions()`, `usePrefetch()` | 5 phút |
| `provisions:active` | `useProvisions({ activeOnly: true })` (NavBar) | 5 phút |
| `pricing:{code}` | `useProvisionPricing()` | 60 giây |
| `content:{provisionId}` | `useProvisionContent()` | 10 phút |
| `contents:{id1,id2,…}` | `useMultipleContents()` (trang `/hoi-dap`) | 10 phút |

## 7. API backend đang sử dụng

| Endpoint | Dùng cho | Nơi gọi |
| --- | --- | --- |
| `GET /api/v1/provision` | Toàn bộ dịch vụ (navbar, trang chủ, danh mục) | `shared/provision.ts` |
| `GET /api/v1/provision/active` | Menu — chỉ provision đang ACTIVE | `shared/provision.ts` |
| `GET /api/v1/provision-services` | Bảng giá dịch vụ | `shared/provision.ts` |
| `GET /api/v1/provision-details/{provisionId}` | Nội dung HTML + SEO + FAQ của dịch vụ | `hooks/useProvisionContent.ts` |
| `GET /api/v1/news`, `GET /api/v1/news/articles` | Tin tức, bài viết | `shared/news.ts` |
| `GET /api/v1/company-info` | Thông tin công ty (footer, trang liên hệ) | `shared/company-info.ts` |
| `POST /api/v1/consultation` | Form đăng ký tư vấn / liên hệ | `shared/client.ts` → `submitConsultation()` |
| `POST /api/v1/orders/create` | Tạo đơn từ giỏ hàng | `components/cart/CheckoutModal.tsx` |
| `POST /api/v1/payment/create` | Khởi tạo thanh toán (VietQR) | `components/cart/CheckoutModal.tsx` |

Quy ước dữ liệu provision (`platform.provisions`):

- `type = "category"` → nhóm dịch vụ, có thể chứa provision con.
- `type = "service"` → provision lá, là nơi gắn bảng giá (`provision_services`).
- `type = "service-filter"` → lá dùng làm bộ lọc; frontend xử lý như `service`.
- Thiếu `type` ⇒ tạm coi là `category` để menu không rỗng (tương thích ngược).

Backend trả payload thuần (không bọc envelope) và lỗi theo problem-json. Riêng `404`
(hoặc `500` với `/api/v1/provision-details/…`) được coi là "không có dữ liệu" —
`{ success: true, data: null }` — để UI chuyển sang fallback thay vì báo lỗi hệ thống.

## 8. Quy ước code

- UI và comment viết bằng **tiếng Việt**, giữ nhất quán với toàn repo.
- Component **không gọi axios trực tiếp**; mọi truy cập dữ liệu đi qua `src/shared/*` + `src/hooks/*`.
- Logic thuần (sắp xếp, gom cây, chuẩn hoá giá) đặt ở `src/shared/`, không đặt trong component.
- import dùng alias `@/…` (xem `tsconfig.json`).
- `AGENTS.md` được `next dev` tự sinh và cảnh báo: bản Next.js này có breaking changes so với
  dữ liệu huấn luyện — đọc `node_modules/next/dist/docs/` trước khi viết code liên quan Next.

## 9. Tài liệu

| Tài liệu | Nội dung |
| --- | --- |
| [docs/DATA_FLOW.md](docs/DATA_FLOW.md) | Luồng dữ liệu backend → frontend, 4 lớp, bảng cache key |
| [docs/FAQ_API_INTEGRATION.md](docs/FAQ_API_INTEGRATION.md) | Tích hợp FAQ từ API, hook/component, chiến lược fallback, JSON-LD |
| [docs/BACKEND_VERIFICATION.md](docs/BACKEND_VERIFICATION.md) | Kết quả kiểm chứng từng endpoint (2026-10-08) |

`openapi.json` ở gốc là bản snapshot spec của backend, dùng để tra cứu contract khi code.

## 10. Tình trạng đã biết

### Chặn build

- **`npm run build` thất bại ở bước type-check** — 3 lỗi TypeScript trong
  `src/components/cart/CheckoutModal.tsx` (dòng 106, 109–111): file này **khai báo lại**
  interface `CartItem` thay vì import bản chuẩn từ `src/components/cart/CartItemList.tsx`,
  nên thiếu `moduleServiceId` và `config` chỉ còn là `Record<string, unknown>`.
  Sửa đúng cách là xoá interface trùng và import `CartItem` từ `CartItemList.tsx`.
- **`npm run lint` trả exit code 1** với 10 error + 23 warning có sẵn, tập trung ở
  `react-hooks/set-state-in-effect` (`JoditEditorWrapper.tsx`), `no-explicit-any`,
  `@next/next/no-html-link-for-pages` (`NavBar.tsx`, `InfraServices.tsx`) và `no-img-element`.
  Đây là nợ kỹ thuật có trước, không phải do build.

### Dữ liệu backend

- `GET /api/v1/provision-details/{id}` trả **404 cho toàn bộ provision** (backend chưa seed dữ liệu),
  nên FAQ hiện chạy bằng fallback `src/data/default-faqs.ts` và hiển thị badge "Đang hiển thị nội dung mẫu".
- `GET /api/v1/provision-services/provision/{id}` **luôn rỗng với category** — bảng giá phải lấy từ provision lá.
- Một vài đường dẫn trong tài liệu cũ (`scripts/seed_faq_data.sql`, `scripts/README_FAQ_SEED.md`)
  không còn tồn tại trong repo; thư mục `scripts/` hiện đang trống.

## 11. Build và triển khai

```bash
npm run build        # hiện đang dừng ở type-check, xem §10
npm run start        # phục vụ bản build tại cổng 3000
```

- Nhớ set `NEXT_PUBLIC_API_URL` trỏ tới backend của môi trường đích **trước khi build**.
- Dev server và bản production mặc định dùng cổng `3000`;
  frontend cũ trong repo backend (`sgodata_web/frontend`) dùng cổng `3001` nên có thể chạy song song.
