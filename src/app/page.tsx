import Header from "@/components/layout/Header";
import Services from "@/components/home/Services";
import Partners from "@/components/home/Partners";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/home/JsonLd";
import Navbar from "@/components/layout/NavBar";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-16 -mt-10 flex-grow w-full">
        <Services />
        <Partners />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
