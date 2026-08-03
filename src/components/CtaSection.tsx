import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const CtaSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      tl.from(".cta-badge", { y: 20, opacity: 0, duration: 0.5 })
        .from(
          ".cta-title",
          {
            scale: 0.9,
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.2",
        )
        .from(".cta-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(
          ".cta-form",
          { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3",
        )
        .from(
          ".cta-store-badge",
          { y: 20, opacity: 0, stagger: 0.15, duration: 0.5 },
          "-=0.2",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="cta"
      className="py-20 sm:py-28 text-center relative overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(202,254,32,0.12)_0%,#131316_70%)] border-t border-evolv-lime/20"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="cta-badge text-xs uppercase tracking-[0.3em] mb-4 text-evolv-lime">
          Your Quest Begins Now
        </p>
        <h2 className="cta-title text-4xl sm:text-7xl lg:text-8xl font-black uppercase leading-none mb-6 font-display">
          Stop Training.
          <br />
          <span className="text-evolv-lime">Start Evolving.</span>
        </h2>
        <p className="cta-sub text-white/50 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed max-w-xl mx-auto">
          Free to start. No ads, Offline first, no fluff — just XP, missions and
          receipts for the work you put in.
        </p>

        {/* Email CTA */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="cta-form flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-10"
        >
          <a
            href="/Evolv.apk"
            download="Evolv.apk"
            className="px-7 cursor-pointer py-4 rounded-sm font-black uppercase tracking-[0.12em] text-sm bg-evolv-lime text-evolv-dark font-display shadow-[0_0_24px_rgba(202,254,32,0.4)] transition-all hover:brightness-110 hover:scale-105 whitespace-nowrap"
          >
            Get native app
          </a>
        </form>
      </div>
    </section>
  );
};
