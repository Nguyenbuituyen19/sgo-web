"use client";

import { useState } from "react";
import { CartItem } from "./CartItemList";

interface CartSuggestionsProps {
  onAddSuggestedItem: (item: CartItem) => void;
}

interface DomainResult {
  tld: string;
  price: number;
  available: boolean;
}

export default function CartSuggestions({ onAddSuggestedItem }: CartSuggestionsProps) {
  const [domainQuery, setDomainQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [domainResults, setDomainResults] = useState<DomainResult[] | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleDomainCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainQuery.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      const cleanName = domainQuery.trim().toLowerCase().replace(/^https?:\/\//, "").split(".")[0];
      setDomainResults([
        { tld: `${cleanName}.com`, price: 299000, available: true },
        { tld: `${cleanName}.vn`, price: 650000, available: true },
        { tld: `${cleanName}.net`, price: 320000, available: true },
        { tld: `${cleanName}.org`, price: 280000, available: false },
        { tld: `${cleanName}.xyz`, price: 49000, available: true },
      ]);
      setIsSearching(false);
    }, 400);
  };

  const handleAddDomainToCart = (domain: DomainResult) => {
    const newItem: CartItem = {
      id: `domain-${domain.tld}-${Date.now()}`,
      type: "domain",
      title: "Đăng ký tên miền",
      subtitle: domain.tld,
      regType: "new",
      durationYears: 1,
      durationLabel: "1 năm",
      location: "TP. Hồ Chí Minh",
      osImage: "DNS Management",
      originalPrice: domain.price * 1.3,
      finalPrice: domain.price,
      discountPercentage: 23,
      config: {
        cpu: "N/A",
        ram: "N/A",
        storage: "DNSSEC / Web Redirect Free",
        bandwidth: "Không giới hạn",
        ip: "Anycast DNS IP",
      },
      promoNote: "Tặng kèm quản lý DNS và Khóa bảo vệ tên miền miễn phí",
    };

    onAddSuggestedItem(newItem);
  };

  const handleAddHostingToCart = () => {
    const newItem: CartItem = {
      id: `hosting-${Date.now()}`,
      type: "hosting",
      title: "Web Hosting Pro 1",
      subtitle: "Tốc độ cao NVMe",
      regType: "new",
      durationYears: 1,
      durationLabel: "1 năm",
      location: "TP. Hồ Chí Minh",
      osImage: "cPanel Linux",
      originalPrice: 1200000,
      finalPrice: 780000,
      discountPercentage: 35,
      config: {
        cpu: "1 Core",
        ram: "1 GB",
        storage: "10 GB NVMe SSD",
        bandwidth: "Không giới hạn",
        ip: "IP dùng chung",
      },
      promoNote: "Tự động sao lưu hàng ngày, tặng SSL Let's Encrypt",
    };
    onAddSuggestedItem(newItem);
  };

  const handleAddSslToCart = () => {
    const newItem: CartItem = {
      id: `ssl-${Date.now()}`,
      type: "ssl",
      title: "Chứng chỉ SSL Sectigo DV",
      subtitle: "Bảo mật HTTPS",
      regType: "new",
      durationYears: 1,
      durationLabel: "1 năm",
      location: "TP. Hồ Chí Minh",
      osImage: "256-bit Encryption",
      originalPrice: 450000,
      finalPrice: 250000,
      discountPercentage: 44,
      config: {
        cpu: "N/A",
        ram: "N/A",
        storage: "Bảo hiểm 10,000$",
        bandwidth: "Không giới hạn",
        ip: "Mọi địa chỉ IP",
      },
      promoNote: "Kích hoạt tức thì trong 5 phút, hỗ trợ cài đặt miễn phí",
    };
    onAddSuggestedItem(newItem);
  };

  const handleAddEmailToCart = () => {
    const newItem: CartItem = {
      id: `email-${Date.now()}`,
      type: "email",
      title: "Email Doanh Nghiệp Pro 5",
      subtitle: "5 Hộp thư tên miền",
      regType: "new",
      durationYears: 1,
      durationLabel: "1 năm",
      location: "TP. Hồ Chí Minh",
      osImage: "Zimbra Webmail",
      originalPrice: 900000,
      finalPrice: 585000,
      discountPercentage: 35,
      config: {
        cpu: "N/A",
        ram: "N/A",
        storage: "15 GB / Hộp thư",
        bandwidth: "Không giới hạn",
        ip: "IP Dedicated Clean",
      },
      promoNote: "Chống Spam / Virus 99.9%, uy tín không vào папку Spam",
    };
    onAddSuggestedItem(newItem);
  };

  const toggleAccordion = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="mt-8 space-y-4">
      <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
        <span>Gợi ý dịch vụ</span>
      </h3>

      {/* Domain Search Box */}
      <div className="bg-slate-100/90 rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
        <form onSubmit={handleDomainCheck} className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={domainQuery}
              onChange={(e) => setDomainQuery(e.target.value)}
              placeholder="Tìm tên miền phù hợp nhất cho bạn..."
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent font-medium shadow-xs"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-xs shrink-0 cursor-pointer disabled:opacity-50"
          >
            {isSearching ? (
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-spinner animate-spin"></i> Đang tìm...
              </span>
            ) : (
              "Kiểm tra"
            )}
          </button>
        </form>

        {/* Domain Search Results List */}
        {domainResults && (
          <div className="mt-4 bg-white rounded-xl p-4 border border-slate-200 space-y-2 animate-in fade-in duration-200">
            <div className="text-xs font-bold text-slate-500 mb-2">Kết quả tra cứu tên miền:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {domainResults.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between"
                >
                  <div>
                    <span className="font-extrabold text-xs text-slate-900 block">{item.tld}</span>
                    <span className="text-xs font-bold text-blue-600">
                      {item.price.toLocaleString("vi-VN")} đ/năm
                    </span>
                  </div>
                  {item.available ? (
                    <button
                      onClick={() => handleAddDomainToCart(item)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      + Thêm
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-200 px-2 py-1 rounded">
                      Đã ký
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cross-Sell Accordion Cards */}
      <div className="bg-slate-100/90 rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden shadow-xs">
        {/* Hosting Item */}
        <div className="bg-white/60">
          <button
            onClick={() => toggleAccordion("hosting")}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Hosting</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Hosting không giới hạn băng thông, load web chỉ trong 1 giây
              </p>
            </div>
            <i
              className={`fa-solid fa-chevron-right text-xs text-slate-400 transition-transform ${
                expandedSection === "hosting" ? "rotate-90 text-blue-600" : ""
              }`}
            ></i>
          </button>
          {expandedSection === "hosting" && (
            <div className="px-4 pb-4 pt-1 bg-white text-xs border-t border-slate-100 space-y-3">
              <p className="text-slate-600">
                Gói Web Hosting Pro tốc độ cao với bộ nhớ NVMe SSD siêu tốc, cPanel tiếng Việt dễ quản trị, miễn phí sao lưu tự động.
              </p>
              <div className="flex items-center justify-between bg-blue-50/60 rounded-xl p-3 border border-blue-100">
                <div>
                  <span className="font-bold text-slate-900 block">Web Hosting Pro 1</span>
                  <span className="text-blue-700 font-extrabold text-sm">780.000 đ/năm</span>
                  <span className="text-slate-400 line-through text-[11px] ml-2">1.200.000 đ</span>
                </div>
                <button
                  onClick={handleAddHostingToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  + Thêm vào giỏ
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Email Item */}
        <div className="bg-white/60">
          <button
            onClick={() => toggleAccordion("email")}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Email</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Email uy tín hơn khi được gắn với tên miền riêng
              </p>
            </div>
            <i
              className={`fa-solid fa-chevron-right text-xs text-slate-400 transition-transform ${
                expandedSection === "email" ? "rotate-90 text-blue-600" : ""
              }`}
            ></i>
          </button>
          {expandedSection === "email" && (
            <div className="px-4 pb-4 pt-1 bg-white text-xs border-t border-slate-100 space-y-3">
              <p className="text-slate-600">
                Dịch vụ Email Doanh Nghiệp giúp nâng tầm chuyên nghiệp khi giao tiếp với đối tác khách hàng, chống spam tuyệt đối.
              </p>
              <div className="flex items-center justify-between bg-blue-50/60 rounded-xl p-3 border border-blue-100">
                <div>
                  <span className="font-bold text-slate-900 block">Email Doanh Nghiệp Pro (5 hộp thư)</span>
                  <span className="text-blue-700 font-extrabold text-sm">585.000 đ/năm</span>
                  <span className="text-slate-400 line-through text-[11px] ml-2">900.000 đ</span>
                </div>
                <button
                  onClick={handleAddEmailToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  + Thêm vào giỏ
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Cloud Server Item */}
        <div className="bg-white/60">
          <button
            onClick={() => toggleAccordion("cloud-server")}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">Cloud Server</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Cloud Server xây dựng trên nền tảng đám mây có hiệu suất vượt trội
              </p>
            </div>
            <i
              className={`fa-solid fa-chevron-right text-xs text-slate-400 transition-transform ${
                expandedSection === "cloud-server" ? "rotate-90 text-blue-600" : ""
              }`}
            ></i>
          </button>
          {expandedSection === "cloud-server" && (
            <div className="px-4 pb-4 pt-1 bg-white text-xs border-t border-slate-100 space-y-3">
              <p className="text-slate-600">
                Hạ tầng Server riêng ảo hóa KVM mạnh mẽ, đáp ứng ứng dụng doanh nghiệp, thương mại điện tử và lưu trữ lớn.
              </p>
              <a
                href="/cloud-server#pricing-table"
                className="inline-flex items-center gap-1 text-blue-600 font-bold hover:underline"
              >
                Xem chi tiết bảng giá Cloud Server <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </a>
            </div>
          )}
        </div>

        {/* SSL Item */}
        <div className="bg-white/60">
          <button
            onClick={() => toggleAccordion("ssl")}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">SSL</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Chứng chỉ số SSL tăng cường bảo mật cho website
              </p>
            </div>
            <i
              className={`fa-solid fa-chevron-right text-xs text-slate-400 transition-transform ${
                expandedSection === "ssl" ? "rotate-90 text-blue-600" : ""
              }`}
            ></i>
          </button>
          {expandedSection === "ssl" && (
            <div className="px-4 pb-4 pt-1 bg-white text-xs border-t border-slate-100 space-y-3">
              <p className="text-slate-600">
                Chứng chỉ SSL Sectigo mã hóa 256-bit, tạo biểu tượng ổ khóa xanh uy tín trên trình duyệt, tối ưu thứ hạng SEO Google.
              </p>
              <div className="flex items-center justify-between bg-blue-50/60 rounded-xl p-3 border border-blue-100">
                <div>
                  <span className="font-bold text-slate-900 block">Sectigo DV SSL</span>
                  <span className="text-blue-700 font-extrabold text-sm">250.000 đ/năm</span>
                  <span className="text-slate-400 line-through text-[11px] ml-2">450.000 đ</span>
                </div>
                <button
                  onClick={handleAddSslToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  + Thêm vào giỏ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
