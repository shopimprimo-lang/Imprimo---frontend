import React from "react";
import AboutUsSection from "@/components/homepage/AboutUsSection";

export const metadata = {
  title: "About Us | Imprimo Trading",
  description: "Learn more about Imprimo Trading's premium printing, personalized gifts and branded solutions in Qatar.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-8 md:pt-12 pb-12 bg-im-black">
      <div className="max-w-4xl mx-auto px-4 xl:px-0">
        <AboutUsSection />
      </div>
    </main>
  );
}
