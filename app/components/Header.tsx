"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  // Don't show header on landing page

  return (
<header className="w-11/12 max-w-4xl mt-10 mx-auto flex justify-between items-center p-4 sm:p-6 bg-white/20 backdrop-blur-lg border border-white/30 rounded-4xl shadow-lg">
  <h1 className="text-2xl font-bold text-white">SecureX</h1>
  <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-lg text-white">
    <Link href="/">Home</Link>
    <Link href="/vault">Vault</Link>
    <Link href="/generate">Generate</Link>
    <Link href="/about">About</Link>
  </nav>
</header>



  );
}
