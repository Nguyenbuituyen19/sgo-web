"use client";

import { useState, useEffect, useMemo, Suspense, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/NavBar";
import CartItemList, { CartItem } from "./CartItemList";
import CartSuggestions from "./CartSuggestions";
import CartSummary from "./CartSummary";
import CheckoutModal from "./CheckoutModal";
import Footer from "@/components/layout/Footer";

// Default initial item matching screenshot if cart is empty
const INITIAL_DEMO_ITEM: CartItem = {
  id: "cloud-server-linux-1",
  type: "cloud-server",
  title: "Cloud Server",
  subtitle: "Cloud Server Linux 1",
  regType: "new",
  durationYears: 1,
  durationLabel: "1 năm",
  location: "TP. Hồ Chí Minh",
  osImage: "CentOS-Stream-8",
  originalPrice: 1174800,
  finalPrice: 763620, // 763.620đ includes 10% VAT; Subtotal 694.200đ, VAT 69.420đ
  discountPercentage: 35,
  config: {
    cpu: "2 Core",
    ram: "2 GB",
    storage: "40 GB SSD",
    bandwidth: "100 Mbps",
    ip: "1 IPv4 Dedicated",
  },
  promoNote: "Đại Lễ Phơi Phới - Deal Mới Tới Rồi: iNET ưu đãi đến 35% Cloud Server, Cloud VPS",
};

// Preset catalog for URL param lookup (giữ tương thích với link cũ id linux-*/turbo-*)
const KNOWN_PACKAGES: Record<string, Partial<CartItem>> = {
  "linux-1": {
    title: "Cloud Server",
    subtitle: "Cloud Server Linux 1",
    originalPrice: 1174800,
    finalPrice: 763620,
    config: { cpu: "2 Core", ram: "2 GB", storage: "40 GB SSD", bandwidth: "100 Mbps", ip: "1 IPv4" },
  },
  "linux-2": {
    title: "Cloud Server",
    subtitle: "Cloud Server Linux 2",
    originalPrice: 1740000,
    finalPrice: 1131000,
    config: { cpu: "2 Core", ram: "4 GB", storage: "60 GB SSD", bandwidth: "200 Mbps", ip: "1 IPv4" },
  },
  "linux-3": {
    title: "Cloud Server",
    subtitle: "Cloud Server Linux 3",
    originalPrice: 2490000,
    finalPrice: 1618500,
    config: { cpu: "4 Core", ram: "6 GB", storage: "80 GB SSD", bandwidth: "300 Mbps", ip: "1 IPv4" },
  },
  "turbo-1": {
    title: "Turbo Cloud Server",
    subtitle: "Turbo Cloud Server 1",
    originalPrice: 3600000,
    finalPrice: 2340000,
    config: { cpu: "2 Core", ram: "4 GB", storage: "50 GB NVMe", bandwidth: "500 Mbps", ip: "1 IPv4" },
  },
  "turbo-2": {
    title: "Turbo Cloud Server",
    subtitle: "Turbo Cloud Server 2",
    originalPrice: 6600000,
    finalPrice: 4290000,
    config: { cpu: "4 Core", ram: "8 GB", storage: "100 GB NVMe", bandwidth: "500 Mbps", ip: "1 IPv4" },
  },
};

/** Subscribe rỗng cho useSyncExternalStore — cờ hydration không cần event. */
const emptySubscribe = () => () => {};

function CartPageContent() {
  const searchParams = useSearchParams();

  const pkgParam = searchParams.get("package");
  const osParam = searchParams.get("os");
  const ramParam = searchParams.get("ram");
  const cpuParam = searchParams.get("cpu");
  const stgParam = searchParams.get("storage");
  const nameParam = searchParams.get("name");
  const priceParam = searchParams.get("price");
  const bwParam = searchParams.get("bandwidth");

  // SSR/render đầu = false, sau hydration = true. Thay cho setIsLoaded(true) trong effect
  // (vi phạm react-hooks/set-state-in-effect) nhưng vẫn chống lệch hydration với localStorage.
  const isHydrated = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Id ổn định theo gói + cấu hình (không dùng Date.now): cùng 1 URL click nhiều lần
  // hay StrictMode render lặp cũng chỉ ra 1 id duy nhất -> không thể nhân đôi dòng.
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("sgo_cart_items");
      const rawItems: CartItem[] = saved ? JSON.parse(saved) : [];
      // Dọn item trùng đã lưu từ trước (mọi loại, id cũ có hậu tố timestamp 13 chữ số).
      const seenKeys = new Set<string>();
      const parsedItems = rawItems.filter((i) => {
        const key = `${i.id.replace(/-\d{13}$/, "")}|${i.osImage || ""}`;
        if (seenKeys.has(key)) return false;
        seenKeys.add(key);
        return true;
      });
      if (!pkgParam) {
        return parsedItems.length === 0 ? [INITIAL_DEMO_ITEM] : parsedItems;
      }

      const urlPrice = priceParam ? parseInt(priceParam.replace(/[^\d]/g, ""), 10) : NaN;
      const hasUrlPrice = Number.isFinite(urlPrice) && urlPrice >= 0;
      const isLegacy = !!KNOWN_PACKAGES[pkgParam];
      // Giá API là giá tháng (gói UUID mới). Preset cũ linux-*/turbo-* vẫn giữ giá năm demo.
      // Mặc định giỏ hàng hiển thị theo tháng (1 tháng), tránh nhân nhầm x12 khi vừa thêm.
      const pkgData = KNOWN_PACKAGES[pkgParam] || {
        title: "Cloud Server",
        subtitle: nameParam || pkgParam,
        originalPrice: hasUrlPrice ? urlPrice : 1500000,
        finalPrice: hasUrlPrice ? urlPrice : 975000,
        config: {
          cpu: cpuParam && !/^\d+$/.test(cpuParam) ? cpuParam : cpuParam ? `${cpuParam} Core` : "2 Core",
          ram: ramParam && !/^\d+$/.test(ramParam) ? ramParam : ramParam ? `${ramParam} GB` : "4 GB",
          storage: stgParam && !/^\d+$/.test(stgParam) ? stgParam : stgParam ? `${stgParam} GB SSD` : "50 GB SSD",
          bandwidth: bwParam || "200 Mbps",
          ip: "1 IPv4",
        },
      };

      const stableId = `cart-item-${pkgParam}`;
      const expectedOs = osParam || "CentOS-Stream-8";
      const expectedRam =
        ramParam && !/^\d+$/.test(ramParam) ? ramParam : ramParam ? `${ramParam} GB` : null;
      const expectedCpu =
        cpuParam && !/^\d+$/.test(cpuParam) ? cpuParam : cpuParam ? `${cpuParam} Core` : null;

      // Giỏ hàng đã có sẵn item cùng gói + cấu hình (F5 / back lại / StrictMode lặp)
      // thì dùng lại, không thêm dòng mới.
      const existing = parsedItems.find(
        (i) =>
          i.type === "cloud-server" &&
          (i.moduleServiceId === pkgParam || i.id === stableId || i.id.startsWith(`${stableId}-`)) &&
          (i.osImage || "") === expectedOs &&
          (expectedRam == null || String(i.config?.ram ?? "") === expectedRam) &&
          (expectedCpu == null || String(i.config?.cpu ?? "") === expectedCpu)
      );
      if (existing) return parsedItems;

      const newItem: CartItem = {
        id: stableId,
        type: "cloud-server",
        title: pkgData.title || "Cloud Server",
        subtitle: pkgData.subtitle || pkgParam,
        regType: "new",
        durationYears: isLegacy ? 1 : 1 / 12,
        durationLabel: isLegacy ? "1 năm" : "1 tháng",
        location: "TP. Hồ Chí Minh",
        osImage: expectedOs,
        originalPrice: pkgData.originalPrice || 1174800,
        finalPrice: pkgData.finalPrice || 763620,
        // Gói từ URL dữ liệu thật (UUID) chưa có khuyến mãi riêng -> không áp discount mặc định.
        // Chỉ giữ 35% cho các mã preset cũ (linux-*/turbo-*) để tương thích link cũ.
        discountPercentage: isLegacy ? 35 : 0,
        // Lưu moduleServiceId từ URL param (UUID của service)
        moduleServiceId: !isLegacy ? pkgParam : undefined,
        config: pkgData.config || {
          cpu: "2 Core",
          ram: "2 GB",
          storage: "40 GB SSD",
          bandwidth: "100 Mbps",
          ip: "1 IPv4",
        },
        promoNote: isLegacy ? "Ưu đãi SGO Data - Giảm 35% Cloud Server" : undefined,
      };

      return [newItem, ...parsedItems.filter((i) => i.id !== newItem.id)];
    } catch {
      return [INITIAL_DEMO_ITEM];
    }
  });
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>("TURBOTRONDOI40%");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Ghi giỏ hàng ra localStorage mỗi khi items đổi (kể cả item mới thêm ở initializer).
  useEffect(() => {
    try {
      localStorage.setItem("sgo_cart_items", JSON.stringify(items));
    } catch {
      // ignore write error
    }
  }, [items]);

  // Persist items changes
  const updateCartItems = (newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem("sgo_cart_items", JSON.stringify(newItems));
    } catch {
      // ignore write error
    }
  };

  // Duration change handler
  const handleUpdateDuration = (
    id: string,
    durationYears: number,
    durationLabel: string,
    discountPct: number
  ) => {
    const updated = items.map((item) => {
      if (item.id !== id) return item;
      const discount = discountPct > 0 ? discountPct : item.discountPercentage > 0 ? item.discountPercentage : 0;
      // Gói mới (giá tháng từ API): durationYears có thể là 1/12 (1 tháng).
      // Quy về giá tháng rồi nhân số tháng để tránh sai số khi đổi qua lại.
      const isLegacyPreset = Object.values(KNOWN_PACKAGES).some(
        (p) => p.subtitle === item.subtitle && p.title === item.title
      );
      if (!isLegacyPreset) {
        const currentMonths = Math.max(1, Math.round(item.durationYears * 12));
        const monthlyBase = item.originalPrice / currentMonths;
        const months = Math.max(1, Math.round(durationYears * 12));
        const newOriginalPrice = Math.round(monthlyBase * months);
        const newFinalPrice = Math.round(newOriginalPrice * (1 - discount / 100));
        return {
          ...item,
          durationYears,
          durationLabel,
          originalPrice: newOriginalPrice,
          finalPrice: newFinalPrice,
          discountPercentage: discount,
        };
      }
      // Calculate base price ratio relative to 1 year
      const base1YrOriginal = item.originalPrice / item.durationYears;
      const newOriginalPrice = Math.round(base1YrOriginal * durationYears);
      const newFinalPrice = Math.round(newOriginalPrice * (1 - discount / 100));

      return {
        ...item,
        durationYears,
        durationLabel,
        originalPrice: newOriginalPrice,
        finalPrice: newFinalPrice,
        discountPercentage: discount,
      };
    });
    updateCartItems(updated);
  };

  // OS change handler
  const handleUpdateOs = (id: string, osName: string) => {
    const updated = items.map((item) => (item.id === id ? { ...item, osImage: osName } : item));
    updateCartItems(updated);
  };

  // Location change handler
  const handleUpdateLocation = (id: string, location: string) => {
    const updated = items.map((item) => (item.id === id ? { ...item, location } : item));
    updateCartItems(updated);
  };

  // Remove single item
  const handleRemoveItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    updateCartItems(updated);
  };

  // Clear all items
  const handleClearCart = () => {
    updateCartItems([]);
  };

  // Add suggested service
  const handleAddSuggestedItem = (newItem: CartItem) => {
    // Id ổn định -> click lại / bấm nhanh 2 lần cũng không thêm trùng dòng.
    if (items.some((i) => i.id === newItem.id)) return;
    const updated = [newItem, ...items];
    updateCartItems(updated);
  };

  // Total price calculations
  const rawSum = useMemo(() => items.reduce((acc, item) => acc + item.finalPrice, 0), [items]);

  // Subtotal without VAT (rawSum divided by 1.1)
  const subtotal = useMemo(() => Math.round(rawSum / 1.1), [rawSum]);

  // Coupon discount computation
  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon === "TURBOTRONDOI40%") return Math.round(subtotal * 0.1); // Extra 10% on subtotal
    if (appliedCoupon === "SGO35OFF") return Math.round(subtotal * 0.05);
    if (appliedCoupon === "SGODOMAIN1K") return 50000;
    return 0;
  }, [appliedCoupon, subtotal]);

  // Final subtotal after coupon
  const subtotalAfterCoupon = Math.max(0, subtotal - couponDiscount);
  const vat = Math.round(subtotalAfterCoupon * 0.1);
  const grandTotal = subtotalAfterCoupon + vat;

  // Apply Coupon Code
  const handleApplyCoupon = (code: string) => {
    const validCodes = ["TURBOTRONDOI40%", "SGO35OFF", "SGODOMAIN1K"];
    if (validCodes.includes(code.toUpperCase())) {
      setAppliedCoupon(code.toUpperCase());
      return true;
    }
    return false;
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
          <i className="fa-solid fa-circle-notch animate-spin text-blue-600 text-xl"></i>
          Đang tải giỏ hàng SGO...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col antialiased">
      {/* Header / Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
            <i className="fa-solid fa-chevron-right text-[9px] text-slate-400"></i>
            <span className="text-slate-900 font-semibold">Giỏ hàng của bạn</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Giỏ hàng ({items.length} dịch vụ)
          </h1>
        </div>

        {/* Grid Layout: Left Items (65%) | Right Summary (35%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column */}
          <div className="lg:col-span-8">
            <CartItemList
              items={items}
              onUpdateDuration={handleUpdateDuration}
              onUpdateOs={handleUpdateOs}
              onUpdateLocation={handleUpdateLocation}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
            />

            <CartSuggestions onAddSuggestedItem={handleAddSuggestedItem} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4">
            <CartSummary
              subtotal={subtotal}
              vat={vat}
              discountAmount={couponDiscount}
              grandTotal={grandTotal}
              appliedCoupon={appliedCoupon}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              onProceedToCheckout={() => setIsCheckoutOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        grandTotal={grandTotal}
        itemsCount={items.length}
        onClearCart={handleClearCart}
        cartItems={items}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function CartPageContainer() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
            <i className="fa-solid fa-circle-notch animate-spin text-blue-600 text-xl"></i>
            Đang khởi tạo giỏ hàng...
          </div>
        </div>
      }
    >
      <CartPageContent />
    </Suspense>
  );
}
