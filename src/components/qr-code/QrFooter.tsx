export default function QrFooter() {
  return (
    <footer
      className="bg-slate-950 text-slate-500 py-10 border-t border-slate-900 text-[11px] w-full mt-12"
      aria-label="Thông tin doanh nghiệp chân trang"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-white font-bold text-xs tracking-wide uppercase">
              CÔNG TY CỔ PHẦN CÔNG NGHỆ VÀ TRUYỀN THÔNG SGO VIỆT NAM
            </h4>
            <p className="flex items-start gap-2 text-slate-300 max-w-xl">
              <i className="fa-solid fa-location-dot mt-0.5 text-blue-500 shrink-0"></i>
              <span>
                Văn phòng: Tầng 12 Tòa nhà Licogi 13, số 164 Khuất Duy Tiến, Phường
                Thanh Xuân, Thành phố Hà Nội, Việt Nam
              </span>
            </p>
          </div>
          <div className="space-y-1.5 md:border-l md:border-slate-800 md:pl-8 text-slate-400">
            <p className="flex items-center gap-2">
              <i className="fa-solid fa-phone text-blue-500 w-3.5"></i>
              <span>
                Tổng đài bàn: <strong>0246.29.27.089</strong>
              </span>
            </p>
            <p className="flex items-center gap-2">
              <i className="fa-solid fa-mobile-screen-button text-blue-500 w-3.5"></i>
              <span>
                Hotline: <strong>0981.185.620</strong>
              </span>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-slate-900 text-center text-slate-600">
          <p>© 2026 SGO VIỆT NAM (sgodata). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
