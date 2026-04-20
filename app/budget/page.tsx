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
  { category: "food", limit: 5000, spent: 0, color: "from-orange-500 to-red-500" },
  { category: "transport", limit: 3000, spent: 0, color: "from-blue-500 to-cyan-500" },
  { category: "entertainment", limit: 2000, spent: 0, color: "from-purple-500 to-pink-500" },
  { category: "shopping", limit: 4000, spent: 0, color: "from-emerald-500 to-teal-500" },
  { category: "utilities", limit: 3000, spent: 0, color: "from-amber-500 to-yellow-500" },
  { category: "health", limit: 2000, spent: 0, color: "from-rose-500 to-red-500" },
  { category: "education", limit: 3000, spent: 0, color: "from-indigo-500 to-purple-500" },
  { category: "others", limit: 2000, spent: 0, color: "from-gray-500 to-slate-500" },
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
        <h1 className="text-3xl font-bold">💰 Budget Tracker</h1>
        <p className="text-muted mt-1">Set limits and track spending by category</p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Income" value={`₹${totalIncome.toLocaleString("en-IN")}`} icon="📥" color="emerald" />
        <SummaryCard title="Total Expense" value={`₹${totalExpense.toLocaleString("en-IN")}`} icon="📤" color="rose" />
        <SummaryCard title="Remaining" value={`₹${remaining.toLocaleString("en-IN")}`} icon="💎" color={remaining >= 0 ? "blue" : "rose"} />
        <SummaryCard title="Savings Rate" value={`${savingsRate}%`} icon="📈" color="amber" />
      </div>

      {/* Budget Overview */}
      <div className="p-6 bg-card border border-border rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">📊 Budget Overview</h3>
          <div className="text-sm text-muted">
            Total Budget: <span className="font-semibold text-foreground">₹{totalBudget.toLocaleString("en-IN")}</span>
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
                    <span className="capitalize font-medium">{budget.category}</span>
                    {isOverBudget && <span className="text-xs px-2 py-0.5 bg-rose-500/10 text-rose-500 rounded">Over Budget</span>}
                    {isNearLimit && <span className="text-xs px-2 py-0.5 bg-warning/10 text-warning rounded">Near Limit</span>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted">
                      ₹{budget.spent.toLocaleString("en-IN")} / ₹{budget.limit.toLocaleString("en-IN")}
                    </span>
                    <button
                      onClick={() => handleEdit(budget)}
                      className="text-xs px-2 py-1 bg-background hover:bg-card-hover rounded transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className="h-3 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-linear-to-r ${budget.color} rounded-full transition-all duration-500 ${
                      isOverBudget ? "bg-rose-500" : ""
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted">
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
        <div className="p-6 bg-card border border-border rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">🎯 Budgeting Tips</h3>
          <ul className="space-y-3 text-muted">
            <li className="flex items-start gap-2">
              <span className="text-primary">1.</span>
              <span>Follow 50/30/20 rule - 50% needs, 30% wants, 20% savings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">2.</span>
              <span>Review and adjust budgets monthly based on actual spending</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">3.</span>
              <span>Set realistic limits - don't over-restrict yourself</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">4.</span>
              <span>Use alerts when approaching budget limits</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-card border border-border rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">📈 Smart Insights</h3>
          <div className="space-y-3">
            {totalExpense > totalIncome * 0.8 && (
              <div className="p-3 bg-rose-500/10 rounded-xl text-sm text-rose-500">
                ⚠️ You're spending more than 80% of your income
              </div>
            )}
            {budgets.some(b => b.spent > b.limit) && (
              <div className="p-3 bg-warning/10 rounded-xl text-sm text-warning">
                ⚠️ Some categories are over budget
              </div>
            )}
            {remaining > totalIncome * 0.3 && (
              <div className="p-3 bg-emerald-500/10 rounded-xl text-sm text-emerald-500">
                ✅ Great savings rate! Consider investing
              </div>
            )}
            <div className="p-3 bg-background rounded-xl text-sm text-muted">
              💡 Tip: Consistent small savings add up to big wealth
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingBudget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Edit {editingBudget.category} Budget
            </h3>
            <div className="mb-4">
              <label className="text-sm text-muted mb-2 block">Monthly Limit (₹)</label>
              <input
                type="number"
                defaultValue={editingBudget.limit}
                id="budgetInput"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  const input = document.getElementById("budgetInput") as HTMLInputElement
                  saveBudget(Number(input.value))
                }}
                className="flex-1 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setEditingBudget(null)
                }}
                className="flex-1 py-3 bg-background border border-border rounded-xl hover:bg-card-hover transition-colors"
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

function SummaryCard({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) {
  const colorClasses: Record<string, string> = {
    emerald: "from-emerald-500 to-teal-500",
    rose: "from-rose-500 to-red-500",
    blue: "from-blue-500 to-cyan-500",
    amber: "from-amber-500 to-orange-500",
  }

  return (
    <div className="p-5 bg-card border border-border rounded-2xl">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${colorClasses[color]} flex items-center justify-center text-lg`}>
          {icon}
        </div>
        <span className="text-sm text-muted">{title}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
