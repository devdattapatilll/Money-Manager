"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Add() {
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [type, setType] = useState("expense")

  const handleAdd = async () => {
    const { error } = await supabase.from("transactions").insert([
      {
        amount: Number(amount),
        category,
        type
      }
    ])

    if (error) {
      alert("Error adding transaction")
      console.log(error)
    } else {
      alert("Transaction added")
      window.location.href = "/dashboard"
      setAmount("")
      setCategory("")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add Transaction</h1>

      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-2 block mb-2"
      />

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="border p-2 block mb-2"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 block mb-4"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button
        onClick={handleAdd}
        className="bg-black text-white px-4 py-2"
      >
        Add
      </button>
    </div>
  )
}