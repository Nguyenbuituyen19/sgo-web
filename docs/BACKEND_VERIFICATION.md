# Backend API Verification Report

- **Ngày kiểm chứng:** 2026-10-08
- **Backend URL:** `http://localhost:8080` (lấy từ `NEXT_PUBLIC_API_URL` trong `.env.local`)
- **Cách chạy:** script Node `fetch` (máy không có `jq`), đối chiếu với
  `normalizeProvisionService()` trong `src/shared/provision.ts`
- **Dữ liệu thô:** lưu tại `%TEMP%\provisions.json` và `%TEMP%\services.json`

## Tổng kết

| # | Endpoint | Kết quả | Ghi chú |
| --- | --- | --- | --- |
| 1 | `GET /api/v1/provision` | ⚠️ | 200, 34 items — **có lẫn 2 bản DRAFT** |
| 2 | `GET /api/v1/provision/active` | ✅ | 200, 32 items, lọc DRAFT đúng |
| 3 | `GET /api/v1/provision-services` | ✅ | 200, 123 items |
| 4 | `GET /api/v1/provision-services/provision/{id}` | ⚠️ | 200 nhưng **luôn rỗng với category** |
| 5 | `GET /api/v1/provision-details/{id}` | ❌ | **404 cho toàn bộ 34 provision** |

- Endpoint test: 5
- Đạt: 2
- Đạt có cảnh báo: 3
- Lỗi: 1 (endpoint details chưa có dữ liệu)

## Chi tiết

### 1. `GET /api/v1/provision` ⚠️

```
Status: 200
Content-Type: application/json
Items: 34
```

Mẫu thực tế:

```json
{
  "id": "10000000-0000-0000-0000-000000000004",
  "code": "web",
  "name": "Thiết kế Website Theo Yêu Cầu",
  "description": "Website chuẩn SEO, giao diện độc quyền mượt mà và tối ưu chuyển đổi",
  "status": "ACTIVE",
  "type": "category",
  "displayOrder": 0,
  "createdAt": "2026-10-01T05:13:01.482468Z"
}
```

Kiểm tra cấu trúc:

| Hạng mục | Kết quả |
| --- | --- |
| Là array | ✅ |
| Có `id`, `code`, `name`, `status`, `type` | ✅ |
| `type` | ✅ `category` (12) / `service` (20) / `service-filter` (2) |
| `status` | ⚠️ `ACTIVE` (32) / `DRAFT` (2) |
| `parentId` | ✅ null (12 gốc) / có giá trị (22 con) |
| `slug` | ⚠️ thiếu ở 9/34 |
| Có provision `code="web"` | ✅ |
| Field thừa | `displayOrder`, `createdAt` |

**Vấn đề:**

- Trả về cả bản `DRAFT` (`ef`, `vdfvsdfv`). Frontend dùng `useProvisions({ activeOnly: true })`
  cho NavBar để tránh lộ bản nháp.
- 9 provision không có `slug` → `getProvisionRoute()` fallback về `/${code}`.
- Dữ liệu rác: `vdfvsdfv` (code), `cloud-server` có `description` lặp chuỗi
  `"cloud-serversâcloud-serversâ..."` gần 50 lần.

### 2. `GET /api/v1/provision/active` ✅

```
Status: 200
Items: 32
```

Chính xác bằng `#1` trừ 2 bản DRAFT:

```
present in /provision but NOT /active: ef(DRAFT), vdfvsdfv(DRAFT)
```

### 3. `GET /api/v1/provision-services` ✅

```
Status: 200
Items: 123
```

Mẫu thực tế:

```json
{
  "id": "cc8fc14b-6363-484d-916c-d62a95cacbb4",
  "provisionId": "a5b5f430-4d45-4b39-bf31-9ddb75811d13",
  "name": "VPS",
  "price": 320300,
  "featuresIncluded": ["ok12313123123 jghjghj"],
  "status": "ACTIVE",
  "sku": "SSO",
  "billingCycle": "month",
  "specifications": {
    "seo": "rịe",
    "domain": "voks",
    "delivery": "rewo",
    "maintenance": 20202000
  },
  "displayOrder": 0,
  "currency": "VND"
}
```

Kiểm tra các điểm quan trọng:

| Câu hỏi | Kết quả |
| --- | --- |
| `price` là number hay string? | ✅ **number** (0 null, 0 zero) |
| `featuresIncluded` dạng gì? | ✅ **array** (`string[]`) |
| `provisionId` khớp `id` ở test #1? | ✅ 123/123, **0 orphan** |
| `billingCycle` có tồn tại? | ⚠️ có, nhưng 4 định dạng: `month`, `ONE_TIME`, `MONTHLY`, `YEARLY` |
| `originalPrice` | ❌ **không tồn tại** trong payload |
| `featuresIncluded` rỗng | ⚠️ **85/123 gói (69%)** |
| `status` | ⚠️ `ACTIVE` / `INACTIVE` |
| `currency` | ✅ luôn `VND` |

Phân bố gói theo provision (20/34 provision có gói):

```
web-web-biz             x13     cloud-server-linux      x9
email-hosting           x11     vr360-hotel             x7
hop-dong-starter        x8      vr360-realestate        x6
web-web-ecom            x6      web-web-custom          x6
hop-dong-mid            x6      hop-dong-enterprise     x6
email-server            x6      email-enterprise        x6
cloud-server-windows    x6      software-licensing-os   x5
software-licensing-server x5    software-licensing-office x5
software-licensing-security x5  cloud-server-turbo      x5
zns                     x1      qr-code                 x1
```

### 4. `GET /api/v1/provision-services/provision/{id}` ⚠️

```
web                  -> 200 count=0
web-web-biz          -> 200 count=13
ha-tang              -> 200 count=0
cloud-server         -> 200 count=0
cloud-server-linux   -> 200 count=9
vr360                -> 200 count=0
vr360-hotel          -> 200 count=7
pos                  -> 200 count=0
qr-code              -> 200 count=1
contact              -> 200 count=0
zns                  -> 200 count=1
```

**Đây là hành vi đúng theo thiết kế nhưng rất dễ gây hiểu nhầm:** endpoint chỉ
trả gói gắn **trực tiếp**, mà category thì không bao giờ có gói trực tiếp. Mọi
trang dịch vụ chính (`/web`, `/vr360`, `/hop-dong`, `/email`, `/ha-tang`...) đều
trỏ vào category nên endpoint này luôn trả `0`.

Hệ quả trước đây: nhánh fallback "nếu rỗng thì lấy toàn bộ" khiến `/web` hiển thị
**123 gói của mọi dịch vụ**. Đã sửa bằng cách gom theo cây con
(`collectProvisionSubtreeIds` + `servicesForProvision`).

Kiểm chứng số gói theo cây con (giá trị UI phải hiển thị):

| code | gói trực tiếp | gói theo cây con |
| --- | --- | --- |
| `web` | 0 | **25** |
| `vr360` | 0 | **13** |
| `hop-dong` | 0 | **20** |
| `email` | 0 | **23** |
| `ha-tang` | 0 | **20** |
| `cloud-server` | 0 | **20** |
| `software-licensing` | 0 | **20** |
| `zns` | 1 | 1 |
| `qr-code` | 1 | 1 |
| `pos` / `erp` / `truy-xuat` / `contact` | 0 | 0 |

Độ sâu tối đa của cây: **2** (`ha-tang → cloud-server → cloud-server-linux`).

### 5. `GET /api/v1/provision-details/{id}` ❌

```
Status: 404 cho TOÀN BỘ 34 provision, ví dụ:
  vr360:404, erp:404, web:404, zns:404, hop-dong:404, ha-tang:404 ... (34/34)
```

Với id không tồn tại, backend trả **500** chứ không phải 404:

```json
{
  "type": "https://core.local/problems/INTERNAL_ERROR",
  "title": "INTERNAL_ERROR",
  "status": 500,
  "detail": "Lỗi hệ thống, vui lòng thử lại sau",
  "instance": "/api/v1/provision-details/non-existent-id",
  "code": "INTERNAL_ERROR",
  "correlationId": "f12440de-b400-4837-ba81-b4ce10c41a32"
}
```

Đối chiếu những gì cần kiểm chứng:

| Hạng mục | Kết quả |
| --- | --- |
| Có `htmlContent` | ❌ không có dữ liệu để kiểm chứng |
| `seoMetadata` đúng cấu trúc | ❌ không có dữ liệu để kiểm chứng |
| `faqs` có `question`/`answer`/`displayOrder` | ❌ không có dữ liệu để kiểm chứng |
| FAQ đã sort theo `displayOrder` | ❌ không có dữ liệu để kiểm chứng |

**Tác động thực tế:** bảng `provision_details` chưa được seed, nên **mọi khối FAQ
trên toàn website** (trang chủ, /web, /vr360, /hop-dong-dien-tu, /email,
/ha-tang, /ban-quyen, /data-bi, /cloud-server) đang hiển thị
"Đang cập nhật câu hỏi thường gặp." và mọi `ServiceContent` hiển thị trạng thái
"nội dung đang được cập nhật".

Trên các trang tĩnh, `/api/v1/provision-details/{id}` trả 404 cho mọi lần tải
trang, tạo một dòng `404` trong console của trình duyệt. Đây không phải lỗi ghép
URL — URL đúng, chỉ là backend chưa có dữ liệu.

### Edge cases

| Edge case | Kết quả | Xử lý ở frontend |
| --- | --- | --- |
| Provision không tồn tại | **500** problem-json, không phải 404 | `client.ts` đặc cách coi 500 trên `/provision-details/` là "không có dữ liệu" |
| Provision chưa có detail | 404 cho 34/34 | `content.exists = false`, FAQ = `[]` |
| `price` null | Không gặp (0/123) | `normalizePrice()` vẫn trả 0 |
| `featuresIncluded` là object | Không gặp — luôn là array | `parseFeatures()` vẫn hỗ trợ object/string |
| `featuresIncluded` rỗng | **85/123** | UI render `<ul>` rỗng, không vỡ layout |
| `billingCycle` sai định dạng | **4 biến thể** | `normalizeBillingCycle()` hạ chữ thường |
| `slug` thiếu | 9/34 | `getProvisionRoute()` fallback `/${code}` |

## Discrepancies giữa backend và frontend types

1. **CRITICAL — `provision-details` không tồn tại cho bất kỳ provision nào.**
   Impact: toàn bộ FAQ và nội dung landing page trên site không hiển thị được.
   Fix phía backend: seed bảng `provision_details` (kèm `faqs`).
2. **CAO — id không tồn tại trả 500 thay vì 404.**
   Impact: frontend không phân biệt được "không có dữ liệu" với "backend lỗi",
   hiện phải đặc cách theo đường dẫn URL trong `client.ts`.
3. **CAO — chi tiết giá nằm ở provision con, không ở provision của trang.**
   Impact: `provision-services/provision/{id}` trả rỗng cho mọi category và dễ dẫn
   tới fallback sai (đã gây lỗi 123 gói trên `/web`). Fix phía frontend: gom cây con.
   Fix phía backend (khuyến nghị): thêm tham số `?includeDescendants=true`.
4. **TRUNG BÌNH — `billingCycle` không thống nhất** (`month` vs `MONTHLY`,
   `ONE_TIME`). Impact: không thể so sánh/hiển thị chu kỳ thanh toán đáng tin cậy.
5. **TRUNG BÌNH — `/provision` trả cả bản `DRAFT`.**
   Impact: nếu một trang vô tình dùng endpoint này thay `active` sẽ lộ bản nháp.
6. **THẤP — `featuresIncluded` rỗng ở 69% gói.**
   Impact: thẻ giá phần lớn không có nội dung tính năng.
7. **THẤP — `slug` thiếu ở 9 provision, `originalPrice` không tồn tại.**
   Impact: URL phải fallback về code; không hiển thị được giá gạch ngang.
8. **THẤP — dữ liệu seed lẫn bản thử.** `tewatwe`, `abc`, `VPS`, `ưefaef`,
   `3213`, `abcg`, `asasd` là các gói test; `ef`, `vdfvsdfv` là provision DRAFT.
   Trên `/web`, vì `compareServices()` sắp theo giá tăng dần, các gói test rẻ nhất
   nằm ở đầu bảng giá và chiếm vị trí "Phổ biến nhất". Đây là vấn đề dữ liệu.

## Khuyến nghị

**Phía backend**

1. Seed `provision_details` + `provision_details_faqs` cho 10 dịch vụ chính.
2. Trả **404** cho `provision-details/{id}` khi id không tồn tại (đang là 500).
3. Thêm `?includeDescendants=true` cho `provision-services/provision/{id}` để
   client không phải tải toàn bộ 123 gói rồi tự lọc.
4. Chuẩn hoá `billingCycle` về enum (`ONE_TIME` / `MONTHLY` / `YEARLY`).
5. Cân nhắc để `/provision` mặc định chỉ trả `ACTIVE`, dành bản đầy đủ cho
   endpoint quản trị riêng.
6. Dọn dữ liệu test (`ef`, `vdfvsdfv`, `tewatwe`, `abc`, `VPS`, `ưefaef`) và sửa
   `description` rác của `cloud-server`; cập nhật `name` của `software-licensing`
   (đang bằng đúng code) và bổ sung `slug` cho 9 provision còn thiếu.

**Phía frontend (đã thực hiện)**

1. Giữ `normalizeProvisionService()` làm lớp duy nhất chuẩn hoá payload.
2. Không bao giờ fallback về "toàn bộ danh sách" khi lọc rỗng.
3. Gom bảng giá theo cây con thay vì theo `provisionId` trực tiếp.
4. `price = 0` hiển thị "Liên hệ"; `featuresIncluded` rỗng render an toàn.
5. Phân biệt rõ "không tồn tại" (404) với "không gọi được API" (vẫn render).

## Kiểm chứng bổ sung

Ngoài 5 endpoint trên, đã kiểm tra trên trình duyệt thật (`http://localhost:3000`):

| Trang | Kết quả |
| --- | --- |
| `/web` | 25 thẻ giá (đúng cây con), `/provision` + `/provision-services` mỗi thứ 1 request |
| `/hop-dong-dien-tu` | 20 thẻ giá, theme xanh giữ nguyên, CTA "Đăng Ký Gói" ở thẻ giữa |
| `/vr360` | 13 thẻ giá |
| `/email` | 1 thẻ giá — component này gọi `useProvisionPricing("zns")`, xem ghi chú dưới |
| `/web-web-biz` | Template chung: H1 "Web Doanh nghiệp", metadata động, 13 thẻ giá |
| `/software-licensing` | Template chung: 200, resolver đọc đúng `name` từ backend |
| `/zzz-not-real` | 404 |
| `/pos` | 200 (trang tĩnh vẫn thắng route động) — hành vi không đổi |

> **Ghi chú kèm theo (không thuộc phạm vi 8 task):**
> `src/components/email/EmailPricing.tsx` gọi `useProvisionPricing("zns")` chứ
> không phải `"email"`, nên trang Email đang hiển thị bảng giá ZNS (1 gói).
> Lỗi này có từ trước và không đổi hành vi sau tái cấu trúc. Tương tự,
> `CloudPricingTable` gọi `useProvisionPricing("ha-tang")` nhưng bỏ qua dữ liệu
> nhận được và render bảng hardcode.
