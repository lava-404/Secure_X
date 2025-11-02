'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "../components/Navbar"

export default function Generator() {
  const router = useRouter();
  const [passwordInput, setPasswordInput] = useState("");
  const [seed, setSeed] = useState("");
  const [passwordFor, setPasswordFor] = useState("");
  const [criteria, setCriteria] = useState({
    uppercase: false,
    number: false,
    length: false,
  });

  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
  }, []);

  useEffect(() => {
    setCriteria({
      uppercase: /[A-Z]/.test(passwordInput),
      number: /\d/.test(passwordInput),
      length: passwordInput.length >= 8,
    });
  }, [passwordInput]);

  const handleSave = async () => {
    console.log("sending:", { passwordFor, seed, password: passwordInput, user });
    await fetch("/passwords/save", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        passwordFor,
        seed,
        password: passwordInput,
        email: user
      })
    });
    router.push('/dashboard');
  }

  const handleGenerate = async () => {
    try {
      const response = await fetch("/passwords/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seed }),
      });
      if (!response.ok) throw new Error("Failed to generate password");
      const data = await response.json();
      setPasswordInput(data.password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <Navbar />
      {/* Outer container */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl h-auto md:h-[550px] rounded-lg overflow-hidden shadow-xl">
        
        {/* Video Section */}
        <div className="w-full md:w-1/2 h-[250px] md:h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/images/ani.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Form Section */}
        <form className="w-full md:w-1/2 bg-white text-black flex flex-col gap-4 p-6 sm:p-8 justify-center">
          <div className="flex flex-col gap-1">
            <label className="text-md font-extrabold">Password for *</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-400 rounded-sm"
              placeholder="Github / Gmail..."
              onChange={(e) => setPasswordFor(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-md font-extrabold">Seed</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-400 rounded-sm"
              placeholder="Cookie123"
              onChange={(e) => setSeed(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-md font-extrabold">Password</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-400 rounded-sm"
              placeholder="Enter Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>

          <p className="text-md text-gray-600 mt-2">Password strength. Must contain:</p>
          <ul className="list-none space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-500">
              <img
                className="w-4 h-4"
                src={criteria.uppercase ? "/images/correct.png" : "/images/remove.png"}
                alt="status"
              />
              <span>At least 1 uppercase letter</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-500">
              <img
                className="w-4 h-4"
                src={criteria.number ? "/images/correct.png" : "/images/remove.png"}
                alt="status"
              />
              <span>At least 1 number</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-500">
              <img
                className="w-4 h-4"
                src={criteria.length ? "/images/correct.png" : "/images/remove.png"}
                alt="status"
              />
              <span>At least 8 characters</span>
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row w-full gap-4 mt-4">
            <button 
              type="button"
              className="bg-blue-500 text-white border border-black rounded w-full py-2 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
              disabled={!(criteria.uppercase && criteria.number && criteria.length)}
              onClick={handleSave}
            >
              Save Password
            </button>

            <button
              type="button"
              className="bg-green-500 text-white border border-black rounded w-full py-2 hover:bg-green-600"
              onClick={handleGenerate}
            >
              Generate Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
