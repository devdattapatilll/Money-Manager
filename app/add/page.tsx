"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

const expenseCategories = [
  { id: "food", label: "Food & Dining" },
  { id: "transport", label: "Transport" },
  { id: "shopping", label: "Shopping" },
  { id: "entertainment", label: "Entertainment" },
  { id: "utilities", label: "Utilities" },
  { id: "health", label: "Health" },
  { id: "education", label: "Education" },
  { id: "others", label: "Others" },
]

const incomeCategories = [
  { id: "salary", label: "Salary" },
  { id: "freelance", label: "Freelance" },
  { id: "investment", label: "Investment" },
  { id: "gift", label: "Gift" },
  { id: "others", label: "Others" },
]

export default function Add() {
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [type, setType] = useState<"expense" | "income">("expense")
  const [loading, setLoading] = useState(false)

  const categories = type === "expense" ? expenseCategories : incomeCategories

  const handleAdd = async () => {
    if (!amount || !category) {
      alert("Please fill in all fields")
      return
    }

    setLoading(true)
    const { error } = await supabase.from("transactions").insert([
      {
        amount: Number(amount),
        category,
        type
      }
    ])

    setLoading(false)

    if (error) {
      alert("Error adding transaction: " + error.message)
      console.log(error)
    } else {
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#BFD8F2]">Add Transaction</h1>
        <p className="text-[#7A8FA3] mt-1">Record your income or expenses</p>
      </div>

      {/* Type Selector */}
      <div className="p-6 bg-[#04384D] border border-[#1F7A8C] rounded-2xl">
        <label className="text-sm text-[#7A8FA3] mb-3 block">Transaction Type</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setType("expense")
              setCategory("")
            }}
            className={`p-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              type === "expense"
                ? "bg-[#ef4444] text-white shadow-lg"
                : "bg-[#022B3B] border border-[#1F7A8C] hover:border-[#ef4444]/50 text-[#E2E6F3]"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
            Expense
          </button>
          <button
            onClick={() => {
              setType("income")
              setCategory("")
            }}
            className={`p-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              type === "income"
                ? "bg-[#10b981] text-white shadow-lg"
                : "bg-[#022B3B] border border-[#1F7A8C] hover:border-[#10b981]/50 text-[#E2E6F3]"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
            Income
          </button>
        </div>
      </div>

      {/* Amount Input */}
      <div className="p-6 bg-[#04384D] border border-[#1F7A8C] rounded-2xl">
        <label className="text-sm text-[#7A8FA3] mb-3 block">Amount (₹)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A8FA3] text-lg">₹</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full pl-10 pr-4 py-4 bg-[#022B3B] border border-[#1F7A8C] rounded-xl text-2xl font-semibold text-[#E2E6F3] focus:border-[#BFD8F2] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Category Selection */}
      <div className="p-6 bg-[#04384D] border border-[#1F7A8C] rounded-2xl">
        <label className="text-sm text-[#7A8FA3] mb-3 block">Category</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                category === cat.id
                  ? "bg-[#1F7A8C] text-white shadow-lg"
                  : "bg-[#022B3B] border border-[#1F7A8C] hover:border-[#BFD8F2]/50 text-[#E2E6F3]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          disabled={loading || !amount || !category}
          className="flex-1 py-4 bg-[#1F7A8C] text-white font-semibold rounded-xl shadow-lg hover:bg-[#166670] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Transaction"}
        </button>
        <Link
          href="/dashboard"
          className="px-6 py-4 bg-[#022B3B] border border-[#1F7A8C] rounded-xl font-medium text-[#E2E6F3] hover:bg-[#04384D] transition-colors"
        >
          Cancel
        </Link>
      </div>
    </div>
  )
}