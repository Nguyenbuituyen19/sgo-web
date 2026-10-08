-- ============================================================================
-- SEED DỮ LIỆU FAQ CHO TẤT CẢ PROVISIONS
-- Bảng: platform.provision_faqs (nếu có) hoặc sdui.faqs
-- ============================================================================

-- Kiểm tra và tạo bảng provision_faqs nếu chưa tồn tại
CREATE TABLE IF NOT EXISTS platform.provision_faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provision_id UUID NOT NULL REFERENCES platform.provisions(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Xóa dữ liệu cũ để tránh trùng lặp
TRUNCATE TABLE platform.provision_faqs CASCADE;

-- ============================================================================
-- FAQ CHO WEB (Thiết kế Website)
-- ============================================================================
INSERT INTO platform.provision_faqs (provision_id, question, answer, display_order, status)
SELECT 
    p.id,
    q.question,
    q.answer,
    q.display_order,
    'ACTIVE'
FROM platform.provisions p
CROSS JOIN (VALUES
    ('Chi phí thiết kế website tại SGO là trọn gói hay có phát sinh gì không?', 
     'Báo giá tại SGO là chi phí trọn gói theo hợp đồng bao gồm thiết kế, lập trình, tặng kèm tên miền và hosting năm đầu tiên. Chúng tôi cam kết không phát sinh bất kỳ khoản phí ẩn nào trong suốt quá trình triển khai.', 
     1),
    ('SGO sử dụng mã nguồn gì để thiết kế website?', 
     'Tùy thuộc vào nhu cầu của bạn, SGO tối ưu trên các nền tảng mã nguồn phổ biến tối ưu SEO như WordPress (may đo giao diện thuần tốc độ cao) hoặc lập trình hệ thống riêng biệt (Custom Code) cho các nền tảng thương mại điện tử phức tạp.', 
     2),
    ('Website sau khi bàn giao có được bảo hành bảo trì không?', 
     'Tất cả website do SGO triển khai và sử dụng hạ tầng hosting/vps của chúng tôi đều được bảo hành, bảo trì trọn đời, hỗ trợ khắc phục các lỗi kỹ thuật và vận hành 24/7.', 
     3),
    ('Thời gian hoàn thiện một website mất bao lâu?', 
     'Thời gian hoàn thành phụ thuộc vào quy mô dự án: Gói Landing Page thường từ 3 - 5 ngày làm việc. Gói Website Doanh nghiệp tiêu chuẩn từ 7 - 12 ngày. Gói Thương mại điện tử/Yêu cầu riêng từ 15 - 30 ngày.', 
     4),
    ('Tôi có được sở hữu hoàn toàn mã nguồn (Source Code) sau khi bàn giao không?', 
     'Có. Sau khi nghiệm thu và thanh lý hợp đồng, SGO bàn giao 100% bản quyền và mã nguồn gốc của website cho khách hàng quản lý, không khóa mã, không giữ source.', 
     5),
    ('Website được thiết kế đã tối ưu chuẩn SEO và Responsive trên điện thoại chưa?', 
     'Chắc chắn. 100% sản phẩm của SGO được cấu trúc chuẩn hóa schema dữ liệu, tối ưu điểm kiểm tra Google PageSpeed và tự động tương thích hoàn hảo (Responsive) trên tất cả màn hình thiết bị di động, iPad, Máy tính.', 
     6),
    ('Sang năm thứ 2, tôi cần đóng những chi phí gì để duy trì website?', 
     'Từ năm thứ 2 trở đi, bạn chỉ cần nộp phí gia hạn cố định cho Tên miền (Domain) và Không gian lưu trữ (Hosting) theo bảng giá nhà nước và biểu phí nhà mạng cấu hình ban đầu, hoàn toàn không mất thêm phí duy trì phần mềm.', 
     7),
    ('SGO có hỗ trợ hướng dẫn tôi tự quản trị website, up bài viết sản phẩm không?', 
     'Có. SGO sẽ cung cấp tài liệu hướng dẫn chi tiết dạng văn bản kèm video quay sẵn, đồng thời có kỹ thuật viên hướng dẫn trực tiếp qua UltraView/Zalo để đảm bảo người không rành công nghệ vẫn quản trị dễ dàng.', 
     8),
    ('Nếu tôi đã có sẵn Tên miền hoặc Hosting thì chi phí có được giảm trừ không?', 
     'Có, SGO sẽ khấu trừ trực tiếp giá trị tiền mặt tương ứng của gói quà tặng tên miền/hosting vào tổng giá trị hợp đồng thiết kế nếu bạn mong muốn sử dụng hạ tầng có sẵn của mình.', 
     9),
    ('SGO có hỗ trợ viết bài hay làm nội dung ban đầu cho website không?', 
     'Trong các gói thiết kế, SGO hỗ trợ cấu hình khung dữ liệu, tối ưu banner cơ bản và cập nhật từ 5 - 10 bài viết/sản phẩm mẫu để định hình layout mẫu. Nếu bạn cần xây dựng nội dung fanpage/website số lượng lớn, chúng tôi có cung cấp gói Content Marketing bổ sung chuyên nghiệp.', 
     10)
) AS q(question, answer, display_order)
WHERE p.code = 'web';

-- ============================================================================
-- FAQ CHO HỢP ĐỒNG ĐIỆN TỬ
-- ============================================================================
INSERT INTO platform.provision_faqs (provision_id, question, answer, display_order, status)
SELECT 
    p.id,
    q.question,
    q.answer,
    q.display_order,
    'ACTIVE'
FROM platform.provisions p
CROSS JOIN (VALUES
    ('Hợp đồng điện tử e-Contract có giá trị pháp lý tương đương hợp đồng giấy không?', 
     'Có. Theo Điều 14 Luật Giao dịch điện tử và Điều 119 Bộ luật Dân sự Việt Nam, hợp đồng điện tử được thừa nhận có giá trị pháp lý hoàn toàn tương đương với hợp đồng văn bản truyền thống nếu đáp ứng đủ điều kiện về tính toàn vẹn và xác thực.', 
     1),
    ('Tôi có thể dùng những phương thức nào để ký kết trên hệ thống?', 
     'SGO e-Contract hỗ trợ đa dạng phương thức ký: Ký số bằng USB Token, Ký số từ xa (Remote Signing), ký bằng SIM CA, hoặc ký điện tử xác thực qua mã OTP SMS/Email một cách nhanh chóng.', 
     2),
    ('Khách hàng của tôi không có tài khoản SGO e-Contract thì có ký được không?', 
     'Hoàn toàn ký được. Đối tác của bạn chỉ cần nhận được liên kết qua Email/SMS, truy cập trực tiếp bằng trình duyệt trên máy tính hoặc điện thoại để xác thực OTP và thực hiện ký số mà không cần tốn chi phí mua tài khoản phần mềm.', 
     3),
    ('Hệ thống bảo mật dữ liệu hợp đồng của doanh nghiệp như thế nào?', 
     'Dữ liệu được mã hóa truyền tải qua giao thức mã hóa SSL/TLS, lưu trữ an toàn trên hạ tầng Cloud đạt chuẩn quốc tế. Mọi lịch sử tác động, thời gian ký đều được ghi lại tường minh chống giả mạo.', 
     4),
    ('Phần mềm có tích hợp được vào hệ thống quản trị nội bộ CRM/ERP sẵn có không?', 
     'Có. SGO e-Contract cung cấp hệ thống API mở chuyên nghiệp, cho phép dễ dàng tích hợp quy trình tạo và phê duyệt hợp đồng trực tiếp từ các phần mềm nhân sự, kế toán, CRM, ERP của doanh nghiệp.', 
     5),
    ('Quy trình triển khai cài đặt hệ thống mất bao lâu?', 
     'Hệ thống hoạt động trên nền tảng Cloud, doanh nghiệp có thể khởi tạo tài khoản phân quyền và đưa vào vận hành ký kết ngay trong ngày sau khi cấu hình mẫu phôi hợp đồng.', 
     6),
    ('Có giới hạn số lượng người ký hay phòng ban sử dụng không?', 
     'Không. Phần mềm hỗ trợ tạo không giới hạn tài khoản người dùng và phòng ban (Kinh doanh, Nhân sự, Kế toán...). Chi phí chỉ tính dựa trên số lượng gói hợp đồng thực tế giao dịch.', 
     7),
    ('Khi xảy ra tranh chấp, hợp đồng điện tử có dùng làm chứng cứ được không?', 
     'Có. Hợp đồng điện tử e-Contract xuất ra định dạng tệp tin đính kèm chứng thư số hợp lệ là chứng cứ pháp lý vững chắc trước Tòa án và các cơ quan Trọng tài thương mại.', 
     8),
    ('Hệ thống có cảnh báo khi hợp đồng sắp hết hạn hay không?', 
     'Có. Tính năng quản trị thông minh sẽ tự động gửi thông báo nhắc nhở qua Email/Dashboard cho các bên liên quan khi hợp đồng kinh tế hoặc hợp đồng lao động sắp đến ngày đáo hạn.', 
     9),
    ('Chi phí gia hạn phần mềm hàng năm được tính như thế nào?', 
     'Doanh nghiệp chỉ cần mua gói lượt ký theo nhu cầu thực tế, số lượng lượt ký chưa dùng hết trong năm sẽ được bảo lưu cộng dồn khi gia hạn gói mới, không phát sinh chi phí duy trì phần mềm vô lý.', 
     10)
) AS q(question, answer, display_order)
WHERE p.code = 'hop-dong';

-- ============================================================================
-- FAQ CHO VR360
-- ============================================================================
INSERT INTO platform.provision_faqs (provision_id, question, answer, display_order, status)
SELECT 
    p.id,
    q.question,
    q.answer,
    q.display_order,
    'ACTIVE'
FROM platform.provisions p
CROSS JOIN (VALUES
    ('VR360 là gì và có lợi ích gì cho ngành du lịch & lưu trú?', 
     'VR360 (Virtual Reality 360) là công nghệ số hóa không gian thực tế thành tour tham quan ảo 360 độ. Với khách sạn, resort, khu du lịch, VR360 giúp khách hàng trải nghiệm trước không gian, tăng niềm tin và thúc đẩy tỷ lệ đặt phòng đáng kể.', 
     1),
    ('Chất lượng hình ảnh VR360 có rõ nét không?', 
     'Chúng tôi sử dụng thiết bị chụp chuyên nghiệp với ống kính 360 độ, cho ra hình ảnh sắc nét, màu sắc chân thực, hỗ trợ xem trên mọi thiết bị từ điện thoại, tablet đến máy tính và kính VR.', 
     2),
    ('Tour VR360 có tích hợp được vào website của tôi không?', 
     'Hoàn toàn có thể. Tour VR360 được nhúng trực tiếp vào website qua iframe hoặc API, giúp khách hàng trải nghiệm ngay trên trang chủ mà không cần chuyển sang nền tảng khác.', 
     3),
    ('Thời gian hoàn thiện một tour VR360 mất bao lâu?', 
     'Tùy thuộc vào quy mô không gian cần chụp, thông thường từ 3-7 ngày làm việc sau khi hoàn thành buổi chụp thực tế tại địa điểm.', 
     4),
    ('Tôi có thể tự cập nhật nội dung trong tour VR360 không?', 
     'Có. Chúng tôi cung cấp công cụ quản trị đơn giản, cho phép bạn thay đổi điểm đánh dấu (hotspot), thêm thông tin phòng, chèn video hoặc link đặt phòng dễ dàng.', 
     5)
) AS q(question, answer, display_order)
WHERE p.code = 'vr360';

-- ============================================================================
-- FAQ CHO ERP
-- ============================================================================
INSERT INTO platform.provision_faqs (provision_id, question, answer, display_order, status)
SELECT 
    p.id,
    q.question,
    q.answer,
    q.display_order,
    'ACTIVE'
FROM platform.provisions p
CROSS JOIN (VALUES
    ('Hệ thống ERP/CRM có phù hợp với doanh nghiệp nhỏ không?', 
     'Có. Giải pháp ERP/CRM của SGO được thiết kế module hóa, doanh nghiệp có thể bắt đầu với các tính năng cốt lõi và mở rộng dần theo nhu cầu, phù hợp với mọi quy mô từ startup đến tập đoàn.', 
     1),
    ('Thời gian triển khai hệ thống ERP mất bao lâu?', 
     'Tùy thuộc vào mức độ tùy chỉnh và quy mô doanh nghiệp, thông thường từ 2-8 tuần cho các doanh nghiệp vừa và nhỏ, và 2-6 tháng cho các hệ thống phức tạp hơn.', 
     2),
    ('Dữ liệu của doanh nghiệp có được bảo mật không?', 
     'Tuyệt đối. Hệ thống sử dụng mã hóa SSL/TLS, phân quyền chi tiết theo vai trò, sao lưu tự động hàng ngày và tuân thủ các tiêu chuẩn bảo mật quốc tế.', 
     3)
) AS q(question, answer, display_order)
WHERE p.code = 'erp';

-- ============================================================================
-- FAQ CHO POS
-- ============================================================================
INSERT INTO platform.provision_faqs (provision_id, question, answer, display_order, status)
SELECT 
    p.id,
    q.question,
    q.answer,
    q.display_order,
    'ACTIVE'
FROM platform.provisions p
CROSS JOIN (VALUES
    ('Phần mềm POS có hoạt động offline khi mất mạng không?', 
     'Có. Hệ thống hỗ trợ chế độ offline, vẫn bán hàng và in hóa đơn bình thường. Khi có mạng, dữ liệu sẽ tự động đồng bộ lên cloud.', 
     1),
    ('POS có tích hợp được với các thiết bị phần cứng không?', 
     'Hoàn toàn tương thích với máy in hóa đơn, ngăn kéo đựng tiền, máy quét mã vạch, cân điện tử và nhiều thiết bị ngoại vi phổ biến trên thị trường.', 
     2),
    ('Tôi có thể quản lý nhiều chi nhánh từ xa không?', 
     'Có. Dashboard quản trị cho phép theo dõi doanh thu, tồn kho, nhân viên của tất cả chi nhánh theo thời gian thực từ bất kỳ đâu qua internet.', 
     3)
) AS q(question, answer, display_order)
WHERE p.code = 'pos';

-- ============================================================================
-- FAQ CHO ZNS
-- ============================================================================
INSERT INTO platform.provision_faqs (provision_id, question, answer, display_order, status)
SELECT 
    p.id,
    q.question,
    q.answer,
    q.display_order,
    'ACTIVE'
FROM platform.provisions p
CROSS JOIN (VALUES
    ('ZNS là gì và có lợi ích gì cho chăm sóc khách hàng?', 
     'ZNS (Zalo Notification Service) là dịch vụ gửi tin nhắn thông báo qua Zalo OA, giúp doanh nghiệp tiếp cận khách hàng nhanh chóng với tỷ lệ mở tin nhắn cao hơn email truyền thống.', 
     1),
    ('Tôi có thể gửi bao nhiêu tin nhắn ZNS mỗi ngày?', 
     'Số lượng phụ thuộc vào gói đăng ký. Gói cơ bản cho phép gửi vài trăm tin/ngày, gói doanh nghiệp có thể gửi hàng nghìn đến hàng chục nghìn tin/ngày.', 
     2),
    ('ZNS có tích hợp được với hệ thống CRM/ERP hiện có không?', 
     'Có. Chúng tôi cung cấp API đầy đủ để tích hợp ZNS vào hệ thống CRM, ERP, hoặc phần mềm quản lý bán hàng hiện tại của bạn.', 
     3)
) AS q(question, answer, display_order)
WHERE p.code = 'zns';

-- ============================================================================
-- FAQ CHO TRUY XUẤT NGUỒN GỐC
-- ============================================================================
INSERT INTO platform.provision_faqs (provision_id, question, answer, display_order, status)
SELECT 
    p.id,
    q.question,
    q.answer,
    q.display_order,
    'ACTIVE'
FROM platform.provisions p
CROSS JOIN (VALUES
    ('Giải pháp truy xuất nguồn gốc hoạt động như thế nào?', 
     'Hệ thống gán mã QR/code duy nhất cho từng sản phẩm, lưu trữ toàn bộ lịch sử từ nguyên liệu, sản xuất, kiểm định đến phân phối. Khách hàng chỉ cần quét mã để xem toàn bộ hành trình sản phẩm.', 
     1),
    ('Doanh nghiệp nhỏ có cần giải pháp truy xuất nguồn gốc không?', 
     'Rất cần thiết, đặc biệt với ngành thực phẩm, nông sản, dược phẩm. Truy xuất nguồn gốc giúp tăng niềm tin khách hàng và đáp ứng yêu cầu pháp lý ngày càng khắt khe.', 
     2),
    ('Thời gian triển khai hệ thống truy xuất nguồn gốc mất bao lâu?', 
     'Tùy quy mô, thông thường từ 2-6 tuần cho doanh nghiệp vừa và nhỏ, bao gồm cấu hình hệ thống, đào tạo nhân viên và bàn giao tài liệu.', 
     3)
) AS q(question, answer, display_order)
WHERE p.code = 'truy-xuat';

-- ============================================================================
-- FAQ CHO QR CODE
-- ============================================================================
INSERT INTO platform.provision_faqs (provision_id, question, answer, display_order, status)
SELECT 
    p.id,
    q.question,
    q.answer,
    q.display_order,
    'ACTIVE'
FROM platform.provisions p
CROSS JOIN (VALUES
    ('Tôi có thể tạo mã QR động (dynamic QR) không?', 
     'Có. Mã QR động cho phép bạn thay đổi nội dung đích mà không cần in lại mã QR, rất tiện lợi cho các chiến dịch marketing thay đổi thường xuyên.', 
     1),
    ('Mã QR có thể chứa những loại thông tin gì?', 
     'URL website, số điện thoại, email, văn bản, vCard (thông tin liên hệ), WiFi credentials, và nhiều định dạng khác tùy nhu cầu sử dụng.', 
     2),
    ('Tôi có thể theo dõi số lần quét mã QR không?', 
     'Có. Hệ thống cung cấp dashboard theo dõi real-time: số lần quét, vị trí địa lý, thiết bị, thời gian quét, giúp đo lường hiệu quả chiến dịch.', 
     3)
) AS q(question, answer, display_order)
WHERE p.code = 'qr-code';

-- ============================================================================
-- FAQ CHO HẠ TẦNG & CLOUD
-- ============================================================================
INSERT INTO platform.provision_faqs (provision_id, question, answer, display_order, status)
SELECT 
    p.id,
    q.question,
    q.answer,
    q.display_order,
    'ACTIVE'
FROM platform.provisions p
CROSS JOIN (VALUES
    ('Cloud Server tại SGO Việt Nam sử dụng hạ tầng ảo hóa gì? Có cam kết Uptime không?', 
     'SGO Cloud Server hoạt động trên nền tảng ảo hóa toàn phần KVM tiên tiến nhất hiện nay, cam kết 100% tài nguyên CPU, RAM và SSD NVMe được cấp phát độc lập. Chúng tôi cam kết chỉ số Uptime 99.99% bằng hợp đồng SLA rõ ràng với hệ thống tự động dự phòng Cluster.', 
     1),
    ('Dữ liệu trên Cloud Server và Hosting có được sao lưu (Backup) tự động không?', 
     'Có. Toàn bộ hệ thống máy chủ Cloud và Hosting tại SGO đều được cài đặt cơ chế tự động sao lưu Snapshot/Backup định kỳ mỗi tuần 1 lần. Khách hàng cũng có thể chủ động tạo Snapshot tức thì qua Control Panel bất cứ lúc nào.', 
     2),
    ('SGO có hỗ trợ di chuyển (Migrate) dữ liệu từ nhà cung cấp cũ về không?', 
     'Hoàn toàn miễn phí. Đội ngũ kỹ sư hạ tầng của SGO Việt Nam hỗ trợ trọn gói việc chuyển đổi toàn bộ mã nguồn Website, Database và cấu hình Email Doanh nghiệp từ nhà cung cấp cũ về máy chủ mới mà không làm gián đoạn truy cập.', 
     3)
) AS q(question, answer, display_order)
WHERE p.code = 'ha-tang';

-- ============================================================================
-- FAQ CHO LIÊN HỆ (CONTACT)
-- ============================================================================
INSERT INTO platform.provision_faqs (provision_id, question, answer, display_order, status)
SELECT 
    p.id,
    q.question,
    q.answer,
    q.display_order,
    'ACTIVE'
FROM platform.provisions p
CROSS JOIN (VALUES
    ('Làm sao để liên hệ với SGO Việt Nam?', 
     'Bạn có thể gọi hotline 0246.292.7089, gửi email về info@sgodata.com, hoặc điền form liên hệ trên website. Đội ngũ tư vấn sẽ phản hồi trong vòng 24h.', 
     1),
    ('SGO Việt Nam có hỗ trợ tư vấn miễn phí không?', 
     'Có. Chúng tôi cung cấp buổi tư vấn miễn phí để hiểu nhu cầu cụ thể của doanh nghiệp bạn, từ đó đề xuất giải pháp tối ưu nhất về chi phí và hiệu quả.', 
     2),
    ('Quy trình làm việc với SGO như thế nào?', 
     'Quy trình gồm 5 bước: (1) Tiếp nhận yêu cầu, (2) Khảo sát & phân tích, (3) Đề xuất giải pháp & báo giá, (4) Ký hợp đồng & triển khai, (5) Bàn giao & hỗ trợ sau bán hàng.', 
     3),
    ('SGO có hỗ trợ doanh nghiệp ở tỉnh thành khác không?', 
     'Có. Chúng tôi làm việc với khách hàng trên toàn quốc thông qua hình thức online (Zoom, Google Meet) và cử đội kỹ thuật đến tận nơi khi cần thiết.', 
     4)
) AS q(question, answer, display_order)
WHERE p.code = 'contact';

-- ============================================================================
-- KIỂM TRA KẾT QUẢ
-- ============================================================================
SELECT 
    p.code AS provision_code,
    p.name AS provision_name,
    COUNT(pf.id) AS faq_count
FROM platform.provisions p
LEFT JOIN platform.provision_faqs pf ON p.id = pf.provision_id
GROUP BY p.code, p.name
ORDER BY p.code;
