"use client";

import { useState, FormEvent } from "react";
import { submitConsultation } from "@/shared/client";

export default function TraceForm() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [industryCategory, setIndustryCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
      alert("Sai định dạng số điện thoại");
      return;
    }

    setLoading(true);

    const res = await submitConsultation({
      provisionCode: "truy-xuat",
      customerName: fullname,
      phoneNumber: phone,
      extraFields: {
        company: company,
        industryCategory: industryCategory,
      },
    });

    if (res.success) {
      alert(
        "Đăng ký nhận tư vấn bản Demo thành công! Đội ngũ chuyên gia của SGO Việt Nam sẽ chủ động liên hệ lại với bạn trong thời gian sớm nhất."
      );
      setFullname("");
      setPhone("");
      setCompany("");
      setIndustryCategory("");
    } else {
      alert(res.message);
    }
    setLoading(false);
  };

  return (
    <section id="dang-ky" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 mb-16">
      <div className="lg:col-span-5 space-y-4">
        <span className="text-teal-600 font-bold text-xs uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full">
          Liên hệ hợp tác
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
          Yêu Cầu Khảo Sát & Nhận Demo Hệ Thống Miễn Phí
        </h3>
        <p className="text-slate-500 text-sm font-light leading-relaxed">
          Mỗi mô hình sản xuất, hợp tác xã hay doanh nghiệp đều có quy trình đóng gói và đặc thù riêng. Đội ngũ kỹ sư của SGO Việt Nam sẽ liên hệ để khảo sát trực tiếp và may đo giải pháp phù hợp nhất với quý khách.
        </p>
      </div>

      <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wide block">
                Họ tên người liên hệ *
              </label>
              <input
                type="text"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all text-slate-900"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wide block">
                Số điện thoại / Zalo *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="0981xxxxxx"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all text-slate-900"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wide block">
              Tên doanh nghiệp / Hợp tác xã *
            </label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Công ty TNHH Sản xuất Thương mại SGO"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all text-slate-900"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase font-bold text-slate-500 tracking-wide block">
              Nhóm ngành cần truy xuất nguồn gốc *
            </label>
            <select
              required
              value={industryCategory}
              onChange={(e) => setIndustryCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all text-slate-700 cursor-pointer"
            >
              <option value="" disabled>
                Vui lòng lựa chọn...
              </option>
              <option value="Nông sản sạch, rau củ quả, chè, gạo">
                Nông sản sạch, rau củ quả, chè, gạo
              </option>
              <option value="Thực phẩm đóng gói, chế biến sẵn">
                Thực phẩm đóng gói, chế biến sẵn
              </option>
              <option value="Thủy hải sản, chăn nuôi gia súc gia cầm">
                Thủy hải sản, chăn nuôi gia súc gia cầm
              </option>
              <option value="Dược phẩm, mỹ phẩm, thực phẩm chức năng">
                Dược phẩm, mỹ phẩm, thực phẩm chức năng
              </option>
              <option value="Hàng tiêu dùng, thủ công mỹ nghệ">
                Hàng tiêu dùng, thủ công mỹ nghệ
              </option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 disabled:opacity-60 text-white font-medium rounded-xl text-center transition-colors cursor-pointer text-sm uppercase tracking-wider shadow-lg shadow-teal-600/10 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i> Đang xử lý...
              </>
            ) : (
              <>
                Đăng Ký Nhận Tư Vấn Bản Demo <i className="fa-solid fa-paper-plane text-xs"></i>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
