"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Dashboard() {
  const [data, setData] = useState<any[]>([])
  const [balance, setBalance] = useState(0)
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [insight, setInsight] = useState("")
  const [advice, setAdvice] = useState("")

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

    transactions.forEach((item) => {
      if (item.type === "income") {
        totalIncome += item.amount
      } else {
        totalExpense += item.amount
      }

      if (item.category === "food") {
        foodExpense += item.amount
      }
    })

    const currentBalance = totalIncome - totalExpense

    setIncome(totalIncome)
    setExpense(totalExpense)
    setBalance(currentBalance)

    // 🔥 Smart Insights
    if (totalExpense > totalIncome * 0.8) {
      setInsight("You are spending too much compared to your income")
    } else if (currentBalance < 0) {
      setInsight("You are in deficit. Reduce expenses")
    } else if (currentBalance > 10000) {
      setInsight("Good savings. Consider investing")
    } else if (foodExpense > totalExpense * 0.4) {
      setInsight("You are spending a lot on food")
    } else {
      setInsight("Your finances are stable")
    }

    // 🚀 Investment Advice
    if (currentBalance < 1000) {
      setAdvice("Focus on saving. Build an emergency fund")
    } else if (currentBalance < 10000) {
      setAdvice("You can start SIP in mutual funds")
    } else {
      setAdvice("Consider diversifying investments (stocks, funds)")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-200 rounded font-semibold">
          Income: ₹{income}
        </div>
        <div className="p-4 bg-red-200 rounded font-semibold">
          Expense: ₹{expense}
        </div>
        <div className="p-4 bg-blue-200 rounded font-semibold">
          Balance: ₹{balance}
        </div>
      </div>

      {/* Insight */}
      <div className="p-4 bg-yellow-100 rounded mb-4">
        Insight: {insight}
      </div>

      {/* Investment Advice */}
      <div className="p-4 bg-purple-100 rounded mb-6">
        Advice: {advice}
      </div>

      {/* Transactions List */}
      {data.length === 0 ? (
        <p className="text-gray-400">
          No transactions yet. Start by adding one.
        </p>
      ) : (
        data.map((item) => (
          <div key={item.id} className="border p-2 mb-2">
            ₹{item.amount} - {item.category} ({item.type})
          </div>
        ))
      )}
    </div>
  )
}