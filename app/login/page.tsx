"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<"login" | "signup">("login")
  const router = useRouter()

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please fill in all fields")
      return
    }

    setLoading(true)

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      setLoading(false)
      if (error) {
        alert(error.message)
      } else {
        router.push("/dashboard")
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password
      })
      setLoading(false)
      if (error) {
        alert(error.message)
      } else {
        alert("Account created! Check your email to confirm.")
        setMode("login")
      }
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-[#1F7A8C] rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
              <line x1="7" y1="15" x2="7.01" y2="15" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#BFD8F2]">Welcome Back</h1>
          <p className="text-[#7A8FA3] mt-1">Sign in to manage your finances</p>
        </div>

        {/* Form Card */}
        <div className="p-8 bg-[#04384D] border border-[#1F7A8C] rounded-2xl shadow-xl">
          {/* Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-[#022B3B] rounded-xl mb-6">
            <button
              onClick={() => setMode("login")}
              className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "login"
                  ? "bg-[#1F7A8C] text-white"
                  : "text-[#7A8FA3] hover:text-[#E2E6F3]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === "signup"
                  ? "bg-[#1F7A8C] text-white"
                  : "text-[#7A8FA3] hover:text-[#E2E6F3]"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#7A8FA3] mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-[#022B3B] border border-[#1F7A8C] rounded-xl text-[#E2E6F3] focus:border-[#BFD8F2] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-[#7A8FA3] mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#022B3B] border border-[#1F7A8C] rounded-xl text-[#E2E6F3] focus:border-[#BFD8F2] focus:outline-none transition-colors"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 bg-[#1F7A8C] text-white font-semibold rounded-xl shadow-lg hover:bg-[#166670] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-[#7A8FA3]">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-[#1F7A8C] hover:text-[#BFD8F2] hover:underline font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-[#1F7A8C] hover:text-[#BFD8F2] hover:underline font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-[#7A8FA3] hover:text-[#E2E6F3] transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}