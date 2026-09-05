export default function CloudHero() {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 text-white py-38 px-4 relative overflow-hidden">
      {/* Background isometric pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.25),transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Heading & Detailed Subtext */}
        <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 px-3.5 py-1 rounded-full text-xs font-semibold text-blue-200">
            <i className="fa-solid fa-server text-blue-400"></i> Hạ tầng KVM ảo hóa toàn phần
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white">
            Cloud Server High Performance
          </h1>
          <p className="text-base md:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
            <span className="font-extrabold text-white text-xl">Cloud Server</span>{" "}
            là một dịch vụ lưu trữ và quản lý máy chủ trên nền tảng đám mây (Cloud Computing) có hiệu suất vượt trội, tốc độ cao, cùng khả năng bảo mật tốt nhất trên nền tảng ảo hoá toàn phần KVM. Phù hợp với mọi nhu cầu sử dụng Web Server, Database Server, Remote Workstation,...
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2 text-xs font-medium text-blue-200">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <i className="fa-solid fa-bolt text-amber-400"></i> Khởi tạo trong 30s
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <i className="fa-solid fa-shield-halved text-emerald-400"></i> Bảo mật Anti-DDoS
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              <i className="fa-solid fa-rotate text-cyan-400"></i> Uptime 99.99% SLA
            </span>
          </div>
        </div>

        {/* Right Column: Isometric 3D Server Graphics Representation */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <div className="w-full max-w-md bg-gradient-to-br from-blue-600/30 to-indigo-800/40 p-6 rounded-3xl border border-white/15 backdrop-blur-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Node Hà Nội &amp; TP.HCM</span>
              </div>
              <span className="text-[11px] bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded font-mono">10Gbps Core</span>
            </div>

            {/* Simulated Server Rack Cluster */}
            <div className="space-y-2.5 font-mono text-xs">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-blue-500/30 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-2.5">
                  <i className="fa-brands fa-linux text-amber-400 text-lg"></i>
                  <div>
                    <div className="text-white font-bold text-xs">Linux Cloud KVM #01</div>
                    <div className="text-[10px] text-slate-400">CentOS / Ubuntu / Debian</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold text-[11px]">ACTIVE</span>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-purple-500/30 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-2.5">
                  <i className="fa-brands fa-windows text-sky-400 text-lg"></i>
                  <div>
                    <div className="text-white font-bold text-xs">Turbo NVMe Cloud #02</div>
                    <div className="text-[10px] text-slate-400">Windows Server 2022</div>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold text-[11px]">ACTIVE</span>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-cyan-500/30 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-2.5">
                  <i className="fa-solid fa-hard-drive text-cyan-400 text-lg"></i>
                  <div>
                    <div className="text-white font-bold text-xs">NVMe SSD Enterprise</div>
                    <div className="text-[10px] text-slate-400">Auto Backup Weekly</div>
                  </div>
                </div>
                <span className="text-cyan-400 font-bold text-[11px]">RAID 10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
