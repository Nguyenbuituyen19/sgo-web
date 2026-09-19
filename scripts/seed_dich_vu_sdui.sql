-- ==============================================================================
-- SCRIPT DATA SEED: HỆ THỐNG SDUI & PAGE BUILDER CHO ROUTE DỊCH VỤ (SERVICES)
-- ==============================================================================
-- Nguồn dữ liệu: Trích xuất trực tiếp 100% từ Frontend sgo-web:
-- 1. Trang tổng quan: route #dich-vu (Services.tsx, Header.tsx, Partners.tsx, FAQ.tsx)
-- 2. 11 Trang chi tiết phân hệ dịch vụ:
--    - /qr-code
--    - /truy-xuat-nguon-goc
--    - /vr360
--    - /pos
--    - /zns
--    - /web
--    - /erp
--    - /data-bi
--    - /hop-dong-dien-tu
--    - /ha-tang
--    - /ban-quyen
-- Hệ quản trị CSDL tương thích: PostgreSQL (Hỗ trợ JSONB, UUID, Upsert)
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE SCHEMA IF NOT EXISTS sdui;

-- ==============================================================================
-- PHẦN 1: DDL CẤU TRÚC BẢNG PAGE BUILDER & SDUI
-- ==============================================================================

-- 1.1. Bảng Trang SDUI (SDUI Pages)
CREATE TABLE IF NOT EXISTS sdui.pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) DEFAULT 'SERVICE',
    description TEXT,
    layout_type VARCHAR(50) DEFAULT 'LANDING_PAGE',
    status VARCHAR(20) DEFAULT 'PUBLISHED',
    seo_metadata JSONB DEFAULT '{}'::jsonb,
    content_data JSONB DEFAULT '[]'::jsonb, -- Toàn bộ cây Component SDUI Blocks
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1.2. Bảng Danh mục 11 Dịch vụ cốt lõi (Service Catalog)
CREATE TABLE IF NOT EXISTS sdui.service_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    badge VARCHAR(100),
    badge_color VARCHAR(100),
    top_badge VARCHAR(100),
    icon VARCHAR(100) NOT NULL,
    icon_bg VARCHAR(100) NOT NULL,
    icon_color VARCHAR(100) NOT NULL,
    link VARCHAR(255) NOT NULL,
    link_text VARCHAR(100) NOT NULL,
    btn_bg VARCHAR(100) NOT NULL,
    btn_hover VARCHAR(100) NOT NULL,
    extra_info VARCHAR(255),
    tags JSONB DEFAULT '[]'::jsonb,
    display_order INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1.3. Bảng Khối giao diện động cho Page Builder (Page Sections / Blocks)
CREATE TABLE IF NOT EXISTS sdui.page_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID NOT NULL REFERENCES sdui.pages(id) ON DELETE CASCADE,
    section_key VARCHAR(100) NOT NULL,
    component_type VARCHAR(100) NOT NULL, -- Tên React Component: HeroHeader, ServicesGrid, PricingTable, FaqAccordion,...
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    props JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_sdui_page_section UNIQUE (page_id, section_key)
);

-- 1.4. Bảng Báo giá gói dịch vụ (Service Pricing Plans)
CREATE TABLE IF NOT EXISTS sdui.pricing_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES sdui.pages(id) ON DELETE CASCADE,
    plan_code VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    tier_badge VARCHAR(100),
    is_recommended BOOLEAN DEFAULT false,
    price_amount DECIMAL(15, 2) DEFAULT 0,
    price_unit VARCHAR(50) DEFAULT 'đ',
    price_period VARCHAR(50) DEFAULT 'Trọn gói',
    description TEXT,
    features_list JSONB DEFAULT '[]'::jsonb,
    cta_text VARCHAR(100) DEFAULT 'Đăng ký ngay',
    cta_link VARCHAR(255) DEFAULT '#contact-form',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1.5. Bảng Câu hỏi thường gặp theo từng trang/dịch vụ (FAQs)
CREATE TABLE IF NOT EXISTS sdui.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES sdui.pages(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer_html TEXT NOT NULL,
    display_order INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'PUBLISHED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ==============================================================================
-- PHẦN 2: SEED DATA - DANH MỤC 11 DỊCH VỤ (SERVICE CATALOG)
-- Trích xuất từ: src/components/home/Services.tsx
-- ==============================================================================
INSERT INTO sdui.service_catalog (
    service_code, title, description, badge, badge_color, top_badge, 
    icon, icon_bg, icon_color, link, link_text, btn_bg, btn_hover, extra_info, tags, display_order
) VALUES 
(
    'qr-code',
    'Tạo Mã QR Miễn Phí',
    'Tạo mã QR tĩnh/động chuyên nghiệp, không dính quảng cáo. Hỗ trợ QR thanh toán, QR sự kiện, định danh cá nhân dễ dàng.',
    'Miễn phí trọn đời',
    'bg-emerald-50 text-emerald-600',
    NULL,
    'fa-solid fa-qrcode',
    'bg-emerald-100',
    'text-emerald-600',
    '/qr-code',
    'Trải nghiệm ngay',
    'bg-emerald-600',
    'hover:bg-emerald-700',
    NULL,
    '[]'::jsonb,
    1
),
(
    'truy-xuat',
    'Giải Pháp Truy Xuất Nguồn Gốc',
    'Ứng dụng số hóa nhật ký sản xuất và chuỗi cung ứng bằng QR Code. Chống hàng giả, bảo vệ thương hiệu vững chắc và đáp ứng trọn vẹn tiêu chuẩn xuất khẩu.',
    'Minh bạch chuỗi cung ứng',
    'bg-teal-50 text-teal-600',
    NULL,
    'fa-solid fa-shield-halved',
    'bg-teal-100',
    'text-teal-600',
    '/truy-xuat-nguon-goc',
    'Khám phá giải pháp',
    'bg-teal-600',
    'hover:bg-teal-700',
    NULL,
    '[]'::jsonb,
    2
),
(
    'vr360',
    'Giải Pháp Thực Tế Ảo VR360',
    'Mang toàn bộ không gian Khách sạn, Resort, Khu du lịch lên internet với góc nhìn 360 độ trực quan, tích hợp sa bàn ảo, tăng uy tín và bứt phá tỷ lệ đặt phòng trực tiếp.',
    'Số hóa không gian 3D',
    'bg-indigo-50 text-indigo-600',
    'Xu hướng',
    'fa-solid fa-cube',
    'bg-indigo-100',
    'text-indigo-600',
    '/vr360',
    'Xem chi tiết giải pháp',
    'bg-indigo-600',
    'hover:bg-indigo-700',
    NULL,
    '[]'::jsonb,
    3
),
(
    'pos',
    'Phần Mềm Quản Lý Bán Hàng',
    'Quản lý kho hàng, đơn hàng, doanh thu và nhân viên trên một nền tảng duy nhất. Phù hợp cho cả bán lẻ lẫn chuỗi cửa hàng.',
    NULL,
    NULL,
    NULL,
    'fa-solid fa-cash-register',
    'bg-blue-100',
    'text-blue-600',
    '/pos',
    'Khám phá giải pháp',
    'bg-blue-600',
    'hover:bg-blue-700',
    NULL,
    '[]'::jsonb,
    4
),
(
    'zns',
    'Chăm Sóc Khách Hàng OA - ZNS',
    'Giải pháp gửi tin nhắn chủ động qua Zalo tự động: xác nhận đơn hàng, chúc mừng sinh nhật, thông báo số dư với chi phí tối ưu.',
    NULL,
    NULL,
    NULL,
    'fa-solid fa-comment-sms',
    'bg-sky-100',
    'text-sky-600',
    '/zns',
    'Xem báo giá',
    'bg-sky-600',
    'hover:bg-sky-700',
    NULL,
    '[]'::jsonb,
    5
),
(
    'web',
    'Thiết Kế Website Theo Yêu Cầu',
    'Sở hữu website chuẩn SEO, giao diện độc quyền mượt mà trên mobile. Tối ưu trải nghiệm người dùng nhằm thúc đẩy tỷ lệ chuyển đổi.',
    NULL,
    NULL,
    NULL,
    'fa-solid fa-laptop-code',
    'bg-purple-100',
    'text-purple-600',
    '/web',
    'Liên hệ tư vấn',
    'bg-purple-600',
    'hover:bg-purple-700',
    NULL,
    '[]'::jsonb,
    6
),
(
    'erp',
    'Hệ Thống Quản Trị CRM / ERP',
    'Số hóa toàn diện doanh nghiệp từ quản lý thông tin khách hàng, quy trình làm việc của nhân sự, đến báo cáo tài chính nội bộ. May đo chính xác theo đặc thù từng ngành nghề.',
    NULL,
    NULL,
    NULL,
    'fa-solid fa-chart-pie',
    'bg-amber-100',
    'text-amber-600',
    '/erp',
    'Yêu cầu Demo',
    'bg-amber-600',
    'hover:bg-amber-700',
    'Bảo mật chuẩn ISO',
    '[]'::jsonb,
    7
),
(
    'data-bi',
    'Hạ Tầng Dữ Liệu & BI',
    'Xây dựng Hạ tầng Dữ liệu, Data Warehouse, Data Lake, tự động hóa luồng thông tin ETL/ELT và tích hợp hệ thống Business Intelligence (Power BI, Looker Studio) toàn diện.',
    'Báo cáo & Phân tích',
    'bg-violet-50 text-violet-600',
    NULL,
    'fa-solid fa-chart-line',
    'bg-violet-100',
    'text-violet-600',
    '/data-bi',
    'Khám phá giải pháp',
    'bg-violet-600',
    'hover:bg-violet-700',
    NULL,
    '["Data Warehouse", "Power BI", "Looker Studio", "ETL/ELT"]'::jsonb,
    8
),
(
    'hop-dong',
    'Giải Pháp Hợp Đồng Điện Tử',
    'Ký số từ xa, quản lý và lưu trữ tài liệu, hợp đồng kinh tế không giấy tờ. Kết nối trực tiếp dữ liệu nhân sự, khách hàng từ CRM/ERP để tự động hóa quy trình trình duyệt.',
    'An toàn pháp lý',
    'bg-red-50 text-red-600',
    NULL,
    'fa-solid fa-file-signature',
    'bg-red-100',
    'text-red-600',
    '/hop-dong-dien-tu',
    'Xem chi tiết',
    'bg-red-600',
    'hover:bg-red-700',
    NULL,
    '[]'::jsonb,
    9
),
(
    'cloud',
    'Hạ Tầng & Lưu Trữ Cloud',
    'Nền tảng vận hành tối ưu cho mọi website và ứng dụng doanh nghiệp. Giải pháp lưu trữ dữ liệu an toàn, tốc độ cao và bảo mật tuyệt đối.',
    'Hạ tầng số vững chắc',
    'bg-cyan-50 text-cyan-600',
    NULL,
    'fa-solid fa-server',
    'bg-cyan-100',
    'text-cyan-600',
    '/ha-tang',
    'Khám phá hạ tầng số',
    'bg-cyan-600',
    'hover:bg-cyan-700',
    NULL,
    '["Tên miền", "Hosting", "Cloud Server", "Chỗ đặt máy chủ"]'::jsonb,
    10
),
(
    'ban-quyen',
    'Bản Quyền Phần Mềm',
    'Cung cấp key bản quyền Windows 10/11 Pro, Office 2021/365, Windows Server chính hãng vĩnh viễn. Bảo hành 1 đổi 1, hỗ trợ kích hoạt trực tiếp từ Microsoft.',
    'Bản quyền chính hãng',
    'bg-indigo-50 text-indigo-600',
    NULL,
    'fa-solid fa-key',
    'bg-indigo-100',
    'text-indigo-600',
    '/ban-quyen',
    'Xem bảng giá bản quyền',
    'bg-indigo-600',
    'hover:bg-indigo-700',
    NULL,
    '["Windows", "Office 365", "Win Server"]'::jsonb,
    11
)
ON CONFLICT (service_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    badge = EXCLUDED.badge,
    badge_color = EXCLUDED.badge_color,
    top_badge = EXCLUDED.top_badge,
    icon = EXCLUDED.icon,
    icon_bg = EXCLUDED.icon_bg,
    icon_color = EXCLUDED.icon_color,
    link = EXCLUDED.link,
    link_text = EXCLUDED.link_text,
    btn_bg = EXCLUDED.btn_bg,
    btn_hover = EXCLUDED.btn_hover,
    extra_info = EXCLUDED.extra_info,
    tags = EXCLUDED.tags,
    display_order = EXCLUDED.display_order,
    updated_at = now();


-- ==============================================================================
-- PHẦN 3: SEED DATA - TOÀN BỘ CÁC TRANG THUỘC ROUTE DỊCH VỤ (SDUI PAGES)
-- ==============================================================================

-- 3.0. TRANG TỔNG: /dich-vu (HOẶC ROOT LANDING #dich-vu)
INSERT INTO sdui.pages (slug, title, description, layout_type, status, seo_metadata, content_data)
VALUES (
    'dich-vu',
    'Hệ Sinh Thái Dịch Vụ Công Nghệ - SGO Việt Nam',
    'Giải pháp toàn diện để bứt phá doanh số kỷ nguyên số: QR Code, VR360, ERP/CRM, POS, BI, Cloud và Bản quyền phần mềm.',
    'LANDING_PAGE',
    'PUBLISHED',
    '{
        "title": "Hệ Sinh Thái Dịch Vụ SGO Việt Nam | Giải Pháp Công Nghệ Toàn Diện",
        "description": "Tối ưu quy trình vận hành, tự động hóa chăm sóc khách hàng và nâng tầm thương hiệu với bộ giải pháp công nghệ toàn diện từ SGODATA.",
        "canonical": "https://sgodata.com/#dich-vu",
        "keywords": ["dịch vụ công nghệ", "phần mềm quản trị", "QR code", "VR360", "ERP", "CRM", "POS", "Data BI"]
    }'::jsonb,
    '[
        {
            "id": "hero",
            "type": "Header",
            "order": 1,
            "props": {
                "badge": "Hệ sinh thái công nghệ",
                "title": "Giải Pháp Toàn Diện Để <br /> Bứt Phá Doanh Số Kỷ Nguyên Số",
                "description": "Tối ưu quy trình vận hành, tự động hóa chăm sóc khách hàng và nâng tầm thương hiệu với bộ công cụ chuyên nghiệp."
            }
        },
        {
            "id": "services-catalog",
            "type": "Services",
            "order": 2,
            "props": {
                "sectionId": "dich-vu",
                "initialVisibleCount": 6,
                "serviceCatalogCode": "ALL_SERVICES"
            }
        },
        {
            "id": "partners",
            "type": "Partners",
            "order": 3,
            "props": {
                "badge": "Sự tin tưởng",
                "title": "Đối Tác Đồng Hành Chiến Lược",
                "description": "Hệ sinh thái công nghệ của SGO Việt Nam tự hào được đồng hành cùng các thương hiệu, tập đoàn và các hợp tác xã hàng đầu trên hành trình chuyển đổi số.",
                "partners": [
                    { "name": "TECH-CORP", "icon": "fa-solid fa-layer-group" },
                    { "name": "AGRI-FOOD", "icon": "fa-solid fa-leaf" },
                    { "name": "LOGISTICS", "icon": "fa-solid fa-truck-fast" },
                    { "name": "FINTECH", "icon": "fa-solid fa-money-bill-transfer" },
                    { "name": "RETAIL-MALL", "icon": "fa-solid fa-store" },
                    { "name": "EDU-SYSTEM", "icon": "fa-solid fa-graduation-cap" }
                ]
            }
        },
        {
            "id": "faq",
            "type": "FAQ",
            "order": 4,
            "props": {
                "badge": "Hỗ trợ khách hàng",
                "title": "Câu Hỏi Thường Gặp",
                "description": "Tổng hợp những thắc mắc phổ biến của các chủ doanh nghiệp khi tìm hiểu và ứng dụng hệ sinh thái số của SGO Việt Nam."
            }
        }
    ]'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    seo_metadata = EXCLUDED.seo_metadata,
    content_data = EXCLUDED.content_data,
    updated_at = now();


-- 3.1. TRANG 1: /qr-code
INSERT INTO sdui.pages (slug, title, description, layout_type, status, seo_metadata, content_data)
VALUES (
    'qr-code',
    'Tạo Mã QR Miễn Phí - Sạch 100% Không Quảng Cáo | SGO VIỆT NAM',
    'Hệ thống tạo mã QR Code trực tuyến miễn phí trọn đời, không dính quảng cáo phiền toái. Tạo nhanh mã QR cho link Website, Fanpage, Zalo, thực đơn nhà hàng.',
    'SERVICE_DETAIL',
    'PUBLISHED',
    '{
        "title": "Tạo Mã QR Miễn Phí - Sạch 100% Không Quảng Cáo | SGO VIỆT NAM",
        "description": "QR Code sạch 100%, không bị chèn quảng cáo trung gian, không giới hạn lượt quét.",
        "canonical": "https://sgodata.com/qr-code.html",
        "keywords": ["tạo mã qr miễn phí", "làm qr code online", "qr code không quảng cáo", "sgodata"]
    }'::jsonb,
    '[
        {
            "id": "qr-header",
            "type": "QrHeader",
            "order": 1,
            "props": {
                "badge": "Miễn phí 100% - Không giới hạn lượt quét",
                "title": "Sở Hữu Mã QR Code Sạch <br /><span class=\"text-blue-600\">Nói Không Với Quảng Cáo Chèn Ngầm</span>",
                "description": "Bạn in mã QR lên danh thiếp, bao bì sản phẩm hay menu nhà hàng nhưng khách quét lại ra quảng cáo game bài, shopee, Lazada? SGO đem lại giải pháp QR dẫn thẳng tới đích!",
                "ctaPrimary": { "text": "Bắt đầu tạo ngay", "link": "#tao-form" },
                "ctaSecondary": { "text": "Tìm hiểu thêm", "link": "#uu-diem" }
            }
        },
        {
            "id": "qr-warning",
            "type": "QrWarning",
            "order": 2,
            "props": {
                "warningTitle": "Cảnh giác với các website tạo QR miễn phí chứa quảng cáo",
                "warningDesc": "Nhiều dịch vụ cho tạo mã QR miễn phí nhưng sau vài ngày sẽ tự động chuyển hướng khách quét sang trang quảng cáo cá cược hoặc bán hàng trung gian, gây mất uy tín thương hiệu nghiêm trọng."
            }
        },
        {
            "id": "qr-features",
            "type": "QrFeatures",
            "order": 3,
            "props": {
                "sectionBadge": "Giá trị cốt lõi",
                "sectionTitle": "Mã QR Được Khởi Tạo Tại SGO Có Gì Khác Biệt?",
                "items": [
                    { "icon": "fa-solid fa-eye-slash", "title": "Sạch 100%", "desc": "Tuyệt đối không chèn pop-up, không điều hướng quảng cáo bẩn gây ức chế cho khách hàng." },
                    { "icon": "fa-solid fa-infinity", "title": "Vô hạn lượt quét", "desc": "Mã QR hoạt động vĩnh viễn, không giới hạn dung lượng truy cập, yên tâm in ấn số lượng lớn." },
                    { "icon": "fa-solid fa-bolt", "title": "Tốc độ tức thì", "desc": "Định dạng mã tối ưu mật độ điểm ảnh, giúp camera điện thoại nhận diện nhanh dưới 0.5 giây." },
                    { "icon": "fa-solid fa-headset", "title": "Hỗ trợ kỹ thuật", "desc": "Được đội ngũ kỹ sư hạ tầng của SGO hỗ trợ giám sát, đảm bảo đường truyền luôn thông suốt." }
                ]
            }
        },
        {
            "id": "qr-comparison",
            "type": "QrComparison",
            "order": 4,
            "props": {
                "title": "Xem xét & Cân nhắc trước khi quyết định in ấn",
                "rows": [
                    { "feature": "Quảng cáo hiển thị kèm theo", "sgo": "Hoàn toàn KHÔNG", "others": "Có (Sau vài ngày sử dụng)" },
                    { "feature": "Giới hạn thời hạn hoạt động", "sgo": "Vĩnh viễn trọn đời", "others": "Giới hạn 14 - 30 ngày" },
                    { "feature": "Tốc độ phản hồi chuyển link", "sgo": "Trực tiếp (Dưới 0.5s)", "others": "Chậm (Chờ tải trang đệm)" },
                    { "feature": "Chi phí duy trì hệ thống", "sgo": "0đ (Tài trợ miễn phí)", "others": "Đòi phí bản quyền gia hạn" }
                ]
            }
        },
        {
            "id": "qr-form",
            "type": "QrForm",
            "order": 5,
            "props": {
                "formTitle": "Đăng ký nhận mã QR Code Miễn Phí",
                "formSubtitle": "Điền thông tin đích cần chuyển hướng và nhận ngay file vector chất lượng cao"
            }
        }
    ]'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    seo_metadata = EXCLUDED.seo_metadata,
    content_data = EXCLUDED.content_data,
    updated_at = now();


-- 3.2. TRANG 2: /truy-xuat-nguon-goc
INSERT INTO sdui.pages (slug, title, description, layout_type, status, seo_metadata, content_data)
VALUES (
    'truy-xuat-nguon-goc',
    'Giải Pháp Truy Xuất Nguồn Gốc Sản Phẩm Toàn Diện - SGO Việt Nam',
    'Giải pháp truy xuất nguồn gốc sản phẩm bằng QR Code từ SGO Việt Nam. Số hóa nhật ký sản xuất, minh bạch chuỗi cung ứng, chống hàng giả và nâng tầm nông sản Việt.',
    'SERVICE_DETAIL',
    'PUBLISHED',
    '{
        "title": "Giải Pháp Truy Xuất Nguồn Gốc Sản Phẩm Toàn Diện - SGO Việt Nam",
        "description": "Số hóa nhật ký sản xuất, minh bạch chuỗi cung ứng bằng QR Code độc bản, chống hàng giả và hỗ trợ doanh nghiệp đáp ứng tiêu chuẩn xuất khẩu.",
        "canonical": "https://sgodata.com/truy-xuat-nguon-goc.html",
        "keywords": ["truy xuất nguồn gốc", "phần mềm truy xuất", "qr code chống hàng giả", "SGO Trace"]
    }'::jsonb,
    '[
        {
            "id": "trace-header",
            "type": "TraceHeader",
            "order": 1,
            "props": {
                "title": "Giải Pháp Truy Xuất Nguồn Gốc <br /> Minh Bạch Chuỗi Cung Ứng Toàn Diện",
                "description": "Số hóa quy trình từ vùng trồng, nhà máy đến tay người tiêu dùng. Bảo vệ thương hiệu vững chắc bằng hệ thống mã QR Code định danh độc bản.",
                "ctaPrimary": { "text": "Đăng ký tư vấn ngay", "link": "#dang-ky" },
                "ctaSecondary": { "text": "Tìm hiểu tính năng", "link": "#tinh-nang" }
            }
        },
        {
            "id": "trace-why",
            "type": "TraceWhy",
            "order": 2,
            "props": {
                "title": "Tại Sao Doanh Nghiệp Cần Truy Xuất Nguồn Gốc?",
                "points": [
                    "Bảo vệ uy tín thương hiệu trước nạn hàng giả, hàng nhái tràn lan.",
                    "Đáp ứng đầy đủ các tiêu chuẩn khắt khe để xuất khẩu và vào chuỗi siêu thị lớn.",
                    "Gia tăng niềm tin tuyệt đối từ người tiêu dùng khi quét mã rõ ràng nhật ký."
                ]
            }
        },
        {
            "id": "trace-features",
            "type": "TraceFeatures",
            "order": 3,
            "props": {
                "title": "Tính Năng Nổi Bật Của Hệ Thống SGO Trace",
                "features": [
                    { "icon": "fa-solid fa-qrcode", "title": "Mã QR Code Định Danh Độc Bản", "desc": "Cấp mã QR biến đổi hoặc mã QR theo lô duy nhất. Hiển thị chứng nhận VietGAP, GlobalGAP, OCOP." },
                    { "icon": "fa-solid fa-pen-to-square", "title": "Nhật Ký Sản Xuất Điện Tử", "desc": "Ghi chép thời gian thực quá trình bón phân, phun thuốc, thu hoạch ngay trên điện thoại. Chống tẩy xóa." },
                    { "icon": "fa-solid fa-boxes-packing", "title": "Quản Lý Lô Hàng & Chuỗi Cung Ứng", "desc": "Giám sát chặt chẽ hành trình từ thu mua, sơ chế, logistics đến hệ thống siêu thị, điểm bán lẻ." },
                    { "icon": "fa-solid fa-shield-halved", "title": "Tích Hợp Chống Hàng Giả", "desc": "Cảnh báo tức thì khi mã QR bị sao chép hoặc quét bất thường tại nhiều vị trí địa lý cùng lúc." },
                    { "icon": "fa-solid fa-chart-line", "title": "Báo Cáo & Thống Kê Quét", "desc": "Dashboard thống kê chi tiết số lượt quét mã, khu vực địa lý, thấu hiểu hành vi khách hàng." },
                    { "icon": "fa-solid fa-link", "title": "May Đo & Tích Hợp Hệ Thống", "desc": "Kết nối API mượt mà với hệ thống quản trị CRM / ERP hiện tại của doanh nghiệp." }
                ]
            }
        },
        {
            "id": "trace-benefits",
            "type": "TraceBenefits",
            "order": 4,
            "props": {
                "title": "Lợi Ích Thực Tiễn Cho Doanh Nghiệp Nông Sản & Sản Xuất"
            }
        },
        {
            "id": "trace-form",
            "type": "TraceForm",
            "order": 5,
            "props": {
                "formTitle": "Đăng ký Khảo Sát & Tư Vấn Hệ Thống Truy Xuất Nguồn Gốc"
            }
        }
    ]'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    seo_metadata = EXCLUDED.seo_metadata,
    content_data = EXCLUDED.content_data,
    updated_at = now();


-- 3.3. TRANG 3: /vr360
INSERT INTO sdui.pages (slug, title, description, layout_type, status, seo_metadata, content_data)
VALUES (
    'vr360',
    'Giải Pháp VR360 Du Lịch & Lưu Trú - Nâng Tầm Trải Nghiệm Khách Hàng',
    'Dịch vụ số hóa không gian VR360 toàn diện cho Khách sạn, Resort, Khu du lịch. Giúp khách hàng tham quan thực tế ảo 3D, thúc đẩy tỷ lệ đặt phòng và bứt phá doanh thu.',
    'SERVICE_DETAIL',
    'PUBLISHED',
    '{
        "title": "Giải Pháp VR360 Du Lịch & Lưu Trú - SGO Việt Nam",
        "description": "Số hóa không gian 360 độ trực quan, sa bàn ảo cho resort, khách sạn, tăng tỷ lệ đặt phòng.",
        "canonical": "https://sgodata.com/vr360.html",
        "keywords": ["VR360 du lịch", "sa bàn ảo resort", "thực tế ảo khách sạn", "tour 360 lưu trú"]
    }'::jsonb,
    '[
        {
            "id": "vr-header",
            "type": "VrHeader",
            "order": 1,
            "props": {
                "title": "Công Nghệ Tour Thực Tế Ảo VR360 <br /> Đột Phá Doanh Thu Du Lịch & Lưu Trú",
                "description": "Mang không gian nghỉ dưỡng sống động đến ngay màn hình của du khách. Trải nghiệm trực quan trước khi quyết định đặt phòng."
            }
        },
        {
            "id": "vr-benefits",
            "type": "VrBenefits",
            "order": 2,
            "props": {
                "title": "Bứt Phá Tỷ Lệ Đặt Phòng Nhờ Trải Nghiệm Thực Tế Ảo 3D"
            }
        },
        {
            "id": "vr-features",
            "type": "VrFeatures",
            "order": 3,
            "props": {
                "title": "Các Tính Năng Cao Cấp Tích Hợp Trong Tour VR360"
            }
        },
        {
            "id": "vr-pricing",
            "type": "VrPricing",
            "order": 4,
            "props": {
                "sectionTitle": "Báo Giá Dịch Vụ Tour Thực Tế Ảo VR360",
                "specialOffer": "ĐẶC QUYỀN TRỌN ĐỜI: THU PHÍ 01 LẦN DỰNG – MIỄN PHÍ DUY TRÌ TRỌN ĐỜI. TẶNG MIỄN PHÍ 01 WEBSITE RIÊNG",
                "demoLink": "https://vr.sgodata.com/demo-resort",
                "plansCatalog": "VR360_PLANS"
            }
        },
        {
            "id": "vr-faq",
            "type": "VrFaq",
            "order": 5,
            "props": {
                "title": "Giải Đáp Thắc Mắc Về Dịch Vụ VR360"
            }
        },
        {
            "id": "vr-form",
            "type": "VrForm",
            "order": 6,
            "props": {
                "title": "Đăng Ký Tư Vấn & Khảo Sát Không Gian VR360"
            }
        }
    ]'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    seo_metadata = EXCLUDED.seo_metadata,
    content_data = EXCLUDED.content_data,
    updated_at = now();


-- 3.4. TRANG 4: /pos
INSERT INTO sdui.pages (slug, title, description, layout_type, status, seo_metadata, content_data)
VALUES (
    'pos',
    'Phần Mềm Quản Lý Bán Hàng SGO POS - Đơn Giản, Tốc Độ, Hiệu Quả',
    'Phần mềm quản lý bán hàng SGO POS trực tuyến tốt nhất. Tính tiền siêu tốc 3 giây, tự động hóa quản lý kho thông minh, báo cáo thu chi trực quan trên điện thoại và máy tính.',
    'SERVICE_DETAIL',
    'PUBLISHED',
    '{
        "title": "Phần Mềm Quản Lý Bán Hàng SGO POS",
        "description": "Tính tiền 3s, quản lý kho thông minh, báo cáo doanh thu realtime, hỗ trợ đa ngành hàng.",
        "canonical": "https://sgodata.com/pos.html",
        "keywords": ["phần mềm bán hàng", "sgo pos", "tính tiền siêu tốc", "quản lý kho"]
    }'::jsonb,
    '[
        {
            "id": "pos-header",
            "type": "PosHeader",
            "order": 1,
            "props": {
                "title": "Phần Mềm Quản Lý Bán Hàng SGO POS <br /> Đơn Giản - Chuẩn Xác - Tốc Độ",
                "description": "Tối ưu quy trình thu ngân, kiểm soát kho hàng chặt chẽ và theo dõi doanh thu theo thời gian thực mọi lúc mọi nơi."
            }
        },
        {
            "id": "pos-features",
            "type": "PosFeatures",
            "order": 2,
            "props": {
                "title": "Tính Năng Vượt Trội Của SGO POS",
                "items": [
                    { "title": "Tính tiền siêu tốc 3 giây", "desc": "Giao diện cảm ứng trực quan, quét mã vạch nhanh, in hóa đơn tức thì." },
                    { "title": "Quản lý tồn kho thông minh", "desc": "Cảnh báo hàng sắp hết, tự động trừ kho khi bán hàng, kiểm kho chống thất thoát." },
                    { "title": "Báo cáo doanh thu thời gian thực", "desc": "Theo dõi lợi nhuận, dòng tiền, hàng bán chạy ngay trên app điện thoại." },
                    { "title": "Đồng bộ đa kênh & Sàn TMĐT", "desc": "Kết nối đơn hàng Shopee, TikTok Shop, Lazada và bán tại cửa hàng tập trung." }
                ]
            }
        },
        {
            "id": "pos-industries",
            "type": "PosIndustries",
            "order": 3,
            "props": {
                "title": "Giải Pháp Chuyên Sâu Cho Từng Ngành Hàng",
                "industries": ["Tạp hóa & Siêu thị mini", "Thời trang & Mỹ phẩm", "Nhà hàng & F&B", "Chuỗi cửa hàng bán lẻ"]
            }
        },
        {
            "id": "pos-form",
            "type": "PosForm",
            "order": 4,
            "props": {
                "title": "Đăng Ký Dùng Thử Miễn Phí 07 Ngày Đầy Đủ Tính Năng"
            }
        }
    ]'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    seo_metadata = EXCLUDED.seo_metadata,
    content_data = EXCLUDED.content_data,
    updated_at = now();


-- 3.5. TRANG 5: /zns
INSERT INTO sdui.pages (slug, title, description, layout_type, status, seo_metadata, content_data)
VALUES (
    'zns',
    'Giải Pháp Tin Nhắn Zalo ZNS & Chăm Sóc Khách Hàng OA - SGO Việt Nam',
    'Giải pháp gửi thông báo chăm sóc khách hàng chủ động qua số điện thoại bằng hạ tầng Zalo Notification Service (ZNS). Chi phí tối ưu, giao diện tin nhắn thương hiệu uy tín.',
    'SERVICE_DETAIL',
    'PUBLISHED',
    '{
        "title": "Giải Pháp Tin Nhắn Zalo ZNS & Chăm Sóc Khách Hàng OA - SGO Việt Nam",
        "description": "Gửi tin nhắn Zalo tự động qua Brandname, tối ưu 60% chi phí so với SMS truyền thống.",
        "canonical": "https://sgodata.com/zns.html",
        "keywords": ["zalo zns", "tin nhắn cskh", "zalo oa", "brandname zalo"]
    }'::jsonb,
    '[
        {
            "id": "zns-header",
            "type": "ZnsHeader",
            "order": 1,
            "props": {
                "title": "Giải Pháp Gửi Tin Nhắn Tự Động Zalo ZNS <br /> Nâng Tầm Trải Nghiệm Khách Hàng",
                "description": "Chăm sóc khách hàng chủ động thông qua số điện thoại với chi phí tiết kiệm hơn SMS truyền thống, tỷ lệ mở tin vượt trội trên 90%."
            }
        },
        {
            "id": "zns-why",
            "type": "ZnsWhy",
            "order": 2,
            "props": {
                "title": "Tại Sao Nên Chuyển Đổi Từ SMS Sang Zalo ZNS?",
                "reasons": [
                    "Chi phí chỉ bằng 30-50% so với tin nhắn SMS Brandname thông thường.",
                    "Hiển thị Logo, tên thương hiệu tích vàng uy tín, tạo thiện cảm lớn cho khách hàng.",
                    "Nội dung chứa nút bấm tương tác (Call to Action), dẫn thẳng về Website hoặc đơn hàng."
                ]
            }
        },
        {
            "id": "zns-use-cases",
            "type": "ZnsUseCases",
            "order": 3,
            "props": {
                "title": "Các Kịch Bản Ứng Dụng ZNS Phổ Biến",
                "scenarios": [
                    "Xác nhận đơn hàng và cập nhật hành trình vận chuyển",
                    "Gửi thông báo biến động số dư, điểm tích lũy thành viên",
                    "Chúc mừng sinh nhật tặng kèm mã giảm giá đặc quyền",
                    "Nhắc lịch hẹn dịch vụ, bảo dưỡng hoặc gia hạn hợp đồng"
                ]
            }
        },
        {
            "id": "zns-form",
            "type": "ZnsForm",
            "order": 4,
            "props": {
                "title": "Nhận Báo Giá Gói Tin Nhắn Zalo ZNS Cho Doanh Nghiệp"
            }
        }
    ]'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    seo_metadata = EXCLUDED.seo_metadata,
    content_data = EXCLUDED.content_data,
    updated_at = now();


-- 3.6. TRANG 6: /web
INSERT INTO sdui.pages (slug, title, description, layout_type, status, seo_metadata, content_data)
VALUES (
    'web',
    'Thiết Kế Website Chuyên Nghiệp Chuẩn SEO - SGO Web',
    'Dịch vụ thiết kế website chuyên nghiệp, may đo theo yêu cầu chuẩn SEO tại SGO Việt Nam. Giao diện Responsive tối ưu Mobile, tốc độ tải trang dưới 2 giây, cam kết bảo mật cao, tặng tên miền và hosting.',
    'SERVICE_DETAIL',
    'PUBLISHED',
    '{
        "title": "Thiết Kế Website Chuyên Nghiệp Chuẩn SEO - SGO Web",
        "description": "Website chuẩn SEO, tặng tên miền và hosting, bảo hành trọn đời, bàn giao 100% mã nguồn.",
        "canonical": "https://sgodata.com/web.html",
        "keywords": ["thiết kế website", "làm web chuẩn seo", "thiết kế web theo yêu cầu", "sgo web"]
    }'::jsonb,
    '[
        {
            "id": "web-header",
            "type": "WebHeader",
            "order": 1,
            "props": {
                "title": "Thiết Kế Website Chuyên Nghiệp <br /> Độc Quyền Nhận Diện & Tối Ưu Tỷ Lệ Chuyển Đổi",
                "description": "Website chuẩn cấu trúc SEO Google, giao diện mượt mà trên di động, tốc độ tải trang thần tốc."
            }
        },
        {
            "id": "web-pricing",
            "type": "WebPricing",
            "order": 2,
            "props": {
                "title": "Bảng Giá Dịch Vụ Thiết Kế Web Minh Bạch",
                "plansCatalog": "WEB_PLANS"
            }
        },
        {
            "id": "web-workflow",
            "type": "WebWorkflow",
            "order": 3,
            "props": {
                "title": "Quy Trình Triển Khai Website Chuẩn 4 Bước Tại SGO",
                "steps": [
                    { "step": "01", "name": "Khảo sát & Tư vấn giải pháp", "desc": "Tiếp nhận yêu cầu, định hình cấu trúc sitemap và phân tích đối thủ." },
                    { "step": "02", "name": "Thiết kế giao diện UI/UX", "desc": "Phác thảo layout độc quyền phù hợp bộ nhận diện thương hiệu." },
                    { "step": "03", "name": "Lập trình & Tối ưu SEO", "desc": "Xây dựng tính năng, tối ưu mã nguồn và kiểm tra tốc độ PageSpeed." },
                    { "step": "04", "name": "Nghiệm thu & Bàn giao", "desc": "Bàn giao 100% source code, hướng dẫn quản trị và kích hoạt bảo hành trọn đời." }
                ]
            }
        },
        {
            "id": "web-faq",
            "type": "WebFaq",
            "order": 4,
            "props": {
                "title": "Câu Hỏi Thường Gặp Khi Thiết Kế Website"
            }
        },
        {
            "id": "web-form",
            "type": "WebForm",
            "order": 5,
            "props": {
                "title": "Đăng Ký Tư Vấn Ý Tưởng Thiết Kế Website"
            }
        }
    ]'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    seo_metadata = EXCLUDED.seo_metadata,
    content_data = EXCLUDED.content_data,
    updated_at = now();


-- 3.7. TRANG 7: /erp
INSERT INTO sdui.pages (slug, title, description, layout_type, status, seo_metadata, content_data)
VALUES (
    'erp',
    'Giải Pháp Quản Trị Doanh Nghiệp Toàn Diện ERP - SGO Việt Nam',
    'Hệ thống phần mềm quản trị doanh nghiệp SGO ERP hợp nhất mọi quy trình vận hành từ Tài chính, Nhân sự, Kho vận đến Kinh doanh trên một nền tảng duy nhất. May đo theo từng ngành nghề.',
    'SERVICE_DETAIL',
    'PUBLISHED',
    '{
        "title": "Giải Pháp Quản Trị Doanh Nghiệp Toàn Diện ERP - SGO Việt Nam",
        "description": "Số hóa quản trị khách hàng, nhân sự, tài chính, sản xuất, báo cáo BI điều hành thông minh.",
        "canonical": "https://sgodata.com/erp.html",
        "keywords": ["phần mềm erp", "quản trị doanh nghiệp", "sgo erp", "crm erp may đo"]
    }'::jsonb,
    '[
        {
            "id": "erp-header",
            "type": "ErpHeader",
            "order": 1,
            "props": {
                "title": "Hệ Thống Quản Trị Doanh Nghiệp SGO ERP <br /> Hợp Nhất & Tự Động Hóa Mọi Luồng Vận Hành",
                "description": "Loại bỏ silo dữ liệu rời rạc, chuẩn hóa quy trình làm việc giữa các phòng ban với nền tảng may đo linh hoạt."
            }
        },
        {
            "id": "erp-modules",
            "type": "ErpModules",
            "order": 2,
            "props": {
                "title": "Phân Hệ Cốt Lõi Được \"May Đo\" Chuyên Biệt",
                "modules": [
                    { "title": "Quản Trị Tài Chính - Kế Toán", "icon": "fa-solid fa-scale-balanced", "desc": "Tự động hóa dòng tiền, hạch toán công nợ phải thu/phải trả, báo cáo realtime." },
                    { "title": "Quản Lý Chuỗi Cung Ứng & Kho", "icon": "fa-solid fa-boxes-stacked", "desc": "Kiểm soát vị trí kho, hạn mức tồn kho tối ưu, quy trình quét mã barcode/QR." },
                    { "title": "Quản Trị Nhân Sự & Tiền Lương", "icon": "fa-solid fa-users-gear", "desc": "Số hóa hồ sơ nhân sự, tự động hóa chấm công, tính lương KPI minh bạch." },
                    { "title": "Quản Trị Khách Hàng CRM & Bán Hàng", "icon": "fa-solid fa-handshake-angle", "desc": "Chuẩn hóa phễu bán hàng từ Leads đến Hợp đồng, theo dõi lịch sử chăm sóc." },
                    { "title": "Quản Lý Sản Xuất (MRP, BOM)", "icon": "fa-solid fa-industry", "desc": "Hoạch định nguyên vật liệu, lập lịch trình sản xuất và tính giá thành sản phẩm." },
                    { "title": "Hệ Thống Báo Cáo Thông Minh BI", "icon": "fa-solid fa-chart-line", "desc": "Trực quan hóa chỉ số kinh doanh dưới dạng biểu đồ động, dự báo xu hướng." }
                ]
            }
        },
        {
            "id": "erp-why",
            "type": "ErpWhy",
            "order": 3,
            "props": {
                "title": "Tại Sao Nên Chọn May Đo ERP Tại SGO Việt Nam?",
                "highlights": ["Bảo mật chuẩn ISO", "Không bị gò bó bởi tính năng thừa", "Dễ dàng nâng cấp theo tốc độ mở rộng công ty"]
            }
        },
        {
            "id": "erp-form",
            "type": "ErpForm",
            "order": 4,
            "props": {
                "title": "Yêu Cầu Demo Trực Tiếp Hệ Thống SGO ERP"
            }
        }
    ]'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    seo_metadata = EXCLUDED.seo_metadata,
    content_data = EXCLUDED.content_data,
    updated_at = now();


-- 3.8. TRANG 8: /data-bi
INSERT INTO sdui.pages (slug, title, description, layout_type, status, seo_metadata, content_data)
VALUES (
    'data-bi',
    'Hạ Tầng Dữ Liệu & Business Intelligence (BI) - SGO Data',
    'Xây dựng Hạ tầng Dữ liệu vững chắc, Data Warehouse, Data Lake, tự động hóa luồng thông tin ETL/ELT và tích hợp hệ thống Business Intelligence (Power BI, Looker Studio, Tableau) toàn diện cho doanh nghiệp.',
    'SERVICE_DETAIL',
    'PUBLISHED',
    '{
        "title": "Hạ Tầng Dữ Liệu & BI Chuyên Sâu - SGO Data",
        "description": "Biến dữ liệu thô thành quyết định chiến lược. Trực quan hóa báo cáo điều hành thời gian thực.",
        "canonical": "https://sgodata.com/data-bi.html",
        "keywords": ["hạ tầng dữ liệu", "data warehouse", "power bi", "looker studio", "data lake"]
    }'::jsonb,
    '[
        {
            "id": "bi-header",
            "type": "DataBiHeader",
            "order": 1,
            "props": {
                "title": "Hạ Tầng Dữ Liệu & Business Intelligence (BI) <br /> Biến Dữ Liệu Thô Thành Quyết Định Chiến Lược",
                "description": "Tập hợp, làm sạch và trực quan hóa toàn bộ dòng chảy dữ liệu kinh doanh của doanh nghiệp lên dashboard điều hành thời gian thực."
            }
        },
        {
            "id": "bi-stats",
            "type": "DataBiStats",
            "order": 2,
            "props": {
                "stats": [
                    { "number": "70%", "label": "Thời gian lập báo cáo được tinh gọn" },
                    { "number": "100%", "label": "Dữ liệu được cập nhật tự động realtime" },
                    { "number": "03+", "label": "Nền tảng BI được hỗ trợ: Power BI, Looker, Tableau" }
                ]
            }
        },
        {
            "id": "bi-solutions",
            "type": "DataBiSolutions",
            "order": 3,
            "props": {
                "title": "Giải Pháp Dữ Liệu Toàn Diện Từ SGO Data",
                "solutions": [
                    { "title": "Data Warehouse & Data Lake", "desc": "Lưu trữ tập trung mọi nguồn dữ liệu kế toán, CRM, bán hàng, website." },
                    { "title": "Tự động hóa luồng ETL/ELT", "desc": "Trích xuất, chuyển đổi và nạp dữ liệu hoàn toàn tự động không cần nhân sự gõ Excel." },
                    { "title": "Dashboard Điều Hành Thông Minh", "desc": "Báo cáo doanh thu, chi phí, hiệu suất nhân sự trên di động cho Ban Lãnh đạo." }
                ]
            }
        },
        {
            "id": "bi-faq",
            "type": "DataBiFaq",
            "order": 4,
            "props": {
                "title": "Câu Hỏi Thường Gặp Về Dịch Vụ Data & BI"
            }
        },
        {
            "id": "bi-form",
            "type": "DataBiForm",
            "order": 5,
            "props": {
                "title": "Đăng Ký Tư Vấn Khảo Sát Kiến Trúc Dữ Liệu"
            }
        }
    ]'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    seo_metadata = EXCLUDED.seo_metadata,
    content_data = EXCLUDED.content_data,
    updated_at = now();


-- 3.9. TRANG 9: /hop-dong-dien-tu
INSERT INTO sdui.pages (slug, title, description, layout_type, status, seo_metadata, content_data)
VALUES (
    'hop-dong-dien-tu',
    'Giải Pháp Hợp Đồng Điện Tử Chuyên Nghiệp Cho Doanh Nghiệp - SGO e-Contract',
    'Giải pháp hợp đồng điện tử e-Contract an toàn, bảo mật, đáp ứng đầy đủ tính pháp lý theo Luật Giao dịch điện tử. Tối ưu 90% chi phí và thời gian ký kết cho doanh nghiệp.',
    'SERVICE_DETAIL',
    'PUBLISHED',
    '{
        "title": "Giải Pháp Hợp Đồng Điện Tử SGO e-Contract",
        "description": "Ký kết từ xa an toàn pháp lý, tích hợp USB Token, Remote Signing và OTP SMS.",
        "canonical": "https://sgodata.com/hop-dong-dien-tu.html",
        "keywords": ["hợp đồng điện tử", "econtract", "ký số từ xa", "sgo e-contract"]
    }'::jsonb,
    '[
        {
            "id": "contract-header",
            "type": "ContractHeader",
            "order": 1,
            "props": {
                "title": "Giải Pháp Hợp Đồng Điện Tử SGO e-Contract <br /> Ký Số Mọi Lúc, Mọi Nơi - Chuẩn Pháp Lý 100%",
                "description": "Tiết kiệm 90% thời gian luân chuyển chứng từ và chi phí in ấn chuyển phát nhanh. Quản lý tài liệu kinh tế không giấy tờ an toàn."
            }
        },
        {
            "id": "contract-benefits",
            "type": "ContractBenefits",
            "order": 2,
            "props": {
                "title": "Lợi Ích Khi Chuyển Đổi Sang Hợp Đồng Điện Tử"
            }
        },
        {
            "id": "contract-pricing",
            "type": "ContractPricing",
            "order": 3,
            "props": {
                "title": "Bảng Giá Gói Lượt Ký Hợp Đồng Điện Tử"
            }
        },
        {
            "id": "contract-faq",
            "type": "ContractFaq",
            "order": 4,
            "props": {
                "title": "Giải Đáp Thắc Mắc Về Pháp Lý Hợp Đồng Điện Tử"
            }
        },
        {
            "id": "contract-form",
            "type": "ContractForm",
            "order": 5,
            "props": {
                "title": "Đăng Ký Tư Vấn & Dùng Thử Giải Pháp Hợp Đồng Điện Tử"
            }
        }
    ]'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    seo_metadata = EXCLUDED.seo_metadata,
    content_data = EXCLUDED.content_data,
    updated_at = now();


-- 3.10. TRANG 10: /ha-tang
INSERT INTO sdui.pages (slug, title, description, layout_type, status, seo_metadata, content_data)
VALUES (
    'ha-tang',
    'Hạ Tầng, Lưu Trữ Cloud & Email Doanh Nghiệp Toàn Diện - SGO Việt Nam',
    'SGO Việt Nam cung cấp dịch vụ hạ tầng số toàn diện: Đăng ký tên miền, Hosting tốc độ cao, Cloud Server, cho thuê chỗ đặt máy chủ và giải pháp Email Hosting/Email Server doanh nghiệp.',
    'SERVICE_DETAIL',
    'PUBLISHED',
    '{
        "title": "Hạ Tầng, Lưu Trữ Cloud & Email Doanh Nghiệp - SGO Việt Nam",
        "description": "Tên miền, Cloud Server, Hosting tốc độ cao, Email doanh nghiệp bảo mật, Uptime 99.99%.",
        "canonical": "https://sgodata.com/cloud-server.html",
        "keywords": ["tên miền", "hosting", "cloud server", "email doanh nghiệp", "vps việt nam"]
    }'::jsonb,
    '[
        {
            "id": "infra-header",
            "type": "InfraHeader",
            "order": 1,
            "props": {
                "title": "Hạ Tầng & Lưu Trữ Cloud Doanh Nghiệp <br /> Tốc Độ Cao, Ổn Định Uptime 99.99%",
                "description": "Nền tảng máy chủ vận hành mạnh mẽ cho website, hệ thống ERP và email doanh nghiệp với tiêu chuẩn an toàn quốc tế."
            }
        },
        {
            "id": "infra-services",
            "type": "InfraServices",
            "order": 2,
            "props": {
                "title": "Các Nhóm Dịch Vụ Hạ Tầng Nổi Bật",
                "services": [
                    { "name": "Đăng Ký Tên Miền", "desc": "Cung cấp tên miền quốc gia .vn, .com.vn và tên miền quốc tế với thủ tục kích hoạt nhanh gọn." },
                    { "name": "Hosting Tốc Độ Cao", "desc": "Trang bị ổ cứng NVMe SSD, bảng điều khiển cPanel, tăng tốc website gấp 5 lần." },
                    { "name": "Cloud Server / VPS", "desc": "Nâng cấp linh hoạt CPU/RAM không gián đoạn, sao lưu định kỳ hàng tuần." },
                    { "name": "Email Doanh Nghiệp", "desc": "Hệ thống email theo tên miền công ty, bảo mật chống spam, vào inbox 99%." }
                ]
            }
        },
        {
            "id": "infra-advantages",
            "type": "InfraAdvantages",
            "order": 3,
            "props": {
                "title": "Cam Kết Chất Lượng Dịch Vụ Từ SGO"
            }
        },
        {
            "id": "infra-faq",
            "type": "InfraFaq",
            "order": 4,
            "props": {
                "title": "Câu Hỏi Thường Gặp Về Hạ Tầng & Cloud Server"
            }
        },
        {
            "id": "infra-form",
            "type": "InfraForm",
            "order": 5,
            "props": {
                "title": "Đăng Ký Khảo Sát Nhu Cầu Hạ Tầng Cloud"
            }
        }
    ]'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    seo_metadata = EXCLUDED.seo_metadata,
    content_data = EXCLUDED.content_data,
    updated_at = now();


-- 3.11. TRANG 11: /ban-quyen
INSERT INTO sdui.pages (slug, title, description, layout_type, status, seo_metadata, content_data)
VALUES (
    'ban-quyen',
    'Sgodata.com - Bản Quyền Phần Mềm Chính Hãng Giá Tốt Nhất',
    'Cung cấp key bản quyền Windows 10/11 Pro, Office 2021/365, Windows Server chính hãng vĩnh viễn, bảo hành suốt quá trình sử dụng, hỗ trợ kỹ thuật 24/7.',
    'SERVICE_DETAIL',
    'PUBLISHED',
    '{
        "title": "Sgodata.com - Bản Quyền Phần Mềm Chính Hãng Giá Tốt Nhất",
        "description": "Bản Quyền Windows, Office & Server Giá Tốt Nhất Cho Doanh Nghiệp & Cá Nhân.",
        "canonical": "https://sgodata.com/ban-quyen.html",
        "keywords": ["bản quyền windows", "key office 2021", "office 365", "windows server key"]
    }'::jsonb,
    '[
        {
            "id": "license-header",
            "type": "LicenseHeader",
            "order": 1,
            "props": {
                "title": "Bản Quyền Phần Mềm Chính Hãng <br /> An Toàn Bảo Mật, Kích Hoạt Trực Tiếp Từ Microsoft",
                "description": "Giải pháp phần mềm có bản quyền giá tốt nhất cho doanh nghiệp và người dùng cá nhân. Bảo hành trọn đời máy."
            }
        },
        {
            "id": "license-products",
            "type": "LicenseProducts",
            "order": 2,
            "props": {
                "title": "Danh Mục Sản Phẩm Bản Quyền Phổ Biến",
                "plansCatalog": "LICENSE_PLANS"
            }
        },
        {
            "id": "license-features",
            "type": "LicenseFeatures",
            "order": 3,
            "props": {
                "title": "Tại Sao Nên Mua Bản Quyền Tại SGODATA?",
                "features": [
                    { "title": "Chính hãng 100%", "desc": "Kích hoạt trực tuyến qua máy chủ Microsoft, nhận bản cập nhật bảo mật liên tục." },
                    { "title": "Bảo hành trọn đời máy", "desc": "Hỗ trợ 1 đổi 1 nhanh chóng nếu key phát sinh lỗi trong quá trình sử dụng." },
                    { "title": "Giao key thần tốc", "desc": "Nhận key bản quyền và hướng dẫn kích hoạt tự động qua Zalo/Email trong 3-5 phút." }
                ]
            }
        },
        {
            "id": "license-steps",
            "type": "LicenseSteps",
            "order": 4,
            "props": {
                "title": "Quy Trình Mua & Kích Hoạt Key 4 Bước Đơn Giản"
            }
        },
        {
            "id": "license-faq",
            "type": "LicenseFaq",
            "order": 5,
            "props": {
                "title": "Câu Hỏi Thường Gặp Về Key Bản Quyền"
            }
        }
    ]'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    seo_metadata = EXCLUDED.seo_metadata,
    content_data = EXCLUDED.content_data,
    updated_at = now();


-- ==============================================================================
-- PHẦN 4: SEED DATA - BẢNG GIÁ DỊCH VỤ CHI TIẾT (PRICING PLANS)
-- Dành cho các module có bảng giá: VR360, Web, Bản quyền phần mềm
-- ==============================================================================

-- 4.1. Báo giá VR360 (Trích xuất từ VrPricing.tsx)
DO $$
DECLARE
    v_vr360_id UUID;
BEGIN
    SELECT id INTO v_vr360_id FROM sdui.pages WHERE slug = 'vr360';

    -- Xóa cũ nếu có để re-seed
    DELETE FROM sdui.pricing_plans WHERE page_id = v_vr360_id;

    INSERT INTO sdui.pricing_plans (page_id, plan_code, name, tier_badge, is_recommended, price_amount, price_unit, price_period, description, features_list, cta_text, display_order)
    VALUES
    (
        v_vr360_id, 'VR_8_15', 'Gói 8 - 15 Điểm', 'Quy mô nhỏ', false, 3000000, 'đ', 'Trọn gói',
        'Quét không gian phòng tiêu chuẩn, tối ưu cho homestay hoặc khách sạn mini.',
        '["Chụp quét 8-15 điểm chuẩn", "Tặng Web & Miễn phí trọn đời"]'::jsonb,
        'Đăng ký dùng', 1
    ),
    (
        v_vr360_id, 'VR_15_25', 'Gói 15 - 25 Điểm', 'Quy mô vừa', false, 5000000, 'đ', 'Trọn gói',
        'Quét chi tiết không gian khách sạn quy mô vừa và đầy đủ tiện ích cơ bản.',
        '["Quét chi tiết sạn quy mô vừa", "Tặng Web & Miễn phí trọn đời"]'::jsonb,
        'Đăng ký dùng', 2
    ),
    (
        v_vr360_id, 'VR_25_50', 'Gói 25 - 50 Điểm', 'Quy mô lớn', true, 10000000, 'đ', 'Trọn gói',
        'Phù hợp khách sạn quy mô lớn, nhiều tầng và khu dịch vụ tiện ích đi kèm.',
        '["Phù hợp khách sạn quy mô lớn", "Tặng Web & Miễn phí trọn đời"]'::jsonb,
        'Đăng ký dùng', 3
    ),
    (
        v_vr360_id, 'VR_ALL', 'Trọn Gói Khu', 'Toàn diện', false, 15000000, 'đ', 'Trọn gói',
        'Số hóa toàn bộ khu nghỉ dưỡng lớn, không giới hạn điểm quét cơ bản.',
        '["Số hóa toàn bộ khu nghỉ lớn", "Tặng Web & Miễn phí trọn đời"]'::jsonb,
        'Đăng ký dùng', 4
    );
END $$;


-- 4.2. Báo giá Thiết Kế Web (Trích xuất từ WebPricing.tsx)
DO $$
DECLARE
    v_web_id UUID;
BEGIN
    SELECT id INTO v_web_id FROM sdui.pages WHERE slug = 'web';

    DELETE FROM sdui.pricing_plans WHERE page_id = v_web_id;

    INSERT INTO sdui.pricing_plans (page_id, plan_code, name, tier_badge, is_recommended, price_amount, price_unit, price_period, description, features_list, cta_text, display_order)
    VALUES
    (
        v_web_id, 'WEB_LANDING', 'Landing Page', 'Gói Phễu / Chiến dịch', false, 3500000, 'đ', 'Trọn gói',
        'Phù hợp chạy quảng cáo chuyển đổi, giới thiệu 1 sản phẩm/dịch vụ cốt lõi duy nhất.',
        '["Thiết kế 1 trang dài chuẩn cấu chọn lọc", "Tối ưu UI/UX Mobile", "Tặng 01 năm Tên miền .com / .net", "Tặng 01 năm Hosting tốc độ cao", "Tích hợp nút gọi nhanh, Zalo, Facebook Messenger"]'::jsonb,
        'Chọn Gói Landing Page', 1
    ),
    (
        v_web_id, 'WEB_COMPANY', 'Doanh Nghiệp Standard', 'Gói Nhận Diện', true, 6500000, 'đ', 'Trọn gói',
        'Phù hợp cho các công ty giới thiệu dịch vụ, làm hồ sơ năng lực (Profile) trực tuyến uy tín.',
        '["Đầy đủ phân hệ: Trang chủ, Giới thiệu, Dịch vụ, Tin tức, Liên hệ", "Thiết kế chuẩn cấu trúc SEO của Google", "Tặng Tên miền quốc gia .vn / .com.vn", "Hosting dung lượng lớn 5GB băng thông không giới hạn", "Bàn giao tài liệu hướng dẫn quản trị dễ dàng"]'::jsonb,
        'Chọn Gói Doanh Nghiệp', 2
    ),
    (
        v_web_id, 'WEB_ECOMMERCE', 'E-Commerce / Custom', 'Gói Cao Cấp', false, 10500000, 'đ', 'Từ',
        'Phù hợp cho các shop bán hàng chuyên nghiệp, sàn TMĐT thu nhỏ hoặc hệ thống có tính năng phức tạp.',
        '["Tính năng Giỏ hàng, Đặt hàng, Quản lý đơn hàng, Thành viên", "Tích hợp thanh toán quét mã QR động, Ví điện tử", "Tự động tính phí vận chuyển theo API bên giao vận", "Hạ tầng VPS riêng biệt để bảo mật thông tin và chịu tải cao", "May đo lập trình tính năng riêng theo logic yêu cầu"]'::jsonb,
        'Liên Hệ Khảo Sát Tính Năng', 3
    );
END $$;


-- 4.3. Báo giá Bản Quyền Phần Mềm (Trích xuất từ LicenseProducts.tsx)
DO $$
DECLARE
    v_license_id UUID;
BEGIN
    SELECT id INTO v_license_id FROM sdui.pages WHERE slug = 'ban-quyen';

    DELETE FROM sdui.pricing_plans WHERE page_id = v_license_id;

    INSERT INTO sdui.pricing_plans (page_id, plan_code, name, tier_badge, is_recommended, price_amount, price_unit, price_period, description, features_list, cta_text, display_order)
    VALUES
    (
        v_license_id, 'LIC_WIN', 'Windows 10 / 11 Pro', 'Cá nhân & Cty', false, 250000, 'đ', 'Giá từ',
        'Bản quyền điện tử chính hãng, kích hoạt vĩnh viễn 1 PC, hỗ trợ update thoải mái.',
        '["Key Retail / Digital", "Cài lại không mất bản quyền", "Bảo hành trọn đời máy"]'::jsonb,
        'Đặt Mua Ngay', 1
    ),
    (
        v_license_id, 'LIC_OFFICE', 'Office 2021 / 365', 'Bán Chạy', true, 350000, 'đ', 'Giá từ',
        'Word, Excel, PowerPoint, Outlook... Đầy đủ tính năng mới nhất cho công việc văn phòng.',
        '["Liên kết tài khoản Microsoft", "Dùng vĩnh viễn (Bản 2021)", "5 thiết bị (Bản 365)"]'::jsonb,
        'Đặt Mua Ngay', 2
    ),
    (
        v_license_id, 'LIC_SERVER', 'Windows Server', 'Hạ tầng IT', false, 890000, 'đ', 'Giá từ',
        'Windows Server 2016, 2019, 2022 Standard / Datacenter ổn định cho hạ tầng IT doanh nghiệp.',
        '["Key MAK / KMS chuẩn", "Hỗ trợ ảo hóa Hyper-V", "Kích hoạt trực tiếp"]'::jsonb,
        'Đặt Mua Ngay', 3
    ),
    (
        v_license_id, 'LIC_COMBO', 'Combo Win + Office', 'Tiết Kiệm', false, 500000, 'đ', 'Giá từ',
        'Giải pháp toàn diện kết hợp hệ điều hành Windows và bộ công cụ Office với mức giá ưu đãi nhất.',
        '["Windows 10/11 Pro + Office", "Tiết kiệm đến 30% chi phí", "Hỗ trợ cài đặt từ A-Z"]'::jsonb,
        'Đặt Mua Ngay', 4
    );
END $$;


-- ==============================================================================
-- PHẦN 5: SEED DATA - CÂU HỎI THƯỜNG GẶP (FAQS) THEO TỪNG TRANG
-- Trích xuất từ FAQ.tsx, WebPage, BanQuyenPage, DataBiPage, HopDongDienTuPage, HaTangPage
-- ==============================================================================

-- 5.1. FAQs cho Trang Tổng Dịch Vụ
DO $$
DECLARE
    v_page_id UUID;
BEGIN
    SELECT id INTO v_page_id FROM sdui.pages WHERE slug = 'dich-vu';
    DELETE FROM sdui.faqs WHERE page_id = v_page_id;

    INSERT INTO sdui.faqs (page_id, question, answer_html, display_order)
    VALUES
    (
        v_page_id,
        'Các dịch vụ trong hệ sinh thái của SGO Việt Nam có thể kết nối kết hợp với nhau không?',
        'Có. Toàn bộ các giải pháp từ Thiết kế Website, mã QR Truy xuất nguồn gốc, Phần mềm bán hàng POS đến Hệ thống tin nhắn tự động Zalo ZNS và Hợp đồng điện tử đều được kiến trúc để liên kết chặt chẽ thông qua hệ thống cổng API đồng bộ. Điều này giúp dòng chảy dữ liệu khách hàng và doanh thu đổ tập trung về hệ thống quản trị CRM / ERP mà không gặp phải tình trạng phân mảnh.',
        1
    ),
    (
        v_page_id,
        'SGO Việt Nam có hỗ trợ chỉnh sửa và may đo phần mềm theo yêu cầu riêng không?',
        'Có. Bên cạnh các gói sản phẩm phần mềm đóng gói tiêu chuẩn triển khai nhanh, SGO Việt Nam sở hữu đội ngũ lập trình viên chuyên nghiệp chuyên trách mảng may đo hệ thống. Chúng tôi sẽ tiến hành khảo sát cách thức vận hành thực chiến của quý doanh nghiệp để tùy chỉnh hoặc viết mới các module phân hệ chuyên sâu theo đúng bài toán đặc thù ngành nghề của bạn.',
        2
    ),
    (
        v_page_id,
        'Mã QR tạo từ hệ thống của SGO có bị giới hạn lượt quét hay chứa quảng cáo không?',
        'Hoàn toàn không. Với phân hệ tạo mã QR miễn phí, SGO cam kết cung cấp mã độc bản sạch 100%, không dính quảng cáo chuyển hướng từ bên thứ ba và không giới hạn số lượt quét trọn đời. Đối với giải pháp QR Code nâng cấp thuộc phân hệ Truy xuất nguồn gốc hay Chống hàng giả, hệ thống sẽ bổ sung các lớp bảo mật, xác thực biến đổi và dashboard phân tích chuyên sâu.',
        3
    ),
    (
        v_page_id,
        'Tôi có thể nhúng Tour thực tế ảo VR360 của SGO vào website riêng hiện tại không?',
        'Hoàn toàn được. Hệ thống VR360 của SGO xuất dữ liệu đầu ra dưới dạng liên kết URL mã hóa an toàn hoặc đoạn mã nhúng Iframe (tương tự mã nhúng Youtube). Doanh nghiệp của bạn có thể dễ dàng chèn đoạn mã này vào bất kỳ vị trí nào trên website hiện tại để khách hàng trải nghiệm xoay không gian trực tiếp mà không ảnh hưởng tới tốc độ tải trang.',
        4
    ),
    (
        v_page_id,
        'Giải pháp Hợp đồng điện tử của SGO có đảm bảo tính pháp lý không?',
        'Hoàn toàn đảm bảo. Giải pháp Hợp đồng điện tử (e-Contract) của SGO tuân thủ chặt chẽ theo quy định của Luật Giao dịch điện tử, Luật Dân sự và các thông tư hướng dẫn từ Bộ Công Thương. Toàn bộ quy trình ký số công cộng, ký số từ xa (Remote Signing) đều có tính bảo mật cao, chống giả mạo và được pháp luật Việt Nam công nhận giá trị pháp lý tương đương hợp đồng giấy truyền thống.',
        5
    ),
    (
        v_page_id,
        'Dịch vụ hạ tầng Cloud, Server của SGO có cam kết thời gian uptime ổn định không?',
        'SGO Việt Nam cam kết tỷ lệ ổn định uptime đạt 99.99% trên toàn bộ hạ tầng Cloud Server, Hosting và Chỗ đặt máy chủ nhờ việc hợp tác vận hành tại các trung tâm dữ liệu (Data Center) đạt chuẩn Tier 3 quốc tế tại Việt Nam. Hệ thống được trang bị tường lửa chống DDoS tự động, sao lưu (backup) định kỳ giúp bảo toàn dữ liệu doanh nghiệp an toàn tối đa.',
        6
    );
END $$;


-- 5.2. FAQs cho Trang Thiết Kế Web
DO $$
DECLARE
    v_page_id UUID;
BEGIN
    SELECT id INTO v_page_id FROM sdui.pages WHERE slug = 'web';
    DELETE FROM sdui.faqs WHERE page_id = v_page_id;

    INSERT INTO sdui.faqs (page_id, question, answer_html, display_order)
    VALUES
    (
        v_page_id,
        'Chi phí thiết kế website tại SGO là trọn gói hay có phát sinh gì không?',
        'Báo giá tại SGO là chi phí trọn gói theo hợp đồng bao gồm thiết kế, lập trình, tặng kèm tên miền và hosting năm đầu tiên. Chúng tôi cam kết không phát sinh bất kỳ khoản phí ẩn nào trong suốt quá trình triển khai.',
        1
    ),
    (
        v_page_id,
        'Tôi có được sở hữu hoàn toàn mã nguồn (Source Code) sau khi bàn giao không?',
        'Có. Sau khi nghiệm thu và thanh lý hợp đồng, SGO bàn giao 100% bản quyền và mã nguồn gốc của website cho khách hàng quản lý, không khóa mã, không giữ source.',
        2
    ),
    (
        v_page_id,
        'Website sau khi bàn giao có được bảo hành bảo trì không?',
        'Tất cả website do SGO triển khai và sử dụng hạ tầng hosting/vps của chúng tôi đều được bảo hành, bảo trì trọn đời, hỗ trợ khắc phục các lỗi kỹ thuật và vận hành 24/7.',
        3
    );
END $$;
