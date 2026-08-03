import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface StatConfig {
  target: number;
  suffix: string;
  label: string;
  formatComma?: boolean;
}

export const StatsSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  const stats: StatConfig[] = [
    { target: 1300, suffix: "+", label: "Excercises", formatComma: true },
    { target: 3, suffix: "+", label: "Missions A Week" },
    { target: 6, suffix: "", label: "Ranks", formatComma: false },
    { target: 47, suffix: "M+", label: "XP Earned" },
  ];

  useGSAP(
    () => {
      // Stagger fade/slide up for containers
      gsap.from(".stat-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });

      // Number count-up animation
      stats.forEach((stat, index) => {
        const el = statRefs.current[index];
        if (!el) return;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.target,
          duration: 2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
          onUpdate: () => {
            const formattedVal = stat.formatComma
              ? Math.floor(obj.val).toLocaleString()
              : Math.floor(obj.val).toString();
            el.innerText = `${formattedVal}${stat.suffix}`;
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="stats"
      className="py-10 sm:py-14 bg-evolv-charcoal border-y border-evolv-lime/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stats.map(({ target, suffix, label, formatComma }, i) => (
          <div key={label} className="stat-card text-center">
            <div
              ref={(el) => {
                statRefs.current[i] = el;
              }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black leading-none mb-1 text-evolv-lime font-display"
            >
              0{suffix}
            </div>
            <div className="text-white/50 text-xs sm:text-sm font-medium uppercase tracking-widest">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
