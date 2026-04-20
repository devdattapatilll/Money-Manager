"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function Dashboard() {
  const [data, setData] = useState<any[]>([])
  const [balance, setBalance] = useState(0)
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [insight, setInsight] = useState("")
  const [advice, setAdvice] = useState("")
  const [categories, setCategories] = useState<Record<string, number>>({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: transactions, error } = await supabase
      .from("transactions")
      .select("*")

    if (error) {
      console.log(error)
      return
    }

    if (!transactions) {
      setData([])
      return
    }

    setData(transactions)

    let totalIncome = 0
    let totalExpense = 0
    let foodExpense = 0
    const categoryTotals: Record<string, number> = {}

    transactions.forEach((item) => {
      if (item.type === "income") {
        totalIncome += item.amount
      } else {
        totalExpense += item.amount
      }

      if (item.category === "food") {
        foodExpense += item.amount
      }

      if (item.type === "expense") {
        categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount
      }
    })

    const currentBalance = totalIncome - totalExpense

    setIncome(totalIncome)
    setExpense(totalExpense)
    setBalance(currentBalance)
    setCategories(categoryTotals)

    // Enhanced Smart Insights
    if (totalExpense > totalIncome * 0.8) {
      setInsight("⚠️ You are spending too much compared to your income")
    } else if (currentBalance < 0) {
      setInsight("🔴 You are in deficit. Reduce expenses immediately")
    } else if (currentBalance > 10000) {
      setInsight("🟢 Good savings! Consider investing your surplus")
    } else if (foodExpense > totalExpense * 0.4) {
      setInsight("🍔 You are spending a lot on food. Consider meal planning")
    } else {
      setInsight("✅ Your finances are stable. Keep it up!")
    }

    // Enhanced Investment Advice
    if (currentBalance < 1000) {
      setAdvice("Build an emergency fund of at least 3 months expenses")
    } else if (currentBalance < 10000) {
      setAdvice("Start SIP in index funds. Small steps lead to big wealth")
    } else if (currentBalance < 50000) {
      setAdvice("Diversify: 60% equity, 30% debt, 10% gold/crypto")
    } else {
      setAdvice("High balance! Explore stocks, real estate, and global funds")
    }
  }

  const stats = [
    { label: "Income", value: income, icon: "💰", color: "from-emerald-500 to-teal-500", bg: "bg-emerald-500/10" },
    { label: "Expense", value: expense, icon: "💸", color: "from-rose-500 to-red-500", bg: "bg-rose-500/10" },
    { label: "Balance", value: balance, icon: "💎", color: balance >= 0 ? "from-blue-500 to-cyan-500" : "from-rose-500 to-red-500", bg: balance >= 0 ? "bg-blue-500/10" : "bg-rose-500/10" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted mt-1">Track your financial health at a glance</p>
        </div>
        <Link
          href="/add"
          className="px-6 py-3 bg-linear-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>➕</span> Add Transaction
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-card border border-border rounded-2xl hover:border-primary/30 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-muted">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.label === "Balance" && balance < 0 ? "text-danger" : ""}`}>
                  ₹{stat.value.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Insights & Advice Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Insight Card */}
        <div className="p-6 bg-card border border-border rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center text-xl">
              💡
            </div>
            <h3 className="text-lg font-semibold">Smart Insight</h3>
          </div>
          <p className="text-muted leading-relaxed">{insight || "Add transactions to see insights"}</p>
        </div>

        {/* Investment Advice Card */}
        <div className="p-6 bg-card border border-border rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-xl">
              📈
            </div>
            <h3 className="text-lg font-semibold">Investment Advice</h3>
          </div>
          <p className="text-muted leading-relaxed">{advice || "Add transactions to get advice"}</p>
        </div>
      </div>

      {/* Category Breakdown */}
      {Object.keys(categories).length > 0 && (
        <div className="p-6 bg-card border border-border rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">📊 Spending by Category</h3>
          <div className="space-y-3">
            {Object.entries(categories)
              .sort(([,a], [,b]) => b - a)
              .map(([category, amount]) => {
                const percentage = expense > 0 ? (amount / expense) * 100 : 0
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{category}</span>
                      <span className="text-muted">₹{amount.toLocaleString("en-IN")} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-primary to-secondary rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div className="p-6 bg-card border border-border rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">📝 Recent Transactions</h3>
        {data.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-muted mb-4">No transactions yet</p>
            <Link href="/add" className="text-primary hover:underline">
              Add your first transaction →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {data.slice().reverse().slice(0, 10).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-background rounded-xl hover:bg-card-hover transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                    item.type === "income" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                  }`}>
                    {item.type === "income" ? "📥" : "📤"}
                  </div>
                  <div>
                    <p className="font-medium capitalize">{item.category}</p>
                    <p className="text-sm text-muted">{item.type}</p>
                  </div>
                </div>
                <span className={`font-semibold ${
                  item.type === "income" ? "text-emerald-500" : "text-rose-500"
                }`}>
                  {item.type === "income" ? "+" : "-"}₹{item.amount.toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}