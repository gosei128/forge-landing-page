import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { StatsSection } from "./components/StatsSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { ScreenshotsSection } from "./components/ScreenshotsSection";
import { ArchetypesSection } from "./components/ArchetypesSection";
import { CtaSection } from "./components/CtaSection";
import { Footer } from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    (window as any).lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      (window as any).lenis = undefined;
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-evolv-dark font-sans text-white">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ArchetypesSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
