import React, { useState, useEffect } from "react";
import gsap from "gsap";
import logo from "../assets/images/evolv-logo.jpg";

export const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50) {
        // Always show near top
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down -> hide
        setShowNavbar(false);
      } else {
        // Scrolling up -> show
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetSelector: string,
  ) => {
    e.preventDefault();

    // 1. Click bounce/highlight micro-interaction on the link element
    gsap.fromTo(
      e.currentTarget,
      { scale: 0.9, color: "#CAFE20" },
      {
        scale: 1,
        color: "",
        duration: 0.4,
        ease: "power2.out",
        clearProps: "all",
      },
    );

    // 2. Smoothly scroll via Lenis or browser fallback with fixed header offset
    const targetElement = document.querySelector(targetSelector);
    if (targetElement) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(targetElement, {
          offset: -80,
          duration: 1.2,
        });
      } else {
        const offsetTop =
          targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-evolv-dark/85 backdrop-blur-md border-b border-white/5 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 max-w-7xl mx-auto">
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex items-center gap-2"
        >
          <img
            src={logo}
            alt="Evolv Logo"
            className="w-10 h-10 rounded-2xl object-cover"
          />
          <span className="text-xl font-black tracking-[0.18em] uppercase font-display text-white">
            Evolv
          </span>
        </a>

        <div className="flex items-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium text-white/60">
          <a
            href="#screenshots"
            onClick={(e) => handleLinkClick(e, "#screenshots")}
            className="hidden sm:inline-block hover:text-white transition-colors"
          >
            Screenshots
          </a>
          <a
            href="#features"
            onClick={(e) => handleLinkClick(e, "#features")}
            className="hidden sm:inline-block hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="/Evolv.apk"
            download="Evolv.apk"
            className="px-4 sm:px-5 py-2 rounded-sm text-xs sm:text-sm font-semibold bg-evolv-lime text-evolv-dark transition-all hover:brightness-110 hover:scale-105"
          >
            Download APK
          </a>
        </div>
      </nav>
    </header>
  );
};
