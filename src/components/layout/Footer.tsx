"use client";

import { useState, useEffect } from "react";
import { companyInfoApi, CompanyInforResponse } from "@/shared/company-info";

export default function Footer() {
  const [info, setInfo] = useState<CompanyInforResponse | null>(null);

  useEffect(() => {
    companyInfoApi.getCompanyInfo().then((res) => {
      if (res.success && res.data) {
        setInfo(res.data);
      }
    }).catch(console.error);
  }, []);

  return (
    <footer id="lien-he" className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-sm w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-base tracking-wide uppercase">
              {info?.companyName || "CÔNG TY CP CÔNG NGHỆ VÀ TRUYỀN THÔNG SGO VIỆT NAM"}
            </h4>
            <p className="flex items-start gap-2 text-slate-300 max-w-2xl">
              <i className="fa-solid fa-location-dot mt-1 text-blue-500 shrink-0"></i>
              <span>
                {info?.address
                  ? Array.isArray(info.address)
                    ? info.address[0]
                    : String(info.address)
                  : "Tầng 12 Tòa nhà Licogi 13, số 164 Khuất Duy Tiến, P.Thanh Xuân, TP. Hà Nội, Việt Nam"}
              </span>
            </p>
          </div>

          <div className="space-y-3 md:border-l md:border-slate-800 md:pl-8">
            <p className="flex items-center gap-2">
              <i className="fa-solid fa-phone text-blue-500 w-4"></i>
              <span>
                Điện thoại: <strong>{info?.phone || "0246.29.27.089"}</strong>
              </span>
            </p>
            <p className="flex items-center gap-2">
              <i className="fa-solid fa-mobile-screen-button text-blue-500 w-4"></i>
              <span>
                Hotline: <strong>{info?.hotline || "0981.185.620"}</strong>
              </span>
            </p>
            <p className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-blue-500 w-4"></i>
              <a
                href={`mailto:${info?.email || "contact@sgodata.com"}`}
                className="hover:text-white transition-colors"
              >
                {info?.email || "contact@sgodata.com"}
              </a>
            </p>
            <p className="flex items-center gap-2 pt-2 border-t border-slate-900 text-xs text-slate-500">
              <i className="fa-solid fa-id-card w-4"></i>
              <span>
                {info?.taxCode?.startsWith("MST:") ? info.taxCode : `MST: ${info?.taxCode || "0108806638"}`}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-900 text-center text-xs text-slate-500">
          <p>© 2026 SGO VIỆT NAM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
