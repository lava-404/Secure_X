"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/10 text-gray-400 py-10 px-6 md:px-16 mt-32 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Logo + copyright */}
        <div className="text-center md:text-left">
          <h2 className="font-instrument text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 text-transparent bg-clip-text">
            SecureX 
          </h2>
          <p className="text-sm mt-1 text-gray-500">© 2025 SecureX. All rights reserved.</p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <Link href="/about" className="hover:text-cyan-400 transition-colors">
            About
          </Link>
          <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-cyan-400 transition-colors">
            Contact
          </Link>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            GitHub
          </a>
        </nav>

        {/* Social icons */}
        <div className="flex gap-5 justify-center">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 hover:bg-cyan-400/10 border border-white/10 hover:border-cyan-400/40 transition-all duration-300"
          >
            <Linkedin className="w-5 h-5 text-cyan-400 hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/5 hover:bg-cyan-400/10 border border-white/10 hover:border-cyan-400/40 transition-all duration-300"
          >
            <Github className="w-5 h-5 text-cyan-400 hover:scale-110 transition-transform" />
          </a>
          <a
            href="mailto:contact@locked.app"
            className="p-2 rounded-full bg-white/5 hover:bg-cyan-400/10 border border-white/10 hover:border-cyan-400/40 transition-all duration-300"
          >
            <Mail className="w-5 h-5 text-cyan-400 hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>

      {/* Subtle line glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-[2px]" />
    </footer>
  );
}
