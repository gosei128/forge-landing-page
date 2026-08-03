import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import archetype from "../assets/images/archetypes.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const ArchetypesSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const mockup1Ref = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-title-line", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      })
        .from(
          ".hero-subtext",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          ".hero-mockup-1",
          {
            x: 60,
            y: 30,
            opacity: 0,
            rotate: -4,
            duration: 0.9,
          },
          "-=0.6",
        );

      // Scroll Parallax Effect
      gsap.to(mockup1Ref.current, {
        y: -50,
        rotate: -8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="features"
      ref={containerRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-12 items-center relative overflow-hidden"
    >
      <div className="text-center lg:text-left z-10">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-none font-black uppercase tracking-tight mb-6 font-display">
          <span className="hero-title-line inline-block">Pick a Hero</span>
          <br />
          <span className="hero-title-line inline-block text-evolv-lime">
            Become the Hero.
          </span>
          <br />
          <span className="hero-title-line inline-block">Choose your</span>
          <br />
          <span className="hero-title-line inline-block">Archetype.</span>
        </h1>

        <p className="hero-subtext text-white/60 text-base sm:text-lg tracking-normal mb-8 sm:mb-10  lg:text-left">
          Select your target archetype—from legendary anime physiques to elite
          athletic builds. Evolv maps out your exact training quest, tracking
          every mission until you unlock your dream physique.
        </p>
      </div>
      <div className="relative flex justify-center lg:justify-end items-center h-95 sm:h-120">
        <img
          ref={mockup1Ref}
          src={archetype}
          alt="Missions screen"
          className={`hero-mockup-1 absolute bottom-0 right-12 sm:right-50 w-52 sm:w-70   rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-shadow `}
        />
      </div>
    </section>
  );
};
