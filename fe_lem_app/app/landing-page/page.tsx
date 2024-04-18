import { Metadata } from "next";
import Hero from "@/components/ComponentsLandingPage/Hero";
import Feature from "@/components/ComponentsLandingPage/Features";
import About from "@/components/ComponentsLandingPage/About";
import FeaturesTab from "@/components/ComponentsLandingPage/FeaturesTab";
import FAQ from "@/components/ComponentsLandingPage/FAQ";

export const metadata: Metadata = {
  //quyết định data chung như title (nó chính là tag metadata mà khi gõ html hay tự động gen khi viết html thuần)
  title: "LEM",
  description: "Lam Educational Management",
};

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Feature />
      <About />
      <FeaturesTab />
      <FAQ />
    </main>
  );
}
