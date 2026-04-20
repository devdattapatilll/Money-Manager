export default function LearnPage() {
  const categories = [
    {
      title: "💰 Budgeting Basics",
      lessons: [
        { title: "50-30-20 Rule", readTime: "3 min", level: "Beginner" },
        { title: "Emergency Fund Guide", readTime: "4 min", level: "Beginner" },
        { title: "Tracking Expenses", readTime: "3 min", level: "Beginner" },
        { title: "Zero-Based Budgeting", readTime: "5 min", level: "Intermediate" },
      ]
    },
    {
      title: "📈 Investing Fundamentals",
      lessons: [
        { title: "Power of Compounding", readTime: "4 min", level: "Beginner" },
        { title: "SIP vs Lump Sum", readTime: "5 min", level: "Intermediate" },
        { title: "Index Funds Explained", readTime: "6 min", level: "Intermediate" },
        { title: "Asset Allocation", readTime: "7 min", level: "Advanced" },
      ]
    },
    {
      title: "🛡️ Financial Protection",
      lessons: [
        { title: "Insurance Basics", readTime: "4 min", level: "Beginner" },
        { title: "Health Insurance Guide", readTime: "5 min", level: "Beginner" },
        { title: "Life Insurance Types", readTime: "6 min", level: "Intermediate" },
        { title: "Estate Planning", readTime: "8 min", level: "Advanced" },
      ]
    },
    {
      title: "💳 Credit & Debt",
      lessons: [
        { title: "Credit Score Basics", readTime: "3 min", level: "Beginner" },
        { title: "Managing Credit Cards", readTime: "4 min", level: "Beginner" },
        { title: "Debt Repayment Strategies", readTime: "6 min", level: "Intermediate" },
        { title: "Good Debt vs Bad Debt", readTime: "5 min", level: "Intermediate" },
      ]
    }
  ]

  const glossary = [
    { term: "SIP", definition: "Systematic Investment Plan - Regular fixed investment in mutual funds" },
    { term: "NAV", definition: "Net Asset Value - Per unit price of a mutual fund" },
    { term: "P/E Ratio", definition: "Price to Earnings - Valuation metric comparing price to earnings per share" },
    { term: "Asset Allocation", definition: "Distribution of investments across different asset classes" },
    { term: "Diversification", definition: "Spreading investments to reduce risk" },
    { term: "Liquidity", definition: "Ease of converting an asset to cash without significant loss" },
    { term: "Inflation", definition: "Rate at which prices rise over time, reducing purchasing power" },
    { term: "Compound Interest", definition: "Interest earned on both principal and accumulated interest" },
  ]

  const tips = [
    "Save at least 20% of your income before spending",
    "Build an emergency fund covering 6 months of expenses",
    "Start investing as early as possible",
    "Review your financial goals every quarter",
    "Avoid lifestyle inflation when income increases",
    "Pay off high-interest debt before investing",
    "Diversify your investments across asset classes",
    "Keep insurance separate from investments",
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">📚 Financial Literacy</h1>
        <p className="text-muted mt-1">Master money management with bite-sized lessons</p>
      </div>

      {/* Daily Tip */}
      <div className="p-6 bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-2xl">
            💡
          </div>
          <div>
            <h3 className="font-semibold text-amber-500 mb-1">Daily Financial Tip</h3>
            <p className="text-foreground">Pay yourself first - Automate your savings and investments before spending on wants.</p>
          </div>
        </div>
      </div>

      {/* Lesson Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((category, i) => (
          <div key={i} className="p-6 bg-card border border-border rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">{category.title}</h3>
            <div className="space-y-3">
              {category.lessons.map((lesson, j) => (
                <div
                  key={j}
                  className="flex items-center justify-between p-3 bg-background rounded-xl hover:bg-card-hover transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm">
                      📖
                    </div>
                    <div>
                      <p className="font-medium text-sm group-hover:text-primary transition-colors">{lesson.title}</p>
                      <span className="text-xs text-muted">{lesson.readTime} read</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    lesson.level === "Beginner" ? "bg-emerald-500/10 text-emerald-500" :
                    lesson.level === "Intermediate" ? "bg-warning/10 text-warning" :
                    "bg-rose-500/10 text-rose-500"
                  }`}>
                    {lesson.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Glossary Section */}
      <div className="p-6 bg-card border border-border rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">📖 Financial Glossary</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {glossary.map((item, i) => (
            <div key={i} className="p-4 bg-background rounded-xl">
              <h4 className="font-semibold text-primary mb-1">{item.term}</h4>
              <p className="text-sm text-muted">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips Grid */}
      <div className="p-6 bg-card border border-border rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">⚡ Quick Financial Rules</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-background rounded-xl">
              <span className="text-primary mt-0.5">✓</span>
              <span className="text-sm">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz CTA */}
      <div className="p-8 bg-linear-to-r from-primary to-secondary rounded-2xl text-center">
        <div className="text-4xl mb-3">🎯</div>
        <h3 className="text-xl font-bold text-white mb-2">Test Your Knowledge</h3>
        <p className="text-white/80 mb-6">Take our financial literacy quiz and see where you stand</p>
        <button className="px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors">
          Start Quiz →
        </button>
      </div>
    </div>
  )
}
