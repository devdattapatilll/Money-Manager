"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface Budget {
  category: string
  limit: number
  spent: number
  color: string
}

const defaultBudgets: Budget[] = [
  { category: "food", limit: 5000, spent: 0, color: "#1F7A8C" },
  { category: "transport", limit: 3000, spent: 0, color: "#1F7A8C" },
  { category: "entertainment", limit: 2000, spent: 0, color: "#1F7A8C" },
  { category: "shopping", limit: 4000, spent: 0, color: "#1F7A8C" },
  { category: "utilities", limit: 3000, spent: 0, color: "#1F7A8C" },
  { category: "health", limit: 2000, spent: 0, color: "#1F7A8C" },
  { category: "education", limit: 3000, spent: 0, color: "#1F7A8C" },
  { category: "others", limit: 2000, spent: 0, color: "#1F7A8C" },
]

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>(defaultBudgets)
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    const { data: transactions, error } = await supabase
      .from("transactions")
      .select("*")

    if (error || !transactions) return

    let income = 0
    let expense = 0
    const categorySpending: Record<string, number> = {}

    transactions.forEach((t) => {
      if (t.type === "income") {
        income += t.amount
      } else {
        expense += t.amount
        categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount
      }
    })

    setTotalIncome(income)
    setTotalExpense(expense)

    // Update spent amounts in budgets
    setBudgets(prev => prev.map(b => ({
      ...b,
      spent: categorySpending[b.category] || 0
    })))
  }

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0)
  const remaining = totalIncome - totalExpense
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : "0"

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget)
    setShowEditModal(true)
  }

  const saveBudget = (newLimit: number) => {
    if (!editingBudget) return
    setBudgets(prev => prev.map(b =>
      b.category === editingBudget.category ? { ...b, limit: newLimit } : b
    ))
    setShowEditModal(false)
    setEditingBudget(null)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#BFD8F2]">Budget Tracker</h1>
        <p className="text-[#7A8FA3] mt-1">Set limits and track spending by category</p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Income" value={`₹${totalIncome.toLocaleString("en-IN")}`} color="#10b981" />
        <SummaryCard title="Total Expense" value={`₹${totalExpense.toLocaleString("en-IN")}`} color="#ef4444" />
        <SummaryCard title="Remaining" value={`₹${remaining.toLocaleString("en-IN")}`} color={remaining >= 0 ? "#3b82f6" : "#ef4444"} />
        <SummaryCard title="Savings Rate" value={`${savingsRate}%`} color="#f59e0b" />
      </div>

      {/* Budget Overview */}
      <div className="p-6 bg-[#04384D] border border-[#1F7A8C] rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#BFD8F2]">Budget Overview</h3>
          <div className="text-sm text-[#7A8FA3]">
            Total Budget: <span className="font-semibold text-[#E2E6F3]">₹{totalBudget.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = budget.limit > 0 ? (budget.spent / budget.limit) * 100 : 0
            const isOverBudget = percentage > 100
            const isNearLimit = percentage > 80 && percentage <= 100

            return (
              <div key={budget.category} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="capitalize font-medium text-[#E2E6F3]">{budget.category}</span>
                    {isOverBudget && <span className="text-xs px-2 py-0.5 bg-[#ef4444]/10 text-[#ef4444] rounded">Over Budget</span>}
                    {isNearLimit && <span className="text-xs px-2 py-0.5 bg-[#f59e0b]/10 text-[#f59e0b] rounded">Near Limit</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[#7A8FA3]">
                      ₹{budget.spent.toLocaleString("en-IN")} / ₹{budget.limit.toLocaleString("en-IN")}
                    </span>
                    <button
                      onClick={() => handleEdit(budget)}
                      className="text-xs px-2 py-1 bg-[#022B3B] hover:bg-[#06455C] text-[#BFD8F2] rounded transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="h-3 bg-[#022B3B] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1F7A8C] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: isOverBudget ? "#ef4444" : "#1F7A8C" }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-[#7A8FA3]">
                  <span>{percentage.toFixed(1)}% used</span>
                  <span>₹{(budget.limit - budget.spent).toLocaleString("en-IN")} remaining</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Budget Tips */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-[#04384D] border border-[#1F7A8C] rounded-2xl">
          <h3 className="text-lg font-semibold mb-4 text-[#BFD8F2]">Budgeting Tips</h3>
          <ul className="space-y-3 text-[#7A8FA3]">
            <li className="flex items-start gap-2">
              <span className="text-[#1F7A8C]">1.</span>
              <span>Follow 50/30/20 rule - 50% needs, 30% wants, 20% savings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1F7A8C]">2.</span>
              <span>Review and adjust budgets monthly based on actual spending</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1F7A8C]">3.</span>
              <span>Set realistic limits - don't over-restrict yourself</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1F7A8C]">4.</span>
              <span>Use alerts when approaching budget limits</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-[#04384D] border border-[#1F7A8C] rounded-2xl">
          <h3 className="text-lg font-semibold mb-4 text-[#BFD8F2]">Smart Insights</h3>
          <div className="space-y-3">
            {totalExpense > totalIncome * 0.8 && (
              <div className="p-3 bg-[#ef4444]/10 rounded-xl text-sm text-[#ef4444]">
                You're spending more than 80% of your income
              </div>
            )}
            {budgets.some(b => b.spent > b.limit) && (
              <div className="p-3 bg-[#f59e0b]/10 rounded-xl text-sm text-[#f59e0b]">
                Some categories are over budget
              </div>
            )}
            {remaining > totalIncome * 0.3 && (
              <div className="p-3 bg-[#10b981]/10 rounded-xl text-sm text-[#10b981]">
                Great savings rate! Consider investing
              </div>
            )}
            <div className="p-3 bg-[#022B3B] rounded-xl text-sm text-[#7A8FA3]">
              Tip: Consistent small savings add up to big wealth
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingBudget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#04384D] border border-[#1F7A8C] rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-[#BFD8F2]">
              Edit {editingBudget.category} Budget
            </h3>
            <div className="mb-4">
              <label className="text-sm text-[#7A8FA3] mb-2 block">Monthly Limit (₹)</label>
              <input
                type="number"
                defaultValue={editingBudget.limit}
                id="budgetInput"
                className="w-full px-4 py-3 bg-[#022B3B] border border-[#1F7A8C] rounded-xl text-[#E2E6F3] focus:border-[#BFD8F2] focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  const input = document.getElementById("budgetInput") as HTMLInputElement
                  saveBudget(Number(input.value))
                }}
                className="flex-1 py-3 bg-[#1F7A8C] text-white font-semibold rounded-xl hover:bg-[#166670] transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setEditingBudget(null)
                }}
                className="flex-1 py-3 bg-[#022B3B] border border-[#1F7A8C] rounded-xl text-[#E2E6F3] hover:bg-[#06455C] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SummaryCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className="p-5 bg-[#04384D] border border-[#1F7A8C] rounded-2xl">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        </div>
        <span className="text-sm text-[#7A8FA3]">{title}</span>
      </div>
      <p className="text-2xl font-bold text-[#E2E6F3]">{value}</p>
    </div>
  )
}
