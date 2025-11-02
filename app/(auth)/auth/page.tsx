"use client";

import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { LogIn } from "lucide-react";
import Navbar from "../../components/Navbar"
export default function Signup() {
  const router = useRouter();

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
        }),
      });

      console.log("user logged", response);
      localStorage.setItem("user", JSON.stringify(user.email));
      router.push("/generator");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080808] relative overflow-hidden px-6">
      <Navbar />
      {/* Subtle glow gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-green-500/10 blur-3xl" />

      {/* Neon frame around form */}
      <form className="relative z-10 flex flex-col gap-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.1)] p-10 w-full max-w-md text-white transition-all duration-300 hover:shadow-[0_0_45px_rgba(0,255,255,0.2)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 text-transparent bg-clip-text">
            Access Vault
          </h1>
          <p className="text-sm text-gray-400 mt-2 tracking-wide">
            Your credentials, encrypted before they even leave your browser.
          </p>
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-gray-400">
            Email
          </label>
          <input
            type="email"
            className="bg-white/10 border border-white/20 rounded-md py-3 px-4 text-sm focus:outline-none focus:border-cyan-400 placeholder:text-gray-500"
            placeholder="you@example.com"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-gray-400">
            Password
          </label>
          <input
            type="password"
            className="bg-white/10 border border-white/20 rounded-md py-3 px-4 text-sm focus:outline-none focus:border-cyan-400 placeholder:text-gray-500"
            placeholder="••••••••"
          />
        </div>

        {/* Divider line */}
        <div className="relative flex items-center justify-center">
          <div className="h-px bg-white/10 w-full"></div>
          <span className="absolute bg-[#080808] px-2 text-xs text-gray-500">
            or
          </span>
        </div>

        {/* Sign in with Google */}
        <button
          type="button"
          onClick={handleSignIn}
          className="flex items-center justify-center gap-2 py-3 px-6 rounded-md bg-gradient-to-r from-cyan-500 to-green-500 text-black font-semibold tracking-wide hover:from-cyan-400 hover:to-green-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
        >
          <LogIn className="w-5 h-5" />
          Sign In with Google
        </button>

        {/* Subtext */}
        <p className="text-xs text-center text-gray-500 mt-4">
          By signing in, you agree to our{" "}
          <span className="text-cyan-400 cursor-pointer hover:underline">
            privacy policy
          </span>
          .
        </p>
      </form>

      {/* Futuristic border highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-[2px]" />
    </div>
  );
}
