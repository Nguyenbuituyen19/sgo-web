import { FaqItem } from "@/hooks/useProvisionContent";

/** Nội dung FAQ tham chiếu đã được seed vào provision_details trên backend. */

export const DEFAULT_FAQS: Record<string, FaqItem[]> = {
  web: [
    {
      q: "Chi phí thiết kế website tại SGO là trọn gói hay có phát sinh gì không?",
      a: "Báo giá tại SGO là chi phí trọn gói theo hợp đồng bao gồm thiết kế, lập trình, tặng kèm tên miền và hosting năm đầu tiên. Chúng tôi cam kết không phát sinh bất kỳ khoản phí ẩn nào trong suốt quá trình triển khai.",
      displayOrder: 1,
    },
    {
      q: "SGO sử dụng mã nguồn gì để thiết kế website?",
      a: "Tùy thuộc vào nhu cầu của bạn, SGO tối ưu trên các nền tảng mã nguồn phổ biến tối ưu SEO như WordPress (may đo giao diện thuần tốc độ cao) hoặc lập trình hệ thống riêng biệt (Custom Code) cho các nền tảng thương mại điện tử phức tạp.",
      displayOrder: 2,
    },
    {
      q: "Website sau khi bàn giao có được bảo hành bảo trì không?",
      a: "Tất cả website do SGO triển khai và sử dụng hạ tầng hosting/vps của chúng tôi đều được bảo hành, bảo trì trọn đời, hỗ trợ khắc phục các lỗi kỹ thuật và vận hành 24/7.",
      displayOrder: 3,
    },
    {
      q: "Thời gian hoàn thiện một website mất bao lâu?",
      a: "Thời gian hoàn thành phụ thuộc vào quy mô dự án: Gói Landing Page thường từ 3 - 5 ngày làm việc. Gói Website Doanh nghiệp tiêu chuẩn từ 7 - 12 ngày. Gói Thương mại điện tử/Yêu cầu riêng từ 15 - 30 ngày.",
      displayOrder: 4,
    },
    {
      q: "Tôi có được sở hữu hoàn toàn mã nguồn (Source Code) sau khi bàn giao không?",
      a: "Có. Sau khi nghiệm thu và thanh lý hợp đồng, SGO bàn giao 100% bản quyền và mã nguồn gốc của website cho khách hàng quản lý, không khóa mã, không giữ source.",
      displayOrder: 5,
    },
    {
      q: "Website được thiết kế đã tối ưu chuẩn SEO và Responsive trên điện thoại chưa?",
      a: "Chắc chắn. 100% sản phẩm của SGO được cấu trúc chuẩn hóa schema dữ liệu, tối ưu điểm kiểm tra Google PageSpeed và tự động tương thích hoàn hảo (Responsive) trên tất cả màn hình thiết bị di động, iPad, Máy tính.",
      displayOrder: 6,
    },
    {
      q: "Sang năm thứ 2, tôi cần đóng những chi phí gì để duy trì website?",
      a: "Từ năm thứ 2 trở đi, bạn chỉ cần nộp phí gia hạn cố định cho Tên miền (Domain) và Không gian lưu trữ (Hosting) theo bảng giá nhà nước và biểu phí nhà mạng cấu hình ban đầu, hoàn toàn không mất thêm phí duy trì phần mềm.",
      displayOrder: 7,
    },
    {
      q: "SGO có hỗ trợ hướng dẫn tôi tự quản trị website, up bài viết sản phẩm không?",
      a: "Có. SGO sẽ cung cấp tài liệu hướng dẫn chi tiết dạng văn bản kèm video quay sẵn, đồng thời có kỹ thuật viên hướng dẫn trực tiếp qua UltraView/Zalo để đảm bảo người không rành công nghệ vẫn quản trị dễ dàng.",
      displayOrder: 8,
    },
    {
      q: "Nếu tôi đã có sẵn Tên miền hoặc Hosting thì chi phí có được giảm trừ không?",
      a: "Có, SGO sẽ khấu trừ trực tiếp giá trị tiền mặt tương ứng của gói quà tặng tên miền/hosting vào tổng giá trị hợp đồng thiết kế nếu bạn mong muốn sử dụng hạ tầng có sẵn của mình.",
      displayOrder: 9,
    },
    {
      q: "SGO có hỗ trợ viết bài hay làm nội dung ban đầu cho website không?",
      a: "Trong các gói thiết kế, SGO hỗ trợ cấu hình khung dữ liệu, tối ưu banner cơ bản và cập nhật từ 5 - 10 bài viết/sản phẩm mẫu để định hình layout mẫu. Nếu bạn cần xây dựng nội dung fanpage/website số lượng lớn, chúng tôi có cung cấp gói Content Marketing bổ sung chuyên nghiệp.",
      displayOrder: 10,
    },
  ],
  "hop-dong": [
    {
      q: "Hợp đồng điện tử e-Contract có giá trị pháp lý tương đương hợp đồng giấy không?",
      a: "Có. Theo Điều 14 Luật Giao dịch điện tử và Điều 119 Bộ luật Dân sự Việt Nam, hợp đồng điện tử được thừa nhận có giá trị pháp lý hoàn toàn tương đương với hợp đồng văn bản truyền thống nếu đáp ứng đủ điều kiện về tính toàn vẹn và xác thực.",
      displayOrder: 1,
    },
    {
      q: "Tôi có thể dùng những phương thức nào để ký kết trên hệ thống?",
      a: "SGO e-Contract hỗ trợ đa dạng phương thức ký: Ký số bằng USB Token, Ký số từ xa (Remote Signing), ký bằng SIM CA, hoặc ký điện tử xác thực qua mã OTP SMS/Email một cách nhanh chóng.",
      displayOrder: 2,
    },
    {
      q: "Khách hàng của tôi không có tài khoản SGO e-Contract thì có ký được không?",
      a: "Hoàn toàn ký được. Đối tác của bạn chỉ cần nhận được liên kết qua Email/SMS, truy cập trực tiếp bằng trình duyệt trên máy tính hoặc điện thoại để xác thực OTP và thực hiện ký số mà không cần tốn chi phí mua tài khoản phần mềm.",
      displayOrder: 3,
    },
    {
      q: "Hệ thống bảo mật dữ liệu hợp đồng của doanh nghiệp như thế nào?",
      a: "Dữ liệu được mã hóa truyền tải qua giao thức mã hóa SSL/TLS, lưu trữ an toàn trên hạ tầng Cloud đạt chuẩn quốc tế. Mọi lịch sử tác động, thời gian ký đều được ghi lại tường minh chống giả mạo.",
      displayOrder: 4,
    },
    {
      q: "Phần mềm có tích hợp được vào hệ thống quản trị nội bộ CRM/ERP sẵn có không?",
      a: "Có. SGO e-Contract cung cấp hệ thống API mở chuyên nghiệp, cho phép dễ dàng tích hợp quy trình tạo và phê duyệt hợp đồng trực tiếp từ các phần mềm nhân sự, kế toán, CRM, ERP của doanh nghiệp.",
      displayOrder: 5,
    },
    {
      q: "Quy trình triển khai cài đặt hệ thống mất bao lâu?",
      a: "Hệ thống hoạt động trên nền tảng Cloud, doanh nghiệp có thể khởi tạo tài khoản phân quyền và đưa vào vận hành ký kết ngay trong ngày sau khi cấu hình mẫu phôi hợp đồng.",
      displayOrder: 6,
    },
    {
      q: "Có giới hạn số lượng người ký hay phòng ban sử dụng không?",
      a: "Không. Phần mềm hỗ trợ tạo không giới hạn tài khoản người dùng và phòng ban (Kinh doanh, Nhân sự, Kế toán...). Chi phí chỉ tính dựa trên số lượng gói hợp đồng thực tế giao dịch.",
      displayOrder: 7,
    },
    {
      q: "Khi xảy ra tranh chấp, hợp đồng điện tử có dùng làm chứng cứ được không?",
      a: "Có. Hợp đồng điện tử e-Contract xuất ra định dạng tệp tin đính kèm chứng thư số hợp lệ là chứng cứ pháp lý vững chắc trước Tòa án và các cơ quan Trọng tài thương mại.",
      displayOrder: 8,
    },
    {
      q: "Hệ thống có cảnh báo khi hợp đồng sắp hết hạn hay không?",
      a: "Có. Tính năng quản trị thông minh sẽ tự động gửi thông báo nhắc nhở qua Email/Dashboard cho các bên liên quan khi hợp đồng kinh tế hoặc hợp đồng lao động sắp đến ngày đáo hạn.",
      displayOrder: 9,
    },
    {
      q: "Chi phí gia hạn phần mềm hàng năm được tính như thế nào?",
      a: "Doanh nghiệp chỉ cần mua gói lượt ký theo nhu cầu thực tế, số lượng lượt ký chưa dùng hết trong năm sẽ được bảo lưu cộng dồn khi gia hạn gói mới, không phát sinh chi phí duy trì phần mềm vô lý.",
      displayOrder: 10,
    },
  ],
  vr360: [
    {
      q: "VR360 là gì và có lợi ích gì cho ngành du lịch & lưu trú?",
      a: "VR360 (Virtual Reality 360) là công nghệ số hóa không gian thực tế thành tour tham quan ảo 360 độ. Với khách sạn, resort, khu du lịch, VR360 giúp khách hàng trải nghiệm trước không gian, tăng niềm tin và thúc đẩy tỷ lệ đặt phòng đáng kể.",
      displayOrder: 1,
    },
    {
      q: "Chất lượng hình ảnh VR360 có rõ nét không?",
      a: "Chúng tôi sử dụng thiết bị chụp chuyên nghiệp với ống kính 360 độ, cho ra hình ảnh sắc nét, màu sắc chân thực, hỗ trợ xem trên mọi thiết bị từ điện thoại, tablet đến máy tính và kính VR.",
      displayOrder: 2,
    },
    {
      q: "Tour VR360 có tích hợp được vào website của tôi không?",
      a: "Hoàn toàn có thể. Tour VR360 được nhúng trực tiếp vào website qua iframe hoặc API, giúp khách hàng trải nghiệm ngay trên trang chủ mà không cần chuyển sang nền tảng khác.",
      displayOrder: 3,
    },
    {
      q: "Thời gian hoàn thiện một tour VR360 mất bao lâu?",
      a: "Tùy thuộc vào quy mô không gian cần chụp, thông thường từ 3-7 ngày làm việc sau khi hoàn thành buổi chụp thực tế tại địa điểm.",
      displayOrder: 4,
    },
    {
      q: "Tôi có thể tự cập nhật nội dung trong tour VR360 không?",
      a: "Có. Chúng tôi cung cấp công cụ quản trị đơn giản, cho phép bạn thay đổi điểm đánh dấu (hotspot), thêm thông tin phòng, chèn video hoặc link đặt phòng dễ dàng.",
      displayOrder: 5,
    },
  ],
  erp: [
    {
      q: "Hệ thống ERP/CRM có phù hợp với doanh nghiệp nhỏ không?",
      a: "Có. Giải pháp ERP/CRM của SGO được thiết kế module hóa, doanh nghiệp có thể bắt đầu với các tính năng cốt lõi và mở rộng dần theo nhu cầu, phù hợp với mọi quy mô từ startup đến tập đoàn.",
      displayOrder: 1,
    },
    {
      q: "Thời gian triển khai hệ thống ERP mất bao lâu?",
      a: "Tùy thuộc vào mức độ tùy chỉnh và quy mô doanh nghiệp, thông thường từ 2-8 tuần cho các doanh nghiệp vừa và nhỏ, và 2-6 tháng cho các hệ thống phức tạp hơn.",
      displayOrder: 2,
    },
    {
      q: "Dữ liệu của doanh nghiệp có được bảo mật không?",
      a: "Tuyệt đối. Hệ thống sử dụng mã hóa SSL/TLS, phân quyền chi tiết theo vai trò, sao lưu tự động hàng ngày và tuân thủ các tiêu chuẩn bảo mật quốc tế.",
      displayOrder: 3,
    },
  ],
  pos: [
    {
      q: "Phần mềm POS có hoạt động offline khi mất mạng không?",
      a: "Có. Hệ thống hỗ trợ chế độ offline, vẫn bán hàng và in hóa đơn bình thường. Khi có mạng, dữ liệu sẽ tự động đồng bộ lên cloud.",
      displayOrder: 1,
    },
    {
      q: "POS có tích hợp được với các thiết bị phần cứng không?",
      a: "Hoàn toàn tương thích với máy in hóa đơn, ngăn kéo đựng tiền, máy quét mã vạch, cân điện tử và nhiều thiết bị ngoại vi phổ biến trên thị trường.",
      displayOrder: 2,
    },
    {
      q: "Tôi có thể quản lý nhiều chi nhánh từ xa không?",
      a: "Có. Dashboard quản trị cho phép theo dõi doanh thu, tồn kho, nhân viên của tất cả chi nhánh theo thời gian thực từ bất kỳ đâu qua internet.",
      displayOrder: 3,
    },
  ],
  zns: [
    {
      q: "ZNS là gì và có lợi ích gì cho chăm sóc khách hàng?",
      a: "ZNS (Zalo Notification Service) là dịch vụ gửi tin nhắn thông báo qua Zalo OA, giúp doanh nghiệp tiếp cận khách hàng nhanh chóng với tỷ lệ mở tin nhắn cao hơn email truyền thống.",
      displayOrder: 1,
    },
    {
      q: "Tôi có thể gửi bao nhiêu tin nhắn ZNS mỗi ngày?",
      a: "Số lượng phụ thuộc vào gói đăng ký. Gói cơ bản cho phép gửi vài trăm tin/ngày, gói doanh nghiệp có thể gửi hàng nghìn đến hàng chục nghìn tin/ngày.",
      displayOrder: 2,
    },
    {
      q: "ZNS có tích hợp được với hệ thống CRM/ERP hiện có không?",
      a: "Có. Chúng tôi cung cấp API đầy đủ để tích hợp ZNS vào hệ thống CRM, ERP, hoặc phần mềm quản lý bán hàng hiện tại của bạn.",
      displayOrder: 3,
    },
  ],
  "truy-xuat": [
    {
      q: "Giải pháp truy xuất nguồn gốc hoạt động như thế nào?",
      a: "Hệ thống gán mã QR/code duy nhất cho từng sản phẩm, lưu trữ toàn bộ lịch sử từ nguyên liệu, sản xuất, kiểm định đến phân phối. Khách hàng chỉ cần quét mã để xem toàn bộ hành trình sản phẩm.",
      displayOrder: 1,
    },
    {
      q: "Doanh nghiệp nhỏ có cần giải pháp truy xuất nguồn gốc không?",
      a: "Rất cần thiết, đặc biệt với ngành thực phẩm, nông sản, dược phẩm. Truy xuất nguồn gốc giúp tăng niềm tin khách hàng và đáp ứng yêu cầu pháp lý ngày càng khắt khe.",
      displayOrder: 2,
    },
    {
      q: "Thời gian triển khai hệ thống truy xuất nguồn gốc mất bao lâu?",
      a: "Tùy quy mô, thông thường từ 2-6 tuần cho doanh nghiệp vừa và nhỏ, bao gồm cấu hình hệ thống, đào tạo nhân viên và bàn giao tài liệu.",
      displayOrder: 3,
    },
  ],
  "qr-code": [
    {
      q: "Tôi có thể tạo mã QR động (dynamic QR) không?",
      a: "Có. Mã QR động cho phép bạn thay đổi nội dung đích mà không cần in lại mã QR, rất tiện lợi cho các chiến dịch marketing thay đổi thường xuyên.",
      displayOrder: 1,
    },
    {
      q: "Mã QR có thể chứa những loại thông tin gì?",
      a: "URL website, số điện thoại, email, văn bản, vCard (thông tin liên hệ), WiFi credentials, và nhiều định dạng khác tùy nhu cầu sử dụng.",
      displayOrder: 2,
    },
    {
      q: "Tôi có thể theo dõi số lần quét mã QR không?",
      a: "Có. Hệ thống cung cấp dashboard theo dõi real-time: số lần quét, vị trí địa lý, thiết bị, thời gian quét, giúp đo lường hiệu quả chiến dịch.",
      displayOrder: 3,
    },
  ],
  contact: [
    {
      q: "Làm sao để liên hệ với SGO Việt Nam?",
      a: "Bạn có thể gọi hotline 0246.292.7089, gửi email về info@sgodata.com, hoặc điền form liên hệ trên website. Đội ngũ tư vấn sẽ phản hồi trong vòng 24h.",
      displayOrder: 1,
    },
    {
      q: "SGO Việt Nam có hỗ trợ tư vấn miễn phí không?",
      a: "Có. Chúng tôi cung cấp buổi tư vấn miễn phí để hiểu nhu cầu cụ thể của doanh nghiệp bạn, từ đó đề xuất giải pháp tối ưu nhất về chi phí và hiệu quả.",
      displayOrder: 2,
    },
    {
      q: "Quy trình làm việc với SGO như thế nào?",
      a: "Quy trình gồm 5 bước: (1) Tiếp nhận yêu cầu, (2) Khảo sát & phân tích, (3) Đề xuất giải pháp & báo giá, (4) Ký hợp đồng & triển khai, (5) Bàn giao & hỗ trợ sau bán hàng.",
      displayOrder: 3,
    },
    {
      q: "SGO có hỗ trợ doanh nghiệp ở tỉnh thành khác không?",
      a: "Có. Chúng tôi làm việc với khách hàng trên toàn quốc thông qua hình thức online (Zoom, Google Meet) và cử đội kỹ thuật đến tận nơi khi cần thiết.",
      displayOrder: 4,
    },
  ],
  "ha-tang": [
    {
      q: "Làm thế nào để chọn cấu hình Cloud Server phù hợp?",
      a: "Cấu hình phù hợp phụ thuộc vào ứng dụng, lượng truy cập, dung lượng lưu trữ và yêu cầu vận hành của doanh nghiệp. SGO sẽ trao đổi nhu cầu cụ thể để đề xuất phương án và báo giá trước khi triển khai.",
      displayOrder: 1,
    },
    {
      q: "Doanh nghiệp có thể nâng cấp tài nguyên máy chủ khi nhu cầu tăng không?",
      a: "Khả năng nâng cấp phụ thuộc vào cấu hình và phương án dịch vụ đang sử dụng. Vui lòng liên hệ SGO để kiểm tra lựa chọn phù hợp, chi phí và kế hoạch thực hiện.",
      displayOrder: 2,
    },
    {
      q: "SGO có hỗ trợ chuyển dữ liệu từ máy chủ hiện tại không?",
      a: "Có thể khảo sát phương án chuyển dữ liệu dựa trên hệ thống, dung lượng và yêu cầu thời gian gián đoạn. Phạm vi công việc và kế hoạch sẽ được xác nhận trước khi thực hiện.",
      displayOrder: 3,
    },
    {
      q: "Thông tin về sao lưu và khôi phục dữ liệu được xác định như thế nào?",
      a: "Chính sách sao lưu, thời gian lưu trữ và phương án khôi phục tùy theo cấu hình dịch vụ. SGO sẽ xác nhận các thông số này trong đề xuất và thỏa thuận dịch vụ cụ thể.",
      displayOrder: 4,
    },
  ],
  "software-licensing": [
    {
      q: "SGO cung cấp những loại bản quyền phần mềm nào?",
      a: "Danh mục sản phẩm và phiên bản có thể thay đổi theo nhà cung cấp. Hãy gửi tên phần mềm, phiên bản và nhu cầu sử dụng để SGO kiểm tra khả năng cung cấp và điều kiện cấp phép.",
      displayOrder: 1,
    },
    {
      q: "Làm thế nào để xác minh bản quyền phần mềm sau khi mua?",
      a: "Thông tin chứng từ, mã bản quyền và cách kích hoạt phụ thuộc vào chính sách của từng nhà phát hành. SGO sẽ cung cấp thông tin xác minh tương ứng với sản phẩm trong báo giá và hồ sơ bàn giao.",
      displayOrder: 2,
    },
    {
      q: "Bản quyền phần mềm có thời hạn hay dùng vĩnh viễn?",
      a: "Thời hạn sử dụng phụ thuộc vào sản phẩm và loại giấy phép (thuê bao hoặc vĩnh viễn). Vui lòng kiểm tra thời hạn, phạm vi sử dụng và điều kiện gia hạn trong báo giá trước khi đặt mua.",
      displayOrder: 3,
    },
    {
      q: "SGO có hỗ trợ cài đặt và kích hoạt bản quyền không?",
      a: "Phạm vi hỗ trợ cài đặt, kích hoạt và hướng dẫn sử dụng tùy theo sản phẩm và gói cung cấp. SGO sẽ xác nhận cụ thể các hạng mục hỗ trợ trước khi hoàn tất đơn hàng.",
      displayOrder: 4,
    },
  ],
  email: [
    {
      q: "Tôi có thể sử dụng email theo tên miền riêng của doanh nghiệp không?",
      a: "Có thể thiết lập email theo tên miền riêng nếu doanh nghiệp sở hữu hoặc quản lý tên miền đó. SGO sẽ hướng dẫn các thông tin DNS cần cấu hình theo phương án dịch vụ đã chọn.",
      displayOrder: 1,
    },
    {
      q: "Chi phí email doanh nghiệp được tính như thế nào?",
      a: "Chi phí phụ thuộc vào số lượng tài khoản, dung lượng, thời hạn và tính năng của gói dịch vụ. Vui lòng liên hệ SGO để nhận báo giá theo nhu cầu thực tế.",
      displayOrder: 2,
    },
    {
      q: "Email doanh nghiệp có thể sử dụng trên điện thoại và Outlook không?",
      a: "Khả năng cấu hình trên ứng dụng bên ngoài phụ thuộc vào giao thức và thông số của gói email. SGO sẽ cung cấp hướng dẫn cấu hình phù hợp với dịch vụ đã đăng ký.",
      displayOrder: 3,
    },
    {
      q: "Có thể chuyển dữ liệu email từ nhà cung cấp cũ sang không?",
      a: "Việc chuyển dữ liệu cần được khảo sát theo nhà cung cấp hiện tại, số lượng hộp thư và dung lượng. SGO sẽ trao đổi kế hoạch, phạm vi hỗ trợ và thời gian dự kiến trước khi thực hiện.",
      displayOrder: 4,
    },
  ],
};
