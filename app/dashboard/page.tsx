"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { IncomeIcon, ExpenseIcon, BalanceIcon, PlusIcon, ArrowUpIcon, ArrowDownIcon } from "@/components/Icons"

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
      setInsight("You are spending too much compared to your income")
    } else if (currentBalance < 0) {
      setInsight("You are in deficit. Reduce expenses immediately")
    } else if (currentBalance > 10000) {
      setInsight("Good savings! Consider investing your surplus")
    } else if (foodExpense > totalExpense * 0.4) {
      setInsight("You are spending a lot on food. Consider meal planning")
    } else {
      setInsight("Your finances are stable. Keep it up!")
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
    { label: "Income", value: income, Icon: IncomeIcon, color: "#10b981" },
    { label: "Expense", value: expense, Icon: ExpenseIcon, color: "#ef4444" },
    { label: "Balance", value: balance, Icon: BalanceIcon, color: balance >= 0 ? "#3b82f6" : "#ef4444" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#BFD8F2]">Dashboard</h1>
          <p className="text-[#7A8FA3] mt-1">Track your financial health at a glance</p>
        </div>
        <Link
          href="/add"
          className="px-6 py-3 bg-[#1F7A8C] text-white font-semibold rounded-xl shadow-lg hover:bg-[#166670] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <PlusIcon /> Add Transaction
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-[#04384D] border border-[#1F7A8C] rounded-2xl hover:border-[#BFD8F2]/30 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                <stat.Icon color={stat.color} />
              </div>
              <div>
                <p className="text-sm text-[#7A8FA3]">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.label === "Balance" && balance < 0 ? "text-[#ef4444]" : "text-[#E2E6F3]"}`}>
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
        <div className="p-6 bg-[#04384D] border border-[#1F7A8C] rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.663 17h4.673M12 3v1M6.343 4.343l-.707-.707M18.364 4.343l.707-.707M12 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#BFD8F2]">Smart Insight</h3>
          </div>
          <p className="text-[#7A8FA3] leading-relaxed">{insight || "Add transactions to see insights"}</p>
        </div>

        {/* Investment Advice Card */}
        <div className="p-6 bg-[#04384D] border border-[#1F7A8C] rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#1F7A8C]/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BFD8F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#BFD8F2]">Investment Advice</h3>
          </div>
          <p className="text-[#7A8FA3] leading-relaxed">{advice || "Add transactions to get advice"}</p>
        </div>
      </div>

      {/* Category Breakdown */}
      {Object.keys(categories).length > 0 && (
        <div className="p-6 bg-[#04384D] border border-[#1F7A8C] rounded-2xl">
          <h3 className="text-lg font-semibold mb-4 text-[#BFD8F2]">Spending by Category</h3>
          <div className="space-y-3">
            {Object.entries(categories)
              .sort(([,a], [,b]) => b - a)
              .map(([category, amount]) => {
                const percentage = expense > 0 ? (amount / expense) * 100 : 0
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize text-[#E2E6F3]">{category}</span>
                      <span className="text-[#7A8FA3]">₹{amount.toLocaleString("en-IN")} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="h-2 bg-[#022B3B] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1F7A8C] rounded-full transition-all duration-500"
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
      <div className="p-6 bg-[#04384D] border border-[#1F7A8C] rounded-2xl">
        <h3 className="text-lg font-semibold mb-4 text-[#BFD8F2]">Recent Transactions</h3>
        {data.length === 0 ? (
          <div className="text-center py-8">
            <svg className="w-12 h-12 mx-auto mb-3 text-[#7A8FA3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <p className="text-[#7A8FA3] mb-4">No transactions yet</p>
            <Link href="/add" className="text-[#1F7A8C] hover:text-[#BFD8F2] hover:underline">
              Add your first transaction →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {data.slice().reverse().slice(0, 10).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-[#022B3B] rounded-xl hover:bg-[#06455C] transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.type === "income" ? "bg-[#10b981]/10" : "bg-[#ef4444]/10"
                  }`}>
                    {item.type === "income" ? <ArrowUpIcon color="#10b981" /> : <ArrowDownIcon color="#ef4444" />}
                  </div>
                  <div>
                    <p className="font-medium capitalize text-[#E2E6F3]">{item.category}</p>
                    <p className="text-sm text-[#7A8FA3]">{item.type}</p>
                  </div>
                </div>
                <span className={`font-semibold ${
                  item.type === "income" ? "text-[#10b981]" : "text-[#ef4444]"
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