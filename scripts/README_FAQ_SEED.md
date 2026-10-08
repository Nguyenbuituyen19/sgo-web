# Hướng Dẫn Seed Dữ Liệu FAQ Cho Provision Details

## Tổng Quan

FAQs được quản lý thông qua endpoint `GET /api/v1/provision-details/{provisionId}` và được nhúng trong object `ProvisionDetail` dưới dạng mảng `faqs`.

## Cấu Trúc Database

Có 2 khả năng backend lưu FAQs:

### Option 1: Bảng riêng `platform.provision_faqs`
```sql
CREATE TABLE platform.provision_faqs (
    id UUID PRIMARY KEY,
    provision_id UUID REFERENCES platform.provisions(id),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
);
```

### Option 2: JSON field trong `platform.provision_details`
```sql
ALTER TABLE platform.provision_details 
ADD COLUMN faqs JSONB;
```

## Cách Seed Dữ Liệu

### Cách 1: Sử dụng script SQL tự động

```bash
# Kết nối vào database PostgreSQL
psql -U postgres -d sgo_db

# Chạy script seed
\i scripts/seed_faq_data.sql
```

Script này sẽ:
- Tự động tạo bảng `platform.provision_faqs` nếu chưa có
- Seed FAQs cho tất cả 10 provisions chính
- Kiểm tra kết quả sau khi seed

### Cách 2: Seed thủ công từng provision

```sql
-- Ví dụ seed FAQ cho Web provision
INSERT INTO platform.provision_faqs (provision_id, question, answer, display_order, status)
SELECT 
    id,
    'Chi phí thiết kế website tại SGO là trọn gói hay có phát sinh gì không?',
    'Báo giá tại SGO là chi phí trọn gói theo hợp đồng bao gồm thiết kế, lập trình, tặng kèm tên miền và hosting năm đầu tiên.',
    1,
    'ACTIVE'
FROM platform.provisions 
WHERE code = 'web';
```

## Kiểm Tra Kết Quả

### Query trực tiếp database
```sql
SELECT 
    p.code AS provision_code,
    p.name AS provision_name,
    pf.question,
    pf.answer,
    pf.display_order
FROM platform.provisions p
JOIN platform.provision_faqs pf ON p.id = pf.provision_id
WHERE p.code = 'web'
ORDER BY pf.display_order;
```

### Test qua API
```bash
# Chạy script test
chmod +x scripts/test-faq-api.sh
./scripts/test-faq-api.sh

# Hoặc dùng curl trực tiếp
curl http://localhost:8080/api/v1/provision-details/{PROVISION_ID} | jq '.data.faqs'
```

## Backend Mapping

Backend cần map từ `provision_faqs` sang `ProvisionDetail.faqs`:

```java
// Java Spring Boot example
@Query("SELECT pf FROM ProvisionFaq pf WHERE pf.provision.id = :provisionId AND pf.status = 'ACTIVE' ORDER BY pf.displayOrder")
List<ProvisionFaq> findActiveFaqsByProvision(@Param("provisionId") UUID provisionId);

// Trong service
ProvisionDetail detail = new ProvisionDetail();
detail.setFaqs(provisionFaqRepository.findActiveFaqsByProvision(provisionId));
```

## Frontend Integration

Frontend đã được cấu hình để:
1. Gọi API `/api/v1/provision-details/{id}`
2. Lấy mảng `faqs` từ response
3. Hiển thị qua component `FaqAccordion`
4. Fallback về default FAQs nếu API trả về mảng rỗng

## Lưu Ý Quan Trọng

- ✅ Chỉ hiển thị FAQs có `status = 'ACTIVE'`
- ✅ Sắp xếp theo `display_order` tăng dần
- ✅ Frontend tự động fallback nếu backend chưa có dữ liệu
- ✅ Badge "Đang hiển thị nội dung mẫu" xuất hiện khi dùng fallback

## Xử Lý Sự Cố

### FAQs không hiển thị trên UI

1. Kiểm tra API response:
```bash
curl http://localhost:8080/api/v1/provision-details/{ID} | jq '.data.faqs'
```

2. Kiểm tra database:
```sql
SELECT COUNT(*) FROM platform.provision_faqs WHERE provision_id = '{ID}' AND status = 'ACTIVE';
```

3. Kiểm tra browser console xem có lỗi network không

### FAQs hiển thị nhưng không đúng nội dung

Kiểm tra mapping trong backend DTO:
```typescript
// Đảm bảo backend trả về đúng structure
{
  "id": "uuid",
  "question": "string",
  "answer": "string", 
  "displayOrder": number,
  "status": "ACTIVE"
}
```

## Danh Sách Provisions Cần Seed

| Code | Tên Dịch Vụ | Số FAQ Đề Xuất |
|------|-------------|----------------|
| web | Thiết kế Website | 10 |
| hop-dong | Hợp đồng điện tử | 10 |
| vr360 | VR360 Tour | 5 |
| erp | ERP/CRM | 3 |
| pos | Phần mềm POS | 3 |
| zns | Zalo ZNS | 3 |
| truy-xuat | Truy xuất nguồn gốc | 3 |
| qr-code | Tạo mã QR | 3 |
| ha-tang | Hạ tầng Cloud | 3 |
| contact | Liên hệ | 4 |

**Tổng cộng: ~47 FAQs cho toàn bộ hệ thống**
