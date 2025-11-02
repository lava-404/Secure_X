'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Lock,
  LogOut,
  Home,
  Shield,
  KeyRound,
  Menu,
  X
} from 'lucide-react'

export default function DashboardNavbar() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/auth')
  }

  // Close menu on window resize (when resizing back to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-lg border-b border-white/10 shadow-md shadow-cyan-500/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xl tracking-wide">
          <Lock size={22} className="text-cyan-400" /> SecureX
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm text-white/70">
          <button className="flex items-center gap-1 hover:text-cyan-300 transition">
            <Home size={15} /> Home
          </button>
          <button className="flex items-center gap-1 hover:text-cyan-300 transition">
            <KeyRound size={15} /> My Vault
          </button>
          <button className="flex items-center gap-1 hover:text-cyan-300 transition">
            <Shield size={15} /> Security
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="hidden md:flex items-center gap-1 text-sm text-white/70 hover:text-red-400 transition"
        >
          <LogOut size={16} /> Logout
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white/80 hover:text-cyan-400 transition"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0b0b0d]/95 backdrop-blur-md border-t border-white/10 text-sm flex flex-col gap-4 px-6 py-5 text-white/80 animate-in slide-in-from-top duration-300 mb-10">
          <button className="flex items-center gap-2 hover:text-cyan-300 transition">
            <Home size={15} /> Home
          </button>
          <button className="flex items-center gap-2 hover:text-cyan-300 transition">
            <KeyRound size={15} /> My Vault
          </button>
          <button className="flex items-center gap-2 hover:text-cyan-300 transition">
            <Shield size={15} /> Security
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:text-red-400 transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </nav>
  )
}
