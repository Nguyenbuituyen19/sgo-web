"use client";

import { useState } from "react";
import { request } from "@/shared/client";

interface CartItem {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  durationYears: number;
  durationLabel: string;
  finalPrice: number;
  config?: Record<string, unknown>;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  grandTotal: number;
  itemsCount: number;
  onClearCart: () => void;
  cartItems?: CartItem[];
}

/** Response của POST /api/v1/orders/create — backend trả `id`, không phải `orderId`. */
interface OrderResponse {
  id: string;
  totalAmount: number;
  status: string;
  orderCode: string;
}

/** Response của POST /api/v1/payment/create — bọc trong `response`. */
interface PaymentDetail {
  id: string;
  orderId?: string;
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  status?: string;
  idempotencyKey?: string;
  transferContent?: string;
  bankCode?: string;
  accountNumber?: string;
  accountName?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CreatePaymentResponse {
  urlQr?: string | null;
  response?: PaymentDetail;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  grandTotal,
  itemsCount,
  onClearCart,
  cartItems = [],
}: CheckoutModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [needInvoice, setNeedInvoice] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("qr");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [paymentDetail, setPaymentDetail] = useState<PaymentDetail | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setOrderSuccess(false);
    setQrUrl(null);
    setPaymentDetail(null);
    setOrderCode("");
    setCopiedField(null);
    onClose();
  };

  const handleCopy = (text: string, field: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const handleCreateOrder = async (): Promise<OrderResponse | null> => {
    try {
      // Parse config values to integers for requestedSpecs
      const parseRam = (ram: string) => parseInt(ram.replace(/[^\d]/g, ""), 10) || 2;
      const parseCpu = (cpu: string) => parseInt(cpu.replace(/[^\d]/g, ""), 10) || 2;
      const parseSsd = (storage: string) => parseInt(storage.replace(/[^\d]/g, ""), 10) || 40;

      const items = cartItems.map((item) => ({
        moduleServiceId: item.moduleServiceId || item.id,
        quantity: 1,
        requestedSpecs: {
          ram: parseRam(item.config?.ram || "2 GB"),
          cpu: parseCpu(item.config?.cpu || "2 Core"),
          ssd: parseSsd(item.config?.storage || "40 GB SSD"),
        },
      }));

      const response = await request<OrderResponse>({
        method: "POST",
        url: "/api/v1/orders/create",
        data: {
          email,
          phoneNumber: phone,
          fullName,
          items,
        },
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || "Không thể tạo đơn hàng");
    } catch (error) {
      console.error("Failed to create order:", error);
      throw error;
    }
  };

  const handleCreatePayment = async (orderId: string): Promise<CreatePaymentResponse | null> => {
    try {
      if (!orderId) {
        throw new Error("Thiếu orderId để tạo thanh toán");
      }
      const idempotencyKey = `${orderId}-${Date.now()}`;
      
      const response = await request<CreatePaymentResponse>({
        method: "POST",
        url: "/api/v1/payment/create",
        data: {
          orderId,
          method: "QR",
          idempotencyKey,
        },
      });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || "Không thể tạo thanh toán");
    } catch (error) {
      console.error("Failed to create payment:", error);
      throw error;
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) {
      alert("Vui lòng điền đầy đủ Họ tên, Số điện thoại và Email!");
      return;
    }

    setIsSubmitting(true);
    try {
      // Step 1: Create order
      const orderData = await handleCreateOrder();
      if (!orderData) throw new Error("Không thể tạo đơn hàng");

      setOrderCode(orderData.orderCode);

      // Step 2: Create payment with QR — backend cần orderId là `id` của OrderResponse
      const paymentData = await handleCreatePayment(orderData.id);
      if (!paymentData?.response) throw new Error("Không thể tạo thanh toán");

      setQrUrl(paymentData.urlQr ?? null);
      setPaymentDetail(paymentData.response);

      // Chưa có tính năng xác nhận thanh toán tự động: chỉ hiển thị QR +
      // thông tin chuyển khoản, bộ phận CSKH sẽ xác nhận sau.
      setOrderSuccess(true);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const bankCode = paymentDetail?.bankCode || "970422";
  const accountNumber = paymentDetail?.accountNumber || "0399088964";
  const transferContent = paymentDetail?.transferContent || orderCode;
  const displayAmount = (
    paymentDetail?.amount !== undefined ? paymentDetail.amount : grandTotal
  ).toLocaleString("vi-VN") + " đ";

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8 p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

      {orderSuccess && qrUrl ? (
          /* QR Payment Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-md">
              <i className="fa-solid fa-qrcode"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Quét mã QR để thanh toán
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Sử dụng ứng dụng ngân hàng hoặc ví điện tử để quét mã QR bên dưới
            </p>

            {/* QR Code Display */}
            {qrUrl && (
              <div className="bg-white border border-slate-200 rounded-2xl p-4 inline-block shadow-xs">
                <img 
                  src={qrUrl} 
                  alt="QR Code" 
                  className="w-64 h-64 mx-auto rounded-lg"
                />
              </div>
            )}

            {/* Thông tin chuyển khoản */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden max-w-md mx-auto divide-y divide-slate-100 text-xs sm:text-sm text-left shadow-xs">
              <div className="flex items-center justify-between py-3 px-4">
                <span className="text-slate-500 font-medium">Ngân hàng</span>
                <span className="font-semibold text-slate-800 font-mono">
                  {bankCode}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 px-4">
                <span className="text-slate-500 font-medium">Số tài khoản</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 font-mono">
                    {accountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(accountNumber, "accountNumber")}
                    className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                    title="Sao chép số tài khoản"
                  >
                    {copiedField === "accountNumber" ? (
                      <span className="text-xs text-emerald-600 font-sans font-medium flex items-center gap-1">
                        <i className="fa-solid fa-check"></i> Đã chép
                      </span>
                    ) : (
                      <i className="fa-regular fa-copy text-xs"></i>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 px-4">
                <span className="text-slate-500 font-medium">Nội dung chuyển khoản</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 font-mono">
                    {transferContent}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(transferContent, "transferContent")}
                    className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                    title="Sao chép nội dung chuyển khoản"
                  >
                    {copiedField === "transferContent" ? (
                      <span className="text-xs text-emerald-600 font-sans font-medium flex items-center gap-1">
                        <i className="fa-solid fa-check"></i> Đã chép
                      </span>
                    ) : (
                      <i className="fa-regular fa-copy text-xs"></i>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 px-4">
                <span className="text-slate-500 font-medium">Số tiền</span>
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  {displayAmount}
                </span>
              </div>
            </div>

            {/* Lưu ý */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 text-xs text-left max-w-md mx-auto">
              <p className="font-bold text-amber-900 mb-1">Lưu ý:</p>
              <p className="text-amber-800 leading-relaxed">
                Vui lòng điền đúng nội dung chuyển khoản để được hỗ trợ nhanh nhất. Nếu có
                thắc mắc vui lòng liên hệ hỗ trợ
              </p>
            </div>

            {/* Thông báo xác nhận thanh toán */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-slate-600 max-w-md mx-auto text-left flex items-start gap-2">
              <i className="fa-solid fa-circle-info text-blue-500 mt-0.5 shrink-0"></i>
              <p>
                Hệ thống sẽ liên hệ ngay cho bạn khi thanh toán thành công qua email của bạn
                trong thời gian sớm nhất
              </p>
            </div>

            {/* Actions */}
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  onClearCart();
                  handleClose();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-8 py-3 rounded-xl transition-all shadow-md"
              >
                Hoàn tất & Về trang chủ
              </button>
              <button
                onClick={handleClose}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-8 py-3 rounded-xl transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        ) : orderSuccess && !qrUrl ? (
          /* Fallback Success Screen (no QR) */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-md">
              <i className="fa-solid fa-check"></i>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Đặt hàng thành công!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Cảm ơn bạn đã tin tưởng dịch vụ của <strong>SGO Việt Nam</strong>. Mã đơn hàng của bạn là:
            </p>

            <div className="inline-block bg-blue-50 border border-blue-200 text-blue-700 font-mono font-black text-lg px-6 py-3 rounded-xl shadow-xs">
              #{orderCode}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Khách hàng:</span>
                <span className="font-bold text-slate-900">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Số điện thoại:</span>
                <span className="font-bold text-slate-900">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tổng thanh toán:</span>
                <span className="font-extrabold text-red-600 text-sm">
                  {grandTotal.toLocaleString("vi-VN")} đ
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Chuyên viên tư vấn của SGO sẽ liên hệ trực tiếp tới số <strong>{phone}</strong> để hướng dẫn bàn giao dịch vụ ngay lập tức.
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  onClearCart();
                  handleClose();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-8 py-3 rounded-xl transition-all shadow-md"
              >
                Hoàn tất & Về trang chủ
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-lg">
                <i className="fa-solid fa-credit-card"></i>
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  Xác nhận thông tin đơn hàng
                </h3>
                <p className="text-xs text-slate-500">
                  Vui lòng điền thông tin để đăng ký dịch vụ ({itemsCount} sản phẩm)
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-5">
              {/* Customer Info Section */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs text-slate-700 uppercase tracking-wide">
                  1. Thông tin người đặt hàng
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0981185620"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email nhận bàn giao <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@sgodata.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                {/* VAT Invoice Checkbox */}
                <div className="pt-1">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={needInvoice}
                      onChange={(e) => setNeedInvoice(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span>Tôi muốn xuất hóa đơn GTGT (VAT) doanh nghiệp</span>
                  </label>
                </div>

                {needInvoice && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 animate-in fade-in duration-150">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Tên công ty / Đơn vị
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Công ty Cổ phần SGO Việt Nam"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Mã số thuế (MST)
                      </label>
                      <input
                        type="text"
                        value={taxId}
                        onChange={(e) => setTaxId(e.target.value)}
                        placeholder="0108806638"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Methods Section */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs text-slate-700 uppercase tracking-wide">
                  2. Chọn phương thức thanh toán
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      paymentMethod === "qr-bank"
                        ? "bg-blue-50/80 border-blue-600 ring-1 ring-blue-600"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="qr-bank"
                      checked={paymentMethod === "qr-bank"}
                      onChange={() => setPaymentMethod("qr-bank")}
                      className="sr-only"
                    />
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                      <i className="fa-solid fa-qrcode"></i>
                    </div>
                    <div>
                      <span className="font-extrabold text-xs text-slate-900 block">
                        Chuyển khoản QR Ngân hàng
                      </span>
                      <span className="text-[10px] text-slate-500">Kích hoạt tự động 24/7</span>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      paymentMethod === "vnpay"
                        ? "bg-blue-50/80 border-blue-600 ring-1 ring-blue-600"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="vnpay"
                      checked={paymentMethod === "vnpay"}
                      onChange={() => setPaymentMethod("vnpay")}
                      className="sr-only"
                    />
                    <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                      <i className="fa-solid fa-wallet"></i>
                    </div>
                    <div>
                      <span className="font-extrabold text-xs text-slate-900 block">
                        Thanh toán VNPAY QR
                      </span>
                      <span className="text-[10px] text-slate-500">Quét qua App ngân hàng</span>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      paymentMethod === "momo"
                        ? "bg-blue-50/80 border-blue-600 ring-1 ring-blue-600"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="momo"
                      checked={paymentMethod === "momo"}
                      onChange={() => setPaymentMethod("momo")}
                      className="sr-only"
                    />
                    <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                      <i className="fa-solid fa-mobile-screen"></i>
                    </div>
                    <div>
                      <span className="font-extrabold text-xs text-slate-900 block">
                        Ví điện tử Momo
                      </span>
                      <span className="text-[10px] text-slate-500">Thanh toán nhanh Momo</span>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "bg-blue-50/80 border-blue-600 ring-1 ring-blue-600"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="sr-only"
                    />
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                      <i className="fa-solid fa-credit-card"></i>
                    </div>
                    <div>
                      <span className="font-extrabold text-xs text-slate-900 block">
                        Thẻ ATM Nội địa / Visa
                      </span>
                      <span className="text-[10px] text-slate-500">Thanh toán thẻ online</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Total & Submit Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 block">Tổng tiền thanh toán:</span>
                  <span className="text-xl font-black text-red-600">
                    {grandTotal.toLocaleString("vi-VN")} đ
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-spinner animate-spin"></i> Đang xử lý...
                    </span>
                  ) : (
                    "Xác nhận thanh toán"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
