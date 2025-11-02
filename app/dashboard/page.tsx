'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Search, Plus, Trash2, Edit3, LogOut, X } from 'lucide-react'
import Navbar from "../components/Navbar"
interface PasswordEntry {
  passwordFor: string
  seed?: string
  password: string
  createdAt: string
}

export default function Dashboard() {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<PasswordEntry | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userEmail = localStorage.getItem('user')
    if (!userEmail) {
      router.push('/auth')
      return
    }

   

    fetch('/api/passwords?email=' + JSON.parse(userEmail))
      .then(res => res.json())
      .then(data => setPasswords(data.savedPasswords || []))
      .catch(err => console.error('Error fetching passwords:', err))
  }, [router])

  const filteredPasswords = passwords.filter((p) =>
    p.passwordFor.toLowerCase().includes(search.toLowerCase())
  )
  
  const handleAddNew = () => {
    router.push('/generator');
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen w-full bg-gradient-to-b from-[#060606] to-[#0d0d10] text-white font-sans px-6 py-10 flex flex-col items-center relative mt-15">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-5xl mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Lock className="text-cyan-400" /> SecureX Vault
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem('user')
            router.push('/auth')
          }}
          className="flex items-center gap-1 text-sm text-white/70 hover:text-red-400 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Search + Add */}
      <div className="flex justify-between items-center w-full max-w-4xl mb-6">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-2.5 text-white/50" size={18} />
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full bg-white/5 border border-white/20 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:border-cyan-400 placeholder-white/40"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button onClick={handleAddNew} className="flex items-center gap-2 bg-cyan-600/30 border border-cyan-400/50 px-4 py-2 rounded-lg hover:bg-cyan-600/40 transition-all duration-300">
          <Plus size={18} /> Add New
        </button>
      </div>

      {/* Passwords Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {filteredPasswords.length > 0 ? (
          filteredPasswords.map((p, i) => (
            <div
              key={i}
              onClick={() => setSelected(p)}
              className="group bg-white/5 border border-white/10 hover:border-cyan-400/40 rounded-xl p-5 backdrop-blur-md transition-all duration-300 shadow-lg shadow-cyan-500/5 cursor-pointer"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-cyan-300">
                  {p.passwordFor}
                </h2>
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Edit3 size={16} className="cursor-pointer hover:text-yellow-400" />
                  <Trash2 size={16} className="cursor-pointer hover:text-red-400" />
                </div>
              </div>
              <p className="text-white/70 text-sm break-all">
                {p.password.replace(/./g, '•')}
              </p>
              <p className="text-xs text-white/40 mt-2">
                Added: {new Date(p.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <div className="text-white/60 mt-10">No passwords found ⚙️</div>
        )}
      </div>

      {/* Password Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-[#0d0d15] to-[#070709] border border-cyan-400/40 shadow-lg rounded-xl p-8 w-[90%] max-w-md relative text-white animate-fade-in">
            <button
              className="absolute top-3 right-3 text-white/60 hover:text-red-400 transition"
              onClick={() => setSelected(null)}
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-semibold text-cyan-300 mb-4">
              {selected.passwordFor}
            </h2>
            <p className="text-sm text-white/70 mb-3">
              <span className="text-cyan-400 font-medium">Password:</span>{' '}
              <span className="font-mono text-white">{selected.password}</span>
            </p>

            {selected.seed && (
              <p className="text-sm text-white/70 mb-3">
                <span className="text-cyan-400 font-medium">Seed:</span>{' '}
                <span className="font-mono text-white">{selected.seed}</span>
              </p>
            )}

            <p className="text-xs text-white/40">
              Created on:{' '}
              {new Date(selected.createdAt).toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}
            </p>
          </div>
        </div>
      )}

      {/* subtle fade animation */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
    </>
  )
}
