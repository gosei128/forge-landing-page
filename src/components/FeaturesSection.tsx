import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Screenshots
import dashboard from "../assets/images/dashboard.png";
import analytics from "../assets/images/analytics.png";
import exercises from "../assets/images/exercises.png";
import instruction from "../assets/images/instructions.png";
import missions from "../assets/images/missions.png";
import notification from "../assets/images/notification.png";
import profile from "../assets/images/profile.png";
import training from "../assets/images/training.png";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const screenshots = [
  { src: dashboard, label: "Dashboard" },
  { src: analytics, label: "Analytics" },
  { src: exercises, label: "Exercises" },
  { src: instruction, label: "Instructions" },
  { src: missions, label: "Missions" },
  { src: notification, label: "Notifications" },
  { src: profile, label: "Profile" },
  { src: training, label: "Training" },
];

export const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header reveal
      gsap.from(".features-header", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Horizontal scroll: animate the track inside the pinned section
      const track = trackRef.current;
      if (!track) return;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="screenshots"
      className="relative overflow-hidden"
    >
      {/* Header — sits above the horizontal track */}
      <div className="features-header text-center pt-16 sm:pt-24 pb-10 sm:pb-14 px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.3em] mb-3 text-evolv-lime">
          App Screenshots
        </p>
      </div>

      {/* Horizontal scrolling track */}
      <div
        ref={trackRef}
        className="flex gap-6 sm:gap-8 px-8 sm:px-16 pb-16 sm:pb-24 will-change-transform"
      >
        {screenshots.map(({ src, label }) => (
          <div
            key={label}
            className="group relative flex-shrink-0 w-[260px] sm:w-[250px] cursor-pointer"
          >
            <img
              src={src}
              alt={label}
              className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.05] group-hover:-translate-y-5"
            />
          </div>
        ))}
      </div>

      {/* Left edge fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-50 bg-gradient-to-r from-evolv-dark to-transparent z-30" />
      {/* Right edge fade */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-50 bg-gradient-to-l from-evolv-dark to-transparent z-30" />
    </section>
  );
};
