"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

const expenseCategories = [
  { id: "food", label: "🍔 Food & Dining", color: "from-orange-500 to-red-500" },
  { id: "transport", label: "🚗 Transport", color: "from-blue-500 to-cyan-500" },
  { id: "shopping", label: "🛍️ Shopping", color: "from-purple-500 to-pink-500" },
  { id: "entertainment", label: "🎬 Entertainment", color: "from-emerald-500 to-teal-500" },
  { id: "utilities", label: "💡 Utilities", color: "from-amber-500 to-yellow-500" },
  { id: "health", label: "🏥 Health", color: "from-rose-500 to-red-500" },
  { id: "education", label: "📚 Education", color: "from-indigo-500 to-purple-500" },
  { id: "others", label: "📦 Others", color: "from-gray-500 to-slate-500" },
]

const incomeCategories = [
  { id: "salary", label: "💼 Salary", color: "from-emerald-500 to-teal-500" },
  { id: "freelance", label: "💻 Freelance", color: "from-blue-500 to-cyan-500" },
  { id: "investment", label: "📈 Investment", color: "from-purple-500 to-pink-500" },
  { id: "gift", label: "🎁 Gift", color: "from-amber-500 to-orange-500" },
  { id: "others", label: "📦 Others", color: "from-gray-500 to-slate-500" },
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
        <h1 className="text-3xl font-bold">Add Transaction</h1>
        <p className="text-muted mt-1">Record your income or expenses</p>
      </div>

      {/* Type Selector */}
      <div className="p-6 bg-card border border-border rounded-2xl">
        <label className="text-sm text-muted mb-3 block">Transaction Type</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setType("expense")
              setCategory("")
            }}
            className={`p-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              type === "expense"
                ? "bg-rose-500 text-white shadow-lg shadow-rose-500/25"
                : "bg-background border border-border hover:border-rose-500/50"
            }`}
          >
            <span>📤</span> Expense
          </button>
          <button
            onClick={() => {
              setType("income")
              setCategory("")
            }}
            className={`p-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              type === "income"
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                : "bg-background border border-border hover:border-emerald-500/50"
            }`}
          >
            <span>📥</span> Income
          </button>
        </div>
      </div>

      {/* Amount Input */}
      <div className="p-6 bg-card border border-border rounded-2xl">
        <label className="text-sm text-muted mb-3 block">Amount (₹)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg">₹</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full pl-10 pr-4 py-4 bg-background border border-border rounded-xl text-2xl font-semibold focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Category Selection */}
      <div className="p-6 bg-card border border-border rounded-2xl">
        <label className="text-sm text-muted mb-3 block">Category</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                category === cat.id
                  ? `bg-linear-to-r ${cat.color} text-white shadow-lg`
                  : "bg-background border border-border hover:border-primary/50"
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
          className="flex-1 py-4 bg-linear-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Transaction"}
        </button>
        <Link
          href="/dashboard"
          className="px-6 py-4 bg-background border border-border rounded-xl font-medium hover:bg-card-hover transition-colors"
        >
          Cancel
        </Link>
      </div>
    </div>
  )
}