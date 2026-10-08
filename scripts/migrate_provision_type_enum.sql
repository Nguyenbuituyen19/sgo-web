-- ==============================================================================
-- MIGRATION: Thêm ENUM type cho bảng platform.provisions
-- ==============================================================================
-- Mục đích: Định nghĩa chính xác 3 loại provision trong hệ thống:
--   1. "category": Nhóm dịch vụ (có thể chứa provision con)
--   2. "service": Provision lá — nơi gắn bảng giá (provision_services)
--   3. "service-filter": Lá dùng làm bộ lọc lựa chọn (trạng thái DRAFT)
-- ==============================================================================

-- Bước 1: Tạo ENUM type nếu chưa tồn tại
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'provision_type') THEN
        CREATE TYPE platform.provision_type AS ENUM ('category', 'service', 'service-filter');
        RAISE NOTICE 'Created new ENUM type: platform.provision_type';
    ELSE
        RAISE NOTICE 'ENUM type platform.provision_type already exists, skipping creation';
    END IF;
END $$;

-- Bước 2: Thêm cột type vào bảng provisions nếu chưa có
ALTER TABLE platform.provisions
ADD COLUMN IF NOT EXISTS type platform.provision_type;

-- Bước 3: Cập nhật giá trị type dựa trên cấu trúc cây hiện tại
-- Category: những provision có parentId IS NULL hoặc có provision con
UPDATE platform.provisions p
SET type = CASE
    -- Nếu có parentId -> kiểm tra xem có provision con nào trỏ về nó không
    WHEN p.parentId IS NOT NULL THEN 'service'::platform.provision_type
    -- Nếu parentId IS NULL -> kiểm tra xem có provision nào khác trỏ về nó làm cha không
    WHEN EXISTS (SELECT 1 FROM platform.provisions child WHERE child.parentId = p.id) THEN 'category'::platform.provision_type
    -- Nếu không có con và cũng không có cha -> coi là service lá
    ELSE 'service'::platform.provision_type
END
WHERE type IS NULL;

-- Bước 4: Đánh dấu các provision đặc biệt là service-filter
-- Dựa vào code hoặc tên để xác định (cập nhật theo thực tế database)
UPDATE platform.provisions
SET type = 'service-filter'::platform.provision_type
WHERE code IN (
    -- Danh sách các code được xác định là service-filter
    -- Ví dụ: 'loc-theo-nganh', 'loc-theo-quy-mo', v.v.
    SELECT code FROM platform.provisions
    WHERE LOWER(name) LIKE '%filter%' OR LOWER(code) LIKE '%filter%'
);

-- Bước 5: Đảm bảo tất cả provision đều có type (fallback)
UPDATE platform.provisions
SET type = 'service'::platform.provision_type
WHERE type IS NULL;

-- Bước 6: Set NOT NULL constraint sau khi đã có dữ liệu
ALTER TABLE platform.provisions
ALTER COLUMN type SET NOT NULL;

-- Bước 7: Tạo index để tối ưu query theo type
CREATE INDEX IF NOT EXISTS idx_provisions_type ON platform.provisions(type);

-- ==============================================================================
-- VERIFICATION: Kiểm tra kết quả
-- ==============================================================================
SELECT
    type,
    COUNT(*) as count,
    ARRAY_AGG(DISTINCT status) as statuses
FROM platform.provisions
GROUP BY type
ORDER BY type;

-- Chi tiết từng provision
SELECT
    id,
    code,
    name,
    type,
    status,
    "parentId",
    "displayOrder"
FROM platform.provisions
ORDER BY "displayOrder" NULLS LAST, type, code;
