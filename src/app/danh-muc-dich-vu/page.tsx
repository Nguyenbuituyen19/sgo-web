import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/NavBar";
import ProvisionCatalog from "@/components/provision-catalog/ProvisionCatalog";

export const metadata: Metadata = {
  title: "Danh mục dịch vụ - SGO Việt Nam",
  description:
    "Tìm và so sánh các gói dịch vụ công nghệ của SGO Việt Nam dành cho doanh nghiệp.",
  alternates: {
    canonical: "https://sgodata.com/danh-muc-dich-vu",
  },
};

interface ProvisionCatalogPageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function ProvisionCatalogPage({
  searchParams,
}: ProvisionCatalogPageProps) {
  const categoryParam = (await searchParams).category;
  const category = Array.isArray(categoryParam)
    ? categoryParam[0]
    : categoryParam;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ProvisionCatalog initialCategoryCode={category} />
      </main>
      <Footer />
    </>
  );
}
