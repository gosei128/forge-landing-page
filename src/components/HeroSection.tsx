import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import missionsImg from "../assets/images/missions.png";
import dashboardImg from "../assets/images/dashboard.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const mockup1Ref = useRef<HTMLImageElement>(null);
  const mockup2Ref = useRef<HTMLImageElement>(null);

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
          ".hero-cta-container",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3",
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
        )
        .from(
          ".hero-mockup-2",
          {
            x: 80,
            y: 50,
            opacity: 0,
            rotate: 8,
            duration: 0.9,
          },
          "-=0.7",
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

      gsap.to(mockup2Ref.current, {
        y: -100,
        rotate: 12,
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
      id="home"
      ref={containerRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-12 items-center relative overflow-hidden"
    >
      {/* Left Content */}
      <div className="text-center lg:text-left z-10">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl leading-none font-black uppercase tracking-tight mb-6 font-display">
          <span className="hero-title-line inline-block">Level Up</span>
          <br />
          <span className="hero-title-line inline-block text-evolv-lime">
            Your Body.
          </span>
          <br />
          <span className="hero-title-line inline-block">Conquer</span>
          <br />
          <span className="hero-title-line inline-block">Every Rep.</span>
        </h1>

        <p className="hero-subtext text-white/60 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-md mx-auto lg:mx-0">
          Evolv transforms your workouts into an RPG. Earn XP, complete
          missions, unlock character archetypes, and climb global leaderboards —
          every gym session becomes an epic quest.
        </p>

        <div className="hero-cta-container flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <a
            href="/Evolv.apk"
            download="Evolv.apk"
            className="text-center px-6 sm:px-8 py-4 rounded-sm text-sm sm:text-base font-bold uppercase tracking-[0.12em] bg-evolv-lime text-evolv-dark font-display shadow-[0_0_32px_rgba(202,254,32,0.3)] transition-colors hover:scale-105 hover:brightness-110"
          >
            Download APK — Free
          </a>
        </div>
      </div>

      {/* Right — Phone mockups with parallax */}
      <div className="relative flex justify-center lg:justify-end items-center h-95 sm:h-120">
        <img
          ref={mockup1Ref}
          src={missionsImg}
          alt="Missions screen"
          className={`hero-mockup-1 absolute bottom-0 right-15 sm:right-56 w-52 sm:w-70   rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)]  -rotate-3 transition-shadow `}
        />
        <img
          ref={mockup2Ref}
          src={dashboardImg}
          alt="Dashboard screen"
          className="hero-mockup-2 absolute bottom-0 right-12 sm:right-6 w-56 sm:w-70 rounded-2xl  transition-shadow  z-10"
        />
      </div>
    </section>
  );
};
