import { Metadata } from "next";
import Hero from "@/components/ComponentsLandingPage/Hero";
import Feature from "@/components/ComponentsLandingPage/Features";
import About from "@/components/ComponentsLandingPage/About";
import FeaturesTab from "@/components/ComponentsLandingPage/FeaturesTab";
import FunFact from "@/components/ComponentsLandingPage/FunFact";
import FAQ from "@/components/ComponentsLandingPage/FAQ";
import Pricing from "@/components/ComponentsLandingPage/Pricing";
import Blog from "@/components/ComponentsLandingPage/Blog";

export const metadata: Metadata = { //quyết định data chung như title (nó chính là tag metadata mà khi gõ html hay tự động gen khi viết html thuần)
  title: 'LEM',
  description: 'Lam Educational Management',
}

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Feature />
      <About />
      <FeaturesTab />
      <FunFact />
      <FAQ />
      <Pricing />
      <Blog />
    </main>
  );
}
