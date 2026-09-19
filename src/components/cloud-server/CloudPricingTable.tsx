"use client";

import { useState } from "react";

import { useProvisionPricing } from "@/hooks/useProvisionPricing";

interface ServerPackage {
  id: string;
  name: string;
  cpu: string;
  ram: string;
  storage: string;
  networkSpeed: string;
  price: number;
  originalPrice: number;
  discountBadge: string;
  isPopular?: boolean;
}

interface OsImage {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const linuxCoreImages: OsImage[] = [
  { id: "almalinux-8", name: "AlmaLinux-8.10", icon: "alma", color: "#0d6efd" },
  { id: "almalinux-9", name: "AlmaLinux-9.3", icon: "alma", color: "#0d6efd" },
  { id: "centos-7", name: "CentOS-Linux-7", icon: "centos", color: "#932279" },
  { id: "centos-stream-8", name: "CentOS-Stream-8", icon: "centos", color: "#932279" },
  { id: "centos-stream-9", name: "CentOS-Stream-9", icon: "centos", color: "#932279" },
  { id: "cloudlinux", name: "CloudLinux-Shared-Pro-v9", icon: "cloudlinux", color: "#0055a5" },
  { id: "debian-10", name: "Debian-10", icon: "debian", color: "#d70a53" },
  { id: "debian-11", name: "Debian-11", icon: "debian", color: "#d70a53" },
  { id: "debian-12", name: "Debian-12", icon: "debian", color: "#d70a53" },
  { id: "rocky-8", name: "Rocky-Linux-8.8", icon: "rocky", color: "#10b981" },
  { id: "rocky-9", name: "Rocky-Linux-9.3", icon: "rocky", color: "#10b981" },
  { id: "ubuntu-18", name: "Ubuntu-18.04-LTS", icon: "ubuntu", color: "#e95420" },
  { id: "ubuntu-20", name: "Ubuntu-20.04-LTS", icon: "ubuntu", color: "#e95420" },
  { id: "ubuntu-22", name: "Ubuntu-22.04-LTS", icon: "ubuntu", color: "#e95420" },
  { id: "ubuntu-24", name: "Ubuntu-24.04-LTS", icon: "ubuntu", color: "#e95420" },
];

const linuxSoftwareImages: OsImage[] = [
  { id: "almalinux", name: "AlmaLinux-8.7_DirectAdmin-buy", icon: "almalinux", color: "#0d6efd" },
  { id: "almalinux-aapanel", name: "AlmaLinux-8_aapanel", icon: "almalinux", color: "#0d6efd" },
  { id: "ubuntu-n8npanel", name: "Ubuntu-24.04_n8nPanel", icon: "ubuntu", color: "#e95420" },
  { id: "ubuntu-hermes", name: "Ubuntu-24.04_Hermes", icon: "ubuntu", color: "#e95420" },
  { id: "ubuntu-n8n-openclaw", name: "Ubuntu-24.04_n8nPanel-OpenClaw", icon: "ubuntu", color: "#e95420" },
  { id: "ubuntu-openclaw", name: "Ubuntu-24.04_OpenClaw", icon: "ubuntu", color: "#e95420" },
];

function OsIcon({ distro, color }: { distro: string; color: string }) {
  switch (distro) {
    case "alma":
      return <span style={{ color }} className="text-sm font-black select-none">AL</span>;
    case "centos":
      return <i className="fa-brands fa-centos text-lg" style={{ color }}></i>;
    case "cloudlinux":
      return <i className="fa-solid fa-cloud text-lg" style={{ color }}></i>;
    case "debian":
      return <i className="fa-solid fa-circle-nodes text-lg" style={{ color }}></i>;
    case "rocky":
      return <span style={{ color }} className="text-sm font-black select-none">RL</span>;
    case "ubuntu":
      return <i className="fa-brands fa-ubuntu text-lg" style={{ color }}></i>;
    default:
      return <i className="fa-solid fa-server text-lg" style={{ color }}></i>;
  }
}

export default function CloudPricingTable() {
  const { services, loading, error } = useProvisionPricing("ha-tang");
  const [activeTab, setActiveTab] = useState<"linux" | "turbo">("linux");
  const [selectedPackage, setSelectedPackage] = useState<ServerPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [osTab, setOsTab] = useState<"core" | "software">("core");
  const [selectedOs, setSelectedOs] = useState<OsImage | null>(null);

  // Config modal state
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [configRam, setConfigRam] = useState(1);
  const [configCpu, setConfigCpu] = useState(1);
  const [configStorage, setConfigStorage] = useState(20);
  const [baseRam, setBaseRam] = useState(1);
  const [baseCpu, setBaseCpu] = useState(1);
  const [baseStorage, setBaseStorage] = useState(20);

  // Unit prices for additional resources (đ/tháng per unit)
  const RAM_UNIT_PRICE = 20000;
  const CPU_UNIT_PRICE = 20000;
  const STORAGE_UNIT_PRICE = 3000;

  // Linux Cloud Server packages (matching screenshot data)
  const linuxPackages: ServerPackage[] = [
    {
      id: "linux-1",
      name: "Cloud Server Linux 1",
      cpu: "1 Core",
      ram: "1 GB",
      storage: "20 GB SSD",
      networkSpeed: "200 Mbps",
      price: 57850,
      originalPrice: 89000,
      discountBadge: "Tiết kiệm 35%",
    },
    {
      id: "linux-2",
      name: "Cloud Server Linux 2",
      cpu: "1 Core",
      ram: "2 GB",
      storage: "20 GB SSD",
      networkSpeed: "200 Mbps",
      price: 70850,
      originalPrice: 109000,
      discountBadge: "Tiết kiệm 35%",
    },
    {
      id: "linux-3",
      name: "Cloud Server Linux 3",
      cpu: "2 Core",
      ram: "2 GB",
      storage: "40 GB SSD",
      networkSpeed: "200 Mbps",
      price: 116350,
      originalPrice: 179000,
      discountBadge: "Tiết kiệm 35%",
      isPopular: true,
    },
    {
      id: "linux-4",
      name: "Cloud Server Linux 4",
      cpu: "2 Core",
      ram: "4 GB",
      storage: "60 GB SSD",
      networkSpeed: "300 Mbps",
      price: 181350,
      originalPrice: 279000,
      discountBadge: "Tiết kiệm 35%",
    },
    {
      id: "linux-5",
      name: "Cloud Server Linux 5",
      cpu: "4 Core",
      ram: "8 GB",
      storage: "120 GB SSD",
      networkSpeed: "400 Mbps",
      price: 324350,
      originalPrice: 499000,
      discountBadge: "Tiết kiệm 35%",
    },
    {
      id: "linux-6",
      name: "Cloud Server Linux 6",
      cpu: "8 Core",
      ram: "16 GB",
      storage: "240 GB SSD",
      networkSpeed: "500 Mbps",
      price: 649350,
      originalPrice: 999000,
      discountBadge: "Tiết kiệm 35%",
    },
  ];

  // Turbo Cloud Server NVMe packages
  const turboPackages: ServerPackage[] = [
    {
      id: "turbo-1",
      name: "Turbo Cloud Server 1",
      cpu: "2 Core",
      ram: "4 GB",
      storage: "50 GB NVMe",
      networkSpeed: "500 Mbps",
      price: 195000,
      originalPrice: 300000,
      discountBadge: "Tiết kiệm 35%",
    },
    {
      id: "turbo-2",
      name: "Turbo Cloud Server 2",
      cpu: "4 Core",
      ram: "8 GB",
      storage: "100 GB NVMe",
      networkSpeed: "500 Mbps",
      price: 357500,
      originalPrice: 550000,
      discountBadge: "Tiết kiệm 35%",
      isPopular: true,
    },
    {
      id: "turbo-3",
      name: "Turbo Cloud Server 3",
      cpu: "8 Core",
      ram: "16 GB",
      storage: "200 GB NVMe",
      networkSpeed: "1 Gbps",
      price: 682500,
      originalPrice: 1050000,
      discountBadge: "Tiết kiệm 35%",
    },
    {
      id: "turbo-4",
      name: "Turbo Cloud Server 4",
      cpu: "16 Core",
      ram: "32 GB",
      storage: "400 GB NVMe",
      networkSpeed: "1 Gbps",
      price: 1293500,
      originalPrice: 1990000,
      discountBadge: "Tiết kiệm 35%",
    },
  ];

  const packagesToDisplay = activeTab === "linux" ? linuxPackages : turboPackages;
  const osImages = osTab === "core" ? linuxCoreImages : linuxSoftwareImages;

  const handleOrder = (pkg: ServerPackage) => {
    setSelectedPackage(pkg);
    setSelectedOs(null);
    setOsTab("core");
    setIsModalOpen(true);
  };

  const handleCustomConfig = (pkg: ServerPackage) => {
    setSelectedPackage(pkg);
    const ramVal  = parseInt(pkg.ram.match(/(\d+)/)?.[1]     ?? "1");
    const cpuVal  = parseInt(pkg.cpu.match(/(\d+)/)?.[1]     ?? "1");
    const stgVal  = parseInt(pkg.storage.match(/(\d+)/)?.[1] ?? "20");
    setConfigRam(ramVal);  setBaseRam(ramVal);
    setConfigCpu(cpuVal);  setBaseCpu(cpuVal);
    setConfigStorage(stgVal); setBaseStorage(stgVal);
    setIsConfigModalOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedOs || !selectedPackage) return;
    const params = new URLSearchParams({
      package: selectedPackage.id,
      os: selectedOs.id,
    });
    window.location.href = `/gio-hang?${params.toString()}`;
  };

  const handleConfigConfirm = () => {
    if (!selectedPackage) return;
    const params = new URLSearchParams({
      package: selectedPackage.id,
      ram: String(configRam),
      cpu: String(configCpu),
      storage: String(configStorage),
    });
    window.location.href = `/gio-hang?${params.toString()}`;
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString("vi-VN") + " đ";
  };

  return (
    <section id="pricing-table" className="py-12 bg-slate-100/80 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Floating Rounded White Pill Container for Tabs (As in Screenshot) */}
        <div className="relative -mt-10 lg:-mt-14 mb-8 max-w-2xl mx-auto z-20">
          <div className="bg-white rounded-full p-1.5 shadow-xl border border-slate-200 flex items-center justify-between">
            <button
              onClick={() => setActiveTab("linux")}
              className={`flex-1 py-3 px-6 rounded-full text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "linux"
                  ? "bg-white text-slate-900 border-2 border-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 bg-transparent border-2 border-transparent"
              }`}
            >
              <i className="fa-brands fa-linux text-base text-slate-700"></i> Cloud Server Linux
            </button>
            <button
              onClick={() => setActiveTab("turbo")}
              className={`flex-1 py-3 px-6 rounded-full text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "turbo"
                  ? "bg-white text-slate-900 border-2 border-blue-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 bg-transparent border-2 border-transparent"
              }`}
            >
              <i className="fa-solid fa-cloud text-base text-blue-500"></i> Turbo Cloud Server
            </button>
          </div>
        </div>

        {/* Section Title & Location Selector */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 text-center md:text-left">
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              Bảng giá {activeTab === "linux" ? "Cloud Server Linux" : "Turbo Cloud Server"}
            </h2>
          </div>

          {/* Location Selector Pills */}
          {/* <div className="flex items-center gap-2 bg-slate-200/80 p-1 rounded-full text-xs font-semibold">
            <button
              onClick={() => setActiveLocation("hanoi")}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer uppercase ${
                activeLocation === "hanoi"
                  ? "bg-blue-600 text-white font-bold shadow-sm"
                  : "text-slate-600 hover:text-slate-900 bg-transparent"
              }`}
            >
              Hà Nội
            </button>
            <button
              onClick={() => setActiveLocation("hcm")}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer uppercase ${
                activeLocation === "hcm"
                  ? "bg-blue-600 text-white font-bold shadow-sm"
                  : "text-slate-600 hover:text-slate-900 bg-transparent"
              }`}
            >
              TP Hồ Chí Minh
            </button>
          </div> */}
        </div>

        {/* Responsive Table Card (Matching Screenshot Structure) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-187.5">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-extrabold uppercase text-slate-700 tracking-wider">
                  <th className="py-4 px-6">Gói</th>
                  <th className="py-4 px-4">CPU</th>
                  <th className="py-4 px-4">RAM</th>
                  <th className="py-4 px-4">SSD Storage</th>
                  <th className="py-4 px-4">Tốc độ mạng</th>
                  <th className="py-4 px-6">Giá</th>
                  <th className="py-4 px-6 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs md:text-sm">
                {packagesToDisplay.map((pkg) => (
                  <tr
                    key={pkg.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* GÓI */}
                    <td className="py-5 px-6 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span>{pkg.name}</span>
                        <i className="fa-solid fa-gift text-rose-500 text-sm"></i>
                      </div>
                    </td>

                    {/* CPU */}
                    <td className="py-5 px-4 font-semibold text-slate-700">
                      {pkg.cpu}
                    </td>

                    {/* RAM */}
                    <td className="py-5 px-4 font-semibold text-slate-700">
                      {pkg.ram}
                    </td>

                    {/* SSD STORAGE */}
                    <td className="py-5 px-4 font-semibold text-slate-700">
                      {pkg.storage}
                    </td>

                    {/* TỐC ĐỘ MẠNG */}
                    <td className="py-5 px-4 font-semibold text-slate-700">
                      {pkg.networkSpeed}
                    </td>

                    {/* GIÁ */}
                    <td className="py-5 px-6">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-base md:text-lg font-black text-rose-600 whitespace-nowrap">
                            {formatCurrency(pkg.price)}
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal">
                            /tháng
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="line-through text-slate-400 text-xs whitespace-nowrap">
                            {formatCurrency(pkg.originalPrice)}
                          </span>
                          <span className="bg-slate-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                            {pkg.discountBadge}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* THAO TÁC */}
                    <td className="py-5 px-6">
                      <div className="flex flex-col gap-2 w-36 mx-auto">
                        <button
                          onClick={() => handleOrder(pkg)}
                          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 rounded-lg text-xs transition-colors shadow-sm cursor-pointer text-center"
                        >
                          Đăng ký
                        </button>
                        <button
                          onClick={() => handleCustomConfig(pkg)}
                          className="w-full border border-blue-900 text-blue-900 hover:bg-blue-50 font-semibold py-1.5 rounded-lg text-[11px] transition-colors cursor-pointer text-center"
                        >
                          Tùy chọn cấu hình
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note / SLA guarantee below table */}
        <div className="mt-6 text-center text-xs text-slate-500 font-light flex items-center justify-center gap-4 flex-wrap">
          <span>
            <i className="fa-solid fa-circle-check text-emerald-500 mr-1"></i> Giá trên chưa bao gồm 10% VAT
          </span>
          <span>
            <i className="fa-solid fa-circle-check text-emerald-500 mr-1"></i> Cam kết hạ tầng Uptime 99.99%
          </span>
          <span>
            <i className="fa-solid fa-circle-check text-emerald-500 mr-1"></i> Hỗ trợ kỹ thuật 24/7/365
          </span>
        </div>
      </div>

      {/* OS Image Picker Modal */}
      {isModalOpen && selectedPackage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(15,23,42,0.65)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full flex flex-col"
            style={{ maxWidth: 780, maxHeight: "90vh" }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                  <i className="fa-brands fa-linux text-blue-700 text-base"></i>
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                    Chọn Image khởi tạo
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Thông tin dịch vụ:{" "}
                    <span className="font-semibold text-slate-600">
                      Cloud Server – {selectedPackage.name}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors text-xl leading-none cursor-pointer flex-shrink-0"
                aria-label="Đóng"
              >
                ×
              </button>
            </div>

            {/* ── OS Category Tabs ── */}
            <div className="px-6 pt-4 pb-3 flex items-center gap-2 border-b border-slalex-shrink-te-100 f0">
              <button
                onClick={() => { setOsTab("core"); setSelectedOs(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  osTab === "core"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <i className="fa-brands fa-linux"></i>
                Linux Core
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                  osTab === "core" ? "bg-white/25 text-white" : "bg-slate-300 text-slate-600"
                }`}>
                  {linuxCoreImages.length}
                </span>
              </button>
              <button
                onClick={() => { setOsTab("software"); setSelectedOs(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  osTab === "software"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <i className="fa-brands fa-linux"></i>
                Linux Phần Mềm
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                  osTab === "software" ? "bg-white/25 text-white" : "bg-slate-300 text-slate-600"
                }`}>
                  {linuxSoftwareImages.length}
                </span>
              </button>
            </div>

            {/* ── OS Grid (scrollable) ── */}
            <div className="flex-1 max-h-52 overflow-y-auto px-6 py-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {osImages.map((os) => {
                  const isSelected = selectedOs?.id === os.id;
                  return (
                    <button
                      key={os.id}
                      onClick={() => setSelectedOs(os)}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-blue-600 bg-blue-50 shadow-md"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40 hover:shadow-sm"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                          <i className="fa-solid fa-check text-white text-[8px]"></i>
                        </span>
                      )}
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: os.color + "18" }}
                      >
                        <OsIcon distro={os.icon} color={os.color} />
                      </div>
                      <span
                        className={`text-xs font-semibold leading-snug break-all ${
                          isSelected ? "text-blue-800" : "text-slate-700"
                        }`}
                      >
                        {os.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-4 bg-slate-50/70 rounded-b-2xl flex-shrink-0">
              {/* Selected OS indicator */}
              <div className="flex items-center gap-2 min-w-0">
                {selectedOs ? (
                  <>
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: selectedOs.color + "20" }}
                    >
                      <OsIcon distro={selectedOs.icon} color={selectedOs.color} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 truncate">
                      {selectedOs.name}
                    </span>
                    <i className="fa-solid fa-circle-check text-emerald-500 text-sm flex-shrink-0"></i>
                  </>
                ) : (
                  <span className="text-xs text-slate-400 italic">Chưa chọn image</span>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 bg-slate-100 transition-colors cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!selectedOs}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    selectedOs
                      ? "bg-blue-700 hover:bg-blue-600 text-white shadow-md shadow-blue-200 cursor-pointer"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  Tiếp tục đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Config Modal ── */}
      {isConfigModalOpen && selectedPackage && (() => {
        // Base = originalPrice; add unit cost for each unit ABOVE the base config
        const extraRam     = Math.max(0, configRam     - baseRam);
        const extraCpu     = Math.max(0, configCpu     - baseCpu);
        const extraStorage = Math.max(0, configStorage - baseStorage);
        const configTotal  = selectedPackage.originalPrice
          + extraRam     * RAM_UNIT_PRICE
          + extraCpu     * CPU_UNIT_PRICE
          + extraStorage * STORAGE_UNIT_PRICE;
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(15,23,42,0.65)", backdropFilter: "blur(4px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setIsConfigModalOpen(false); }}
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full flex flex-col" style={{ maxWidth: 520 }}>
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                    <i className="fa-solid fa-sliders text-blue-700 text-base"></i>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base">Tuỳ chọn nâng cấp</h3>
                </div>
                <button
                  onClick={() => setIsConfigModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors text-xl leading-none cursor-pointer"
                >
                  ×
                </button>
              </div>

              {/* Base package badge */}
              <div className="px-6 pt-4">
                <div className="bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl text-center tracking-wide">
                  Gói cước gốc: {selectedPackage.name}
                </div>
              </div>

              {/* Config rows */}
              <div className="px-6 py-5 space-y-4">
                {/* RAM */}
                <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:border-blue-200 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-memory text-blue-600"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800">RAM (GB)</div>
                    <div className="text-[11px] font-semibold mt-0.5">
                      {extraRam > 0
                        ? <span className="text-rose-500">+{formatCurrency(extraRam * RAM_UNIT_PRICE)} /tháng</span>
                        : <span className="text-slate-400">Gói gốc: {baseRam} GB</span>
                      }
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setConfigRam(Math.max(baseRam, configRam - 1))}
                      disabled={configRam <= baseRam}
                      className="w-8 h-8 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >−</button>
                    <span className="w-10 text-center text-sm font-bold text-slate-900">{configRam}</span>
                    <span className="text-xs text-slate-500 font-semibold">GB</span>
                    <button
                      onClick={() => setConfigRam(Math.min(128, configRam + 1))}
                      className="w-8 h-8 rounded-lg border border-slate-300 bg-white hover:bg-blue-50 hover:border-blue-400 flex items-center justify-center text-slate-600 font-bold cursor-pointer transition-colors"
                    >+</button>
                  </div>
                </div>

                {/* CPU */}
                <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:border-blue-200 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-microchip text-purple-600"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800">CPU (Core)</div>
                    <div className="text-[11px] font-semibold mt-0.5">
                      {extraCpu > 0
                        ? <span className="text-rose-500">+{formatCurrency(extraCpu * CPU_UNIT_PRICE)} /tháng</span>
                        : <span className="text-slate-400">Gói gốc: {baseCpu} Core</span>
                      }
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setConfigCpu(Math.max(baseCpu, configCpu - 1))}
                      disabled={configCpu <= baseCpu}
                      className="w-8 h-8 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >−</button>
                    <span className="w-10 text-center text-sm font-bold text-slate-900">{configCpu}</span>
                    <span className="text-xs text-slate-500 font-semibold">Core</span>
                    <button
                      onClick={() => setConfigCpu(Math.min(64, configCpu + 1))}
                      className="w-8 h-8 rounded-lg border border-slate-300 bg-white hover:bg-blue-50 hover:border-blue-400 flex items-center justify-center text-slate-600 font-bold cursor-pointer transition-colors"
                    >+</button>
                  </div>
                </div>

                {/* Storage */}
                <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:border-blue-200 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-hard-drive text-emerald-600"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800">Dung lượng (GB)</div>
                    <div className="text-[11px] font-semibold mt-0.5">
                      {extraStorage > 0
                        ? <span className="text-rose-500">+{formatCurrency(extraStorage * STORAGE_UNIT_PRICE)} /tháng</span>
                        : <span className="text-slate-400">Gói gốc: {baseStorage} GB</span>
                      }
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setConfigStorage(Math.max(baseStorage, configStorage - 10))}
                      disabled={configStorage <= baseStorage}
                      className="w-8 h-8 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >−</button>
                    <span className="w-10 text-center text-sm font-bold text-slate-900">{configStorage}</span>
                    <span className="text-xs text-slate-500 font-semibold">GB</span>
                    <button
                      onClick={() => setConfigStorage(Math.min(2000, configStorage + 10))}
                      className="w-8 h-8 rounded-lg border border-slate-300 bg-white hover:bg-blue-50 hover:border-blue-400 flex items-center justify-center text-slate-600 font-bold cursor-pointer transition-colors"
                    >+</button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6">
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Tổng tiền</div>
                    <div className="text-xl font-black text-rose-600">
                      {formatCurrency(configTotal)}
                      <span className="text-xs font-normal text-slate-400 ml-1">/tháng</span>
                    </div>
                    {(extraRam > 0 || extraCpu > 0 || extraStorage > 0) && (
                      <div className="text-[10px] text-blue-600 font-semibold mt-0.5">
                        Gốc: {formatCurrency(selectedPackage.originalPrice)}
                        {" + "}nâng cấp: {formatCurrency(configTotal - selectedPackage.originalPrice)}
                      </div>
                    )}
                    <div className="text-[10px] text-amber-600 font-semibold mt-0.5">
                      Chưa bao gồm VAT và chương trình khuyến mãi
                    </div>
                  </div>
                  <button
                    onClick={handleConfigConfirm}
                    className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-3 rounded-xl text-xs transition-all shadow-md shadow-rose-200 cursor-pointer"
                  >
                    Đến giỏ hàng
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
