import { Metadata } from "next";
import Hero from "@/components/Hero";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Blog from "@/components/Blog";

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
