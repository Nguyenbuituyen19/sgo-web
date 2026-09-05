export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://sgodata.com/#localbusiness",
        "name": "CÔNG TY CP CÔNG NGHỆ VÀ TRUYỀN THÔNG SGO VIỆT NAM",
        "alternateName": "SGO Việt Nam",
        "image": "https://sgodata.com/favicon-sgo.png",
        "url": "https://sgodata.com/",
        "telephone": "+842462927089",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress":
            "Tầng 12 Tòa nhà Licogi 13, số 164 Khuất Duy Tiến, P.Thanh Xuân",
          "addressLocality": "Thanh Xuân",
          "addressRegion": "Hà Nội",
          "postalCode": "100000",
          "addressCountry": "VN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 20.998436,
          "longitude": 105.801041,
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          "opens": "08:00",
          "closes": "17:30",
        },
        "sameAs": [
          "https://www.facebook.com/sgodata",
          "https://www.youtube.com/@sgodata",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://sgodata.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name":
              "Các dịch vụ trong hệ sinh thái của SGO Việt Nam có thể kết nối với nhau không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Có. Toàn bộ các giải pháp từ Thiết kế Website, mã QR Truy xuất nguồn gốc, Phần mềm POS đến Hệ thống tin nhắn tự động Zalo ZNS và Hợp đồng điện tử đều được thiết kế để liên kết đồng bộ thông qua cổng API, giúp doanh nghiệp quản trị dữ liệu tập trung trên hệ thống CRM/ERP mà không bị phân mảnh.",
            },
          },
          {
            "@type": "Question",
            "name":
              "SGO Việt Nam có hỗ trợ chỉnh sửa và may đo phần mềm theo yêu cầu riêng không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Có. Bên cạnh các gói giải pháp tiêu chuẩn triển khai nhanh, SGO Việt Nam sở hữu đội ngũ lập trình viên chuyên nghiệp sẵn sàng khảo sát vận hành thực tế tại doanh nghiệp để thiết kế, may đo riêng các phân hệ CRM/ERP và tính năng Website theo đúng đặc thù ngành nghề.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Mã QR tạo từ hệ thống của SGO có giới hạn lượt quét hay chứa quảng cáo không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Hoàn toàn không. Với công cụ tạo mã QR miễn phí của SGO, mã được cấp là mã sạch, không dính quảng cáo của bên thứ ba và không giới hạn số lượt quét. Đối với giải pháp QR Code Truy xuất nguồn gốc nâng cao, hệ thống sẽ cung cấp thêm các lớp bảo mật chống giả và thống kê vị trí quét chuyên sâu.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Tôi có thể nhúng Tour thực tế ảo VR360 của SGO vào website riêng hiện tại không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Hoàn toàn được. Sau khi hoàn thiện số hóa, SGO sẽ bàn giao một liên kết URL chuẩn và một đoạn mã nhúng iframe tương tự như Youtube. Bạn chỉ cần sao chép đoạn mã này và chèn vào website hiện tại của mình là tour sẽ hiển thị tương tác mượt mà.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Dịch vụ hạ tầng Cloud, Server của SGO có cam kết thời gian uptime ổn định không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "SGO Việt Nam cam kết tỷ lệ uptime đạt 99.99% nhờ hệ thống máy chủ tiêu chuẩn quốc tế đặt tại các Data Center hàng đầu Việt Nam. Hệ thống hạ tầng Cloud, Hosting và Chỗ đặt máy chủ được trang bị tường lửa chống DDoS chuyên dụng, sao lưu dữ liệu tự động định kỳ, đảm bảo dữ liệu vận hành an toàn và thông suốt.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
