"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

// Preset catalog for URL param lookup
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

function CartPageContent() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>("TURBOTRONDOI40%");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Initialize cart from URL search params or localStorage or default item
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sgo_cart_items");
      let parsedItems: CartItem[] = saved ? JSON.parse(saved) : [];

      // Check if URL parameters passed from pricing table
      const pkgParam = searchParams.get("package");
      const osParam = searchParams.get("os");
      const ramParam = searchParams.get("ram");
      const cpuParam = searchParams.get("cpu");
      const stgParam = searchParams.get("storage");

      if (pkgParam) {
        const pkgData = KNOWN_PACKAGES[pkgParam] || {
          title: "Cloud Server",
          subtitle: pkgParam,
          originalPrice: 1500000,
          finalPrice: 975000,
          config: {
            cpu: cpuParam ? `${cpuParam} Core` : "2 Core",
            ram: ramParam ? `${ramParam} GB` : "4 GB",
            storage: stgParam ? `${stgParam} GB SSD` : "50 GB SSD",
            bandwidth: "200 Mbps",
            ip: "1 IPv4",
          },
        };

        const newItem: CartItem = {
          id: `cart-item-${pkgParam}-${Date.now()}`,
          type: "cloud-server",
          title: pkgData.title || "Cloud Server",
          subtitle: pkgData.subtitle || pkgParam,
          regType: "new",
          durationYears: 1,
          durationLabel: "1 năm",
          location: "TP. Hồ Chí Minh",
          osImage: osParam || "CentOS-Stream-8",
          originalPrice: pkgData.originalPrice || 1174800,
          finalPrice: pkgData.finalPrice || 763620,
          discountPercentage: 35,
          config: pkgData.config || {
            cpu: "2 Core",
            ram: "2 GB",
            storage: "40 GB SSD",
            bandwidth: "100 Mbps",
            ip: "1 IPv4",
          },
          promoNote: "Ưu đãi SGO Data - Giảm 35% Cloud Server",
        };

        // Prepend or add new item
        parsedItems = [newItem, ...parsedItems.filter((i) => i.id !== newItem.id)];
      } else if (parsedItems.length === 0) {
        // Default demo item matching screenshot
        parsedItems = [INITIAL_DEMO_ITEM];
      }

      setItems(parsedItems);
      localStorage.setItem("sgo_cart_items", JSON.stringify(parsedItems));
    } catch {
      setItems([INITIAL_DEMO_ITEM]);
    } finally {
      setIsLoaded(true);
    }
  }, [searchParams]);

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
      // Calculate base price ratio relative to 1 year
      const base1YrOriginal = item.originalPrice / item.durationYears;
      const newOriginalPrice = Math.round(base1YrOriginal * durationYears);
      const discount = discountPct > 0 ? discountPct : 35;
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

  if (!isLoaded) {
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
            <a href="/" className="hover:text-blue-600">Trang chủ</a>
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
