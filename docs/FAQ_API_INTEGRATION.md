# FAQ Integration với API - Tài liệu kỹ thuật

## Tổng quan

Toàn bộ hệ thống FAQ đã được cập nhật để lấy dữ liệu từ backend API thay vì hard-code, bao gồm:

1. **Trang dịch vụ riêng lẻ** (`/web`, `/vr360`, `/hop-dong-dien-tu`, v.v.)
2. **Trang FAQ tổng hợp** (`/hoi-dap`)
3. **Component FAQ trong trang chủ**

## Kiến trúc

### Backend API
- **Endpoint**: `GET /api/v1/provision-details/{provisionId}`
- **Response structure**:
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "provisionId": "uuid",
    "slug": "web",
    "htmlContent": "...",
    "seoMetadata": {...},
    "faqs": [
      {
        "id": "uuid",
        "question": "Câu hỏi?",
        "answer": "Câu trả lời",
        "displayOrder": 1,
        "status": "ACTIVE"
      }
    ]
  }
}
```

### Frontend Hooks

#### 1. `useProvisionFaq(provisionCode)`
- **Vị trí**: `src/hooks/useProvisionFaq.ts`
- **Chức năng**: Lấy FAQs cho một provision cụ thể
- **Fallback**: Tự động dùng default FAQs nếu API chưa có dữ liệu
- **Return**:
```typescript
{
  faqs: FaqItem[];
  loading: boolean;
  error: string | null;
  isFallback: boolean; // true nếu đang dùng default data
  refresh: () => void;
}
```

#### 2. `useMultipleContents(provisionIds, concurrency)`
- **Vị trí**: `src/hooks/useProvisionContent.ts`
- **Chức năng**: Lấy FAQs từ nhiều provisions cùng lúc (batch fetch)
- **Concurrency**: Giới hạn số request đồng thời (mặc định 5)
- **Use case**: Dùng cho trang `/hoi-dap` cần load tất cả FAQs

### Components

#### 1. `FaqAccordion` - Component hiển thị FAQ chung
- **Vị trí**: `src/components/shared/FaqAccordion.tsx`
- **Features**:
  - Hiển thị loading/error/empty states
  - Badge "Đang hiển thị nội dung mẫu" khi dùng fallback
  - Themeable (PURPLE, BLUE)
  - Accordion animation

#### 2. `FaqJsonLd` - Dynamic JSON-LD generator
- **Vị trí**: `src/components/shared/FaqJsonLd.tsx`
- **Chức năng**: Tạo SEO markup từ FAQs thực tế đang hiển thị
- **Đảm bảo**: JSON-LD luôn đồng bộ với UI content

#### 3. `FaqApiContainer` - FAQ page container mới
- **Vị trí**: `src/components/hoi-dap/FaqApiContainer.tsx`
- **Thay thế**: `FaqMainContainer` (hard-coded data)
- **Features**:
  - Load FAQs từ tất cả provisions
  - Filter theo category động
  - Search real-time
  - Category mapping tự động

## Category Mapping

Các provision được map sang categories trong trang FAQ:

| Provision Code | Category | Label |
|---------------|----------|-------|
| web, vr360, qr-code | solutions | Website & VR360 / QR |
| erp, pos | erp | CRM / ERP & POS |
| zns | solutions | Chăm sóc khách hàng |
| truy-xuat | solutions | Truy xuất nguồn gốc |
| hop-dong | payment | Hợp đồng điện tử |
| ha-tang | cloud | Hạ tầng & Cloud Server |
| contact | payment | Liên hệ & Hỗ trợ |

## Data Flow

### Trang dịch vụ đơn lẻ (ví dụ: `/web`)
```
WebPage (/web/page.tsx)
  └─ WebFaq component
      └─ useProvisionFaq("web")
          ├─ useProvisions() → lấy danh sách provisions
          ├─ findByCodeOrSlug() → tìm provision ID
          └─ useProvisionContent(provisionId)
              └─ GET /api/v1/provision-details/{id}
                  └─ Cache + Return FAQs
```

### Trang FAQ tổng hợp (`/hoi-dap`)
```
HoiDapPage (/hoi-dap/page.tsx)
  ├─ useProvisions() → tất cả provisions
  ├─ useMultipleContents(allIds) → batch fetch FAQs
  ├─ generateFaqJsonLd() → dynamic SEO markup
  └─ FaqApiContainer
      ├─ Category filter (động)
      ├─ Search filter
      └─ Render FAQs list
```

## Fallback Strategy

Khi backend chưa có dữ liệu FAQ:

1. **Trang dịch vụ đơn lẻ**:
   - Hiển thị default FAQs từ `src/data/default-faqs.ts`
   - Badge "Đang hiển thị nội dung mẫu" xuất hiện
   - Không có lỗi, UX vẫn mượt mà

2. **Trang FAQ tổng hợp**:
   - Hiển thị message "Backend chưa cung cấp dữ liệu FAQ"
   - Hướng dẫn liên hệ admin để seed data

## Default FAQs

File: `src/data/default-faqs.ts`

Chứa FAQs mặc định cho 10 provisions:
- web (10 FAQs)
- hop-dong (10 FAQs)
- vr360 (5 FAQs)
- erp, pos, zns, truy-xuat, qr-code, ha-tang (3 FAQs each)
- contact (4 FAQs)

**Tổng: ~47 FAQs fallback**

## SEO & JSON-LD

Tất cả FAQ pages đều có dynamic JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://sgodata.com/web.html#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Câu hỏi từ API...",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Câu trả lời từ API..."
      }
    }
  ]
}
```

**Ưu điểm**:
- Luôn đồng bộ với nội dung đang hiển thị
- Google index đúng content thực tế
- Không bị duplicate content giữa UI và markup

## Testing

### Kiểm tra API connection
```bash
# Test endpoint
curl http://localhost:8080/api/v1/provision-details/{PROVISION_ID} | jq '.data.faqs'
```

### Kiểm tra fallback
1. Tạm thời stop backend
2. Reload trang `/web` hoặc `/hoi-dap`
3. Xem badge "Đang hiển thị nội dung mẫu" (trang dịch vụ)
4. Hoặc message "Backend chưa cung cấp dữ liệu" (trang FAQ)

### Kiểm tra JSON-LD
1. Mở Chrome DevTools → Elements tab
2. Tìm `<script type="application/ld+json">`
3. Copy và paste vào https://search.google.com/structured-data/testing-tool
4. Verify FAQ schema valid

## Database Seeding

Để seed FAQs vào database, sử dụng script:

```bash
psql -U postgres -d sgo_db -f scripts/seed_faq_data.sql
```

Script sẽ:
1. Tạo bảng `platform.provision_faqs` nếu chưa có
2. Seed ~47 FAQs cho 10 provisions
3. Output số lượng FAQs per provision

Xem chi tiết tại: `scripts/README_FAQ_SEED.md`

## Migration từ Hard-coded Data

### Đã xóa/replace:
- ❌ `FaqMainContainer` hard-coded data (~127 câu hỏi)
- ❌ JSON-LD hard-coded trong `/web/page.tsx`, `/hop-dong-dien-tu/page.tsx`

### Đã thêm:
- ✅ `FaqApiContainer` - dynamic API-based
- ✅ `FaqJsonLd` - dynamic SEO markup
- ✅ `default-faqs.ts` - fallback data
- ✅ `faq-jsonld.ts` - JSON-LD helper

## Performance

- **Single-flight requests**: Nhiều component cùng gọi 1 endpoint → chỉ 1 HTTP request
- **Batch fetching**: `useMultipleContents` giới hạn concurrency = 5
- **Cache**: TTL 15 phút cho provision details
- **Lazy loading**: FAQs chỉ load khi component mount

## Troubleshooting

### FAQs không hiển thị
1. Kiểm tra console log errors
2. Verify API response: `curl http://localhost:8080/api/v1/provision-details/{ID}`
3. Check browser Network tab xem có 404/500 errors không

### JSON-LD không xuất hiện
1. Verify `allFaqs.length > 0` trong HoiDapPage
2. Check DevTools → Elements → tìm `<script type="application/ld+json">`
3. Ensure `generateFaqJsonLd` được gọi với đúng params

### Fallback không hoạt động
1. Check `src/data/default-faqs.ts` có export đúng code không
2. Verify `getDefaultFaqs(provisionCode)` return non-empty array
3. Check `isFallback` flag trong hook result

## Future Improvements

- [ ] Thêm pagination cho trang `/hoi-dap` khi có quá nhiều FAQs
- [ ] Support đa ngôn ngữ (vi/en) cho FAQs
- [ ] Admin UI để quản lý FAQs không cần SQL
- [ ] Analytics tracking cho FAQ clicks
- [ ] Related FAQs suggestion dựa trên search history
