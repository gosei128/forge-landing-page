import React from "react";
import evolvLogo from "../assets/images/evolv-logo.jpg";

export const Footer: React.FC = () => {
  return (
    <footer className="py-10 bg-evolv-charcoal border-t border-evolv-lime/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-2">
          <div className="rounded-xl text-evolv-dark flex items-center justify-center font-black text-xs font-display">
            <img
              src={evolvLogo}
              className="w-10 h-10 rounded-lg"
              alt="evolv logo"
            />
          </div>
          <span className="text-sm font-black tracking-widest uppercase text-white/80 font-display">
            Evolv
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs text-white/40">
          {["Privacy Policy", "Terms of Service", "Support"].map((link) => (
            <a
              key={link}
              href="#"
              className="transition-colors hover:text-evolv-lime"
            >
              {link}
            </a>
          ))}
        </div>

        <p className="text-white/25 text-xs">
          © 2026 Evolv Inc. Level up responsibly.
        </p>
      </div>
    </footer>
  );
};
