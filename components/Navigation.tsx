"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { DashboardIcon, AddIcon, BudgetIcon, InvestIcon, LearnIcon } from "./Icons"

const navItems = [
  { href: "/dashboard", label: "Dashboard", Icon: DashboardIcon },
  { href: "/add", label: "Add Transaction", Icon: AddIcon },
  { href: "/budget", label: "Budget Tracker", Icon: BudgetIcon },
  { href: "/invest", label: "Investment Guidance", Icon: InvestIcon },
  { href: "/learn", label: "Financial Literacy", Icon: LearnIcon },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1F7A8C] rounded-xl flex items-center justify-center text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
                <line x1="7" y1="15" x2="7.01" y2="15" />
              </svg>
            </div>
            <span className="font-bold text-xl text-[#BFD8F2]">
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
                      ? "bg-[#1F7A8C] text-white shadow-lg"
                      : "text-[#BFD8F2] hover:text-white hover:bg-[#04384D]"
                  }`}
                >
                  <item.Icon />
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
        className="p-2 rounded-lg text-[#BFD8F2] hover:text-white hover:bg-[#04384D]"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#04384D] border border-[#1F7A8C] rounded-xl shadow-xl py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 text-sm font-medium flex items-center gap-3 ${
                  isActive
                    ? "bg-[#1F7A8C]/20 text-[#BFD8F2] border-r-2 border-[#1F7A8C]"
                    : "text-[#BFD8F2] hover:text-white hover:bg-[#04384D]"
                }`}
              >
                <item.Icon />
                {item.label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}