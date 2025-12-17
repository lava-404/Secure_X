
"use client"
import { useRouter } from "next/navigation"
import Cards from "./components/Cards"
import { Home as HomeIcon } from "lucide-react"
import { Vault, Sparkles, Info } from "lucide-react"
import Link from "next/link";
import Demo from "./components/Demo"
import SecurityPromise from "./components/PromiseSection"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar";
export default function Home() {
  const router = useRouter()

  const handleClick = () => {

    router.push('/auth')
  }
  return (
    <>
    <div className="relative bg-[url('/images/bg.png')] sm:bg-contain bg-cover sm:bg-cover bg-bottom bg-no-repeat min-h-screen text-white overflow-hidden pb-16">
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-0"></div>
  <Navbar></Navbar>


  {/* Hero Section */}
  <div className="relative z-10 width-1/2 mt-30 ml-10 lg:min-h-[40vh] min-h-[30vh] px-6 sm:px-10 md:px-20 ml-12 lg:ml-70 lg:mt-50">
    {/* Left Hero Text */}
    <div className="max-w-6xl md:w-1/2 space-y-6">
      <div
        className="font-instrument lg:text-[clamp(2rem,5vw,10.5rem)] text-[clamp(2rem,8vw,10.5rem)] leading-tight  mx-auto"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Your Secrets. Locked,<br />Loaded and Yours Only
      </div>

      <p className="text-gray-300 lg:text-[clamp(0.9rem,1.2vw,1.4rem)] text-[clamp(1.2rem,0.3vw,4.4rem)] leading-relaxed lg:max-w-6xl max-w-sm">
        A fast, private vault for your passwords. Generate, Save, and Manage them all in one place.
      </p>

      <button onClick={handleClick} className="bg-white hover:cursor-pointer text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-all duration-300">
        Get Started
      </button>
    </div>

    {/* Right Side Cards */}
    
  </div>
  <Cards />
  
</div>
   <Demo />
   <SecurityPromise />
   <Footer />
   </>
  );
}
