"use client";

import Navbar from "@/components/layout/NavBar";
import ContactMap from "@/components/contact/ContactMap";
import ContactCard from "@/components/contact/ContactCard";
import ContactSupportBar from "@/components/contact/ContactSupportBar";
import Footer from "@/components/layout/Footer";

export default function LienHePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased selection:bg-blue-500 selection:text-white">
      {/* Site Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {/* Google Maps Background Layer */}
        <ContactMap />

        {/* Floating Contact Card Container */}
        <div className="px-4 relative z-20">
          <ContactCard />
        </div>

        {/* Quick Contact Support Pills Bar */}
        <ContactSupportBar />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
