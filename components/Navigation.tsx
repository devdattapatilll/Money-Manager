"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/add", label: "Add Transaction", icon: "➕" },
  { href: "/budget", label: "Budget Tracker", icon: "💰" },
  { href: "/invest", label: "Investment Guidance", icon: "📈" },
  { href: "/learn", label: "Financial Literacy", icon: "📚" },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-lg">
              💰
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Money Manager
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "text-muted hover:text-foreground hover:bg-card-hover"
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="md:hidden">
            <MobileNav pathname={pathname} />
          </div>
        </div>
      </div>
    </nav>
  )
}

function MobileNav({ pathname }: { pathname: string }) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-card-hover"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 text-sm font-medium flex items-center gap-3 ${
                  isActive
                    ? "bg-primary/10 text-primary border-r-2 border-primary"
                    : "text-muted hover:text-foreground hover:bg-card-hover"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

import { useState } from "react"
