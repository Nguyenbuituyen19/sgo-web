import { Metadata } from "next";
import CartPageContainer from "@/components/cart/CartPageContainer";

export const metadata: Metadata = {
  title: "Giỏ hàng - SGO Việt Nam",
  description:
    "Trang giỏ hàng thanh toán Cloud Server, Hosting, Tên miền từ SGO Việt Nam.",
};

export default function CartPage() {
  return <CartPageContainer />;
}
