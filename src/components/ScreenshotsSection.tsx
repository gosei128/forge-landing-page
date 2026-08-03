import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const ScreenshotsSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Header reveal
      gsap.from(".screens-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // Left Screen entrance
      gsap.from(".screen-card-left", {
        x: -80,
        opacity: 0,
        rotate: -6,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".screens-grid",
          start: "top 80%",
        },
      });

      // Center Screen entrance & glow
      gsap.from(".screen-card-center", {
        scale: 0.85,
        opacity: 0,
        y: 50,
        duration: 1.1,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".screens-grid",
          start: "top 80%",
        },
      });

      // Right Screen entrance
      gsap.from(".screen-card-right", {
        x: 80,
        opacity: 0,
        rotate: 6,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".screens-grid",
          start: "top 80%",
        },
      });

      // Progress bars fill animation
      gsap.from(".mission-progress-bar", {
        width: "0%",
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".screen-card-left",
          start: "top 75%",
        },
      });

      // Subtle parallax scrub on center card
      gsap.to(".screen-card-center", {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="screens"
      className="py-16 sm:py-24 bg-evolv-charcoal/70 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="screens-header text-center mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.3em] mb-3 text-evolv-lime">
            In Action
          </p>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase leading-none font-display">
            See Every
            <br />
            <span className="text-evolv-lime">Victory.</span>
          </h2>
        </div>

        <div className="screens-grid grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* Screen 1 — Mission List */}
          <div className="screen-card-left rounded-2xl overflow-hidden bg-evolv-dark border border-evolv-lime/25 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <div className="px-4 pt-5 pb-2">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                Active Missions
              </p>
              <p className="text-white font-black text-lg font-display">
                WEEK 3 — TITAN ARC
              </p>
            </div>
            <div className="px-4 pb-5 flex flex-col gap-2">
              {[
                {
                  name: "Deadlift 2× Bodyweight",
                  tier: "Epic",
                  xp: 1200,
                  progress: 88,
                },
                {
                  name: "10K Steps Daily",
                  tier: "Daily",
                  xp: 100,
                  progress: 62,
                },
                {
                  name: "No Rest Days This Week",
                  tier: "Weekly",
                  xp: 600,
                  progress: 43,
                },
              ].map((m) => (
                <div key={m.name} className="rounded-lg p-3 bg-evolv-charcoal">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white text-xs font-semibold">
                      {m.name}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-evolv-lime/20 text-evolv-lime border border-evolv-lime/30">
                      {m.tier}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-evolv-lime/15 overflow-hidden">
                      <div
                        className="mission-progress-bar h-full rounded-full bg-evolv-lime"
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-evolv-lime">
                      +{m.xp} XP
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Screen 2 — Level Up (taller, center) */}
          <div className="screen-card-center rounded-2xl overflow-hidden md:-translate-y-6 bg-evolv-dark border-1.5 border-evolv-lime/60 shadow-[0_0_60px_rgba(202,254,32,0.25),0_30px_80px_rgba(0,0,0,0.8)]">
            <div className="flex flex-col items-center justify-center py-10 sm:py-12 px-6 text-center gap-4 bg-[radial-gradient(ellipse_at_center,rgba(202,254,32,0.12)_0%,transparent_70%)]">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-4xl sm:text-5xl font-black bg-evolv-lime/15 border-3 border-evolv-lime text-evolv-lime font-display shadow-[0_0_40px_rgba(202,254,32,0.5)] animate-pulse">
                42
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black uppercase leading-none text-evolv-lime font-display">
                  Level Up!
                </p>
                <p className="text-white/50 text-xs sm:text-sm mt-1">
                  You've reached Titan Rank II
                </p>
              </div>
              <div className="w-full flex flex-col gap-2 mt-2">
                {[
                  "Unlock: Iron Will perk",
                  "+15% XP from strength training",
                  "New mission tier available",
                ].map((perk) => (
                  <div
                    key={perk}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 bg-evolv-charcoal"
                  >
                    <span className="text-evolv-lime text-sm">✦</span>
                    <span className="text-white/70 text-xs">{perk}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 rounded-lg font-black uppercase tracking-[0.1em] text-xs sm:text-sm mt-2 transition-all hover:brightness-110 bg-evolv-lime text-evolv-dark font-display">
                Claim Rewards
              </button>
            </div>
          </div>

          {/* Screen 3 — Streak Tracker */}
          <div className="screen-card-right rounded-2xl overflow-hidden bg-evolv-dark border border-evolv-lime/25 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            <div className="px-4 pt-5 pb-3">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                Streak Tracker
              </p>
              <div className="flex items-end gap-2">
                <p className="text-4xl font-black leading-none text-evolv-lime font-display">
                  14
                </p>
                <p className="text-white/60 text-sm mb-1">day streak 🔥</p>
              </div>
            </div>
            <div className="px-4 pb-5">
              <div className="grid grid-cols-7 gap-1.5 mb-4">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${
                      i < 14
                        ? "bg-evolv-lime"
                        : i < 21
                          ? "bg-evolv-lime/25"
                          : "bg-evolv-lime/10"
                    }`}
                    style={{
                      opacity: i < 14 ? Math.min(1, 0.5 + i * 0.04) : 0.4,
                    }}
                  />
                ))}
              </div>
              <div className="rounded-lg p-3 bg-evolv-charcoal">
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-2">
                  Streak Milestones
                </p>
                {[
                  { days: 7, label: "Week Warrior", done: true },
                  { days: 14, label: "Fortnight Fighter", done: true },
                  { days: 30, label: "Month of Iron", done: false },
                ].map((ms) => (
                  <div key={ms.days} className="flex items-center gap-2 py-1">
                    <div
                      className={`w-4 h-4 rounded-sm flex items-center justify-center flex-shrink-0 ${ms.done ? "bg-evolv-lime text-evolv-dark font-black text-[8px]" : "bg-evolv-lime/20 border border-evolv-lime/30"}`}
                    >
                      {ms.done && "✓"}
                    </div>
                    <span className="text-white/60 text-xs">
                      {ms.days}-day — {ms.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
