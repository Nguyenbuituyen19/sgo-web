import { Metadata } from "next";
import CartPageContainer from "@/components/cart/CartPageContainer";

export const metadata: Metadata = {
  title: "Giỏ hàng dịch vụ - SGO Việt Nam",
  description:
    "Trang giỏ hàng đăng ký Tên miền, Cloud Server, Hosting, SSL và Email Doanh nghiệp từ SGO Việt Nam.",
};

export default function GioHangPage() {
  return <CartPageContainer />;
}
