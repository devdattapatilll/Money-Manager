"use client"

import { useState } from "react"

interface InvestmentOption {
  name: string
  type: string
  risk: "Low" | "Medium" | "High"
  returns: string
  description: string
  minAmount: number
  suitable: string[]
}

const investmentOptions: InvestmentOption[] = [
  {
    name: "Fixed Deposit",
    type: "Savings",
    risk: "Low",
    returns: "6-7%",
    description: "Safe and secure with guaranteed returns. Best for emergency funds.",
    minAmount: 1000,
    suitable: ["Conservative", "Beginner"]
  },
  {
    name: "Public Provident Fund",
    type: "Tax Saving",
    risk: "Low",
    returns: "7-8%",
    description: "Long-term tax-saving instrument with government backing.",
    minAmount: 500,
    suitable: ["Conservative", "Tax Saver"]
  },
  {
    name: "Index Funds (Nifty/Sensex)",
    type: "Equity",
    risk: "Medium",
    returns: "10-12%",
    description: "Low-cost exposure to top Indian companies. Beat inflation over time.",
    minAmount: 500,
    suitable: ["Balanced", "Growth"]
  },
  {
    name: "Equity Mutual Funds",
    type: "Equity",
    risk: "High",
    returns: "12-15%",
    description: "Actively managed funds with potential for higher returns.",
    minAmount: 500,
    suitable: ["Aggressive", "Growth"]
  },
  {
    name: "Sovereign Gold Bonds",
    type: "Gold",
    risk: "Medium",
    returns: "8-10%",
    description: "Government-backed gold investment with 2.5% annual interest.",
    minAmount: 1,
    suitable: ["Balanced", "Diversifier"]
  },
  {
    name: "REITs",
    type: "Real Estate",
    risk: "Medium",
    returns: "8-12%",
    description: "Invest in commercial real estate without buying property.",
    minAmount: 5000,
    suitable: ["Balanced", "Income"]
  },
  {
    name: "Direct Stocks",
    type: "Equity",
    risk: "High",
    returns: "15-20%",
    description: "Own shares of companies. Requires research and patience.",
    minAmount: 1,
    suitable: ["Aggressive", "Experienced"]
  },
  {
    name: "Cryptocurrency",
    type: "Alternative",
    risk: "High",
    returns: "Variable",
    description: "High volatility digital assets. Only invest what you can afford to lose.",
    minAmount: 100,
    suitable: ["Aggressive", "Risk Taker"]
  }
]

const riskProfiles = ["Conservative", "Balanced", "Aggressive"]

export default function InvestmentPage() {
  const [selectedRisk, setSelectedRisk] = useState<string>("Balanced")
  const [monthlySIP, setMonthlySIP] = useState<number>(5000)
  const [years, setYears] = useState<number>(10)
  const [showCalculator, setShowCalculator] = useState(false)

  const filteredOptions = investmentOptions.filter(option =>
    option.suitable.includes(selectedRisk)
  )

  // SIP Calculator
  const rate = 0.12 // 12% annual return assumption
  const months = years * 12
  const futureValue = monthlySIP * ((Math.pow(1 + rate / 12, months) - 1) / (rate / 12)) * (1 + rate / 12)
  const totalInvested = monthlySIP * months
  const estimatedReturns = futureValue - totalInvested

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">💼 Investment Guidance</h1>
        <p className="text-muted mt-1">Smart portfolio recommendations based on your risk profile</p>
      </div>

      {/* Risk Profile Selector */}
      <div className="p-6 bg-card border border-border rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">Select Your Risk Profile</h3>
        <div className="flex flex-wrap gap-3">
          {riskProfiles.map((profile) => (
            <button
              key={profile}
              onClick={() => setSelectedRisk(profile)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedRisk === profile
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-background border border-border hover:border-primary/50"
              }`}
            >
              {profile}
            </button>
          ))}
        </div>
        <p className="text-muted mt-4 text-sm">
          {selectedRisk === "Conservative" && "🛡️ You prioritize capital protection over high returns. Focus on debt instruments and fixed income."}
          {selectedRisk === "Balanced" && "⚖️ You seek a mix of growth and stability. A 60-40 equity-debt split works well for you."}
          {selectedRisk === "Aggressive" && "🚀 You can tolerate market volatility for potentially higher returns. Focus on equity and growth assets."}
        </p>
      </div>

      {/* SIP Calculator */}
      <div className="p-6 bg-card border border-border rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">📊 SIP Calculator</h3>
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="text-primary text-sm hover:underline"
          >
            {showCalculator ? "Hide" : "Show"} Calculator
          </button>
        </div>
        
        {showCalculator && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted mb-2 block">Monthly Investment (₹)</label>
                <input
                  type="number"
                  value={monthlySIP}
                  onChange={(e) => setMonthlySIP(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-muted mb-2 block">Duration (Years)</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            
            <div className="p-4 bg-background rounded-xl">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted">Invested</p>
                  <p className="text-lg font-semibold">₹{totalInvested.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Est. Returns</p>
                  <p className="text-lg font-semibold text-emerald-500">₹{estimatedReturns.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted">Total Value</p>
                  <p className="text-lg font-semibold text-primary">₹{Math.round(futureValue).toLocaleString("en-IN")}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Investment Recommendations */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recommended for {selectedRisk} Investors</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {filteredOptions.map((option, i) => (
            <div
              key={i}
              className="p-5 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs px-2 py-1 bg-background rounded-md text-muted">{option.type}</span>
                  <h4 className="font-semibold mt-2">{option.name}</h4>
                </div>
                <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                  option.risk === "Low" ? "bg-emerald-500/10 text-emerald-500" :
                  option.risk === "Medium" ? "bg-warning/10 text-warning" :
                  "bg-rose-500/10 text-rose-500"
                }`}>
                  {option.risk} Risk
                </span>
              </div>
              
              <p className="text-muted text-sm mb-4">{option.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Min: ₹{option.minAmount}</span>
                <span className="font-semibold text-primary">Returns: {option.returns}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Asset Allocation Guide */}
      <div className="p-6 bg-card border border-border rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">📈 Suggested Asset Allocation</h3>
        <div className="space-y-4">
          {selectedRisk === "Conservative" && (
            <>
              <AllocationBar label="Fixed Income (FD, Bonds, PPF)" percentage={70} color="from-emerald-500 to-teal-500" />
              <AllocationBar label="Equity (Index Funds)" percentage={20} color="from-primary to-secondary" />
              <AllocationBar label="Gold/Silver" percentage={10} color="from-amber-500 to-orange-500" />
            </>
          )}
          {selectedRisk === "Balanced" && (
            <>
              <AllocationBar label="Equity (Index Funds, Mutual Funds)" percentage={60} color="from-primary to-secondary" />
              <AllocationBar label="Fixed Income (FD, Bonds)" percentage={30} color="from-emerald-500 to-teal-500" />
              <AllocationBar label="Gold/REITs" percentage={10} color="from-amber-500 to-orange-500" />
            </>
          )}
          {selectedRisk === "Aggressive" && (
            <>
              <AllocationBar label="Equity (Stocks, Mutual Funds)" percentage={75} color="from-primary to-secondary" />
              <AllocationBar label="International/REITs" percentage={15} color="from-amber-500 to-orange-500" />
              <AllocationBar label="Fixed Income/Cash" percentage={10} color="from-emerald-500 to-teal-500" />
            </>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="p-6 bg-linear-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl">
        <h3 className="text-lg font-semibold mb-3">💡 Investment Tips</h3>
        <ul className="space-y-2 text-muted">
          <li>• Start SIP early - Compounding works best with time</li>
          <li>• Diversify across asset classes to reduce risk</li>
          <li>• Review portfolio annually and rebalance if needed</li>
          <li>• Never invest in something you don't understand</li>
          <li>• Emergency fund first, investments second</li>
        </ul>
      </div>
    </div>
  )
}

function AllocationBar({ label, percentage, color }: { label: string; percentage: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span>{label}</span>
        <span className="font-semibold">{percentage}%</span>
      </div>
      <div className="h-3 bg-border rounded-full overflow-hidden">
        <div className={`h-full bg-linear-to-r ${color} rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
