"use client";
import { Shield, Lock, ClipboardCheck, KeyRound } from "lucide-react";

export default function SecurityPromise() {
  const features = [
    {
      icon: <Lock className="w-12 h-12 text-cyan-400 mb-4" />,
      title: "Client-Side AES Encryption",
      desc: "Every password is encrypted before it ever leaves your device. We never see or store plaintext — only secure ciphertext locked with AES magic.",
    },
    {
      icon: <Shield className="w-12 h-12 text-emerald-400 mb-4" />,
      title: "Secure MongoDB Storage",
      desc: "Encrypted blobs rest safely in a fortified database. Even if someone peeked inside, all they’d find is gibberish.",
    },
    {
      icon: <ClipboardCheck className="w-12 h-12 text-purple-400 mb-4" />,
      title: "Auto-Clear Clipboard",
      desc: "Copied passwords self-destruct after a few seconds — because forgetting is sometimes the most secure thing you can do.",
    },
    {
      icon: <KeyRound className="w-12 h-12 text-pink-400 mb-4" />,
      title: "Optional 2FA Protection",
      desc: "Add an extra layer of muscle. Two-factor authentication keeps intruders out, even if your password slips.",
    },
  ];

  return (
    <section className="w-11/12 max-w-6xl mx-auto text-center py-24 text-white">
      {/* Title + tagline */}
      <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Zero-Knowledge. Total Control.
      </h2>
      <p className="text-gray-300 text-xl mb-16">
        Your data stays yours — encrypted, locked, and unreadable to anyone but you.
      </p>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {features.map((feat, index) => (
          <div
            key={index}
            className="bg-[#0b0b0b]/80 border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] transition-all duration-500"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="animate-pulse">{feat.icon}</div>
              <h3 className="text-2xl font-semibold mt-3 mb-2 text-white">
                {feat.title}
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Background gradient for mood */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-[#0b0b0b] to-[#050505]" />
    </section>
  );
}
