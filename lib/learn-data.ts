export interface Lesson {
  title: string
  readTime: string
  level: "Beginner" | "Intermediate" | "Advanced"
  url: string
  description: string
}

export interface Category {
  title: string
  icon: string
  lessons: Lesson[]
}

export const lessonCategories: Category[] = [
  {
    title: "Budgeting Basics",
    icon: "budget",
    lessons: [
      {
        title: "50-30-20 Rule",
        readTime: "3 min",
        level: "Beginner",
        url: "https://www.investopedia.com/terms/1/50-30-20-rule.asp",
        description: "Learn the classic budgeting framework for allocating your income."
      },
      {
        title: "Emergency Fund Guide",
        readTime: "4 min",
        level: "Beginner",
        url: "https://www.investor.gov/financial-tools-calculators/calculators/emergency-fund-calculator",
        description: "Understand why and how much to save for emergencies."
      },
      {
        title: "Tracking Expenses",
        readTime: "3 min",
        level: "Beginner",
        url: "https://www.consumerfinance.gov/consumer-tools/money-as-you-grow/adult-financial-wellbeing/",
        description: "Tools and strategies for monitoring your spending habits."
      },
      {
        title: "Zero-Based Budgeting",
        readTime: "5 min",
        level: "Intermediate",
        url: "https://www.investopedia.com/terms/z/zbb.asp",
        description: "Give every rupee a job with this detailed budgeting method."
      },
    ]
  },
  {
    title: "Investing Fundamentals",
    icon: "invest",
    lessons: [
      {
        title: "Power of Compounding",
        readTime: "4 min",
        level: "Beginner",
        url: "https://www.investor.gov/introduction-investing/basics/investment-products/mutual-funds",
        description: "Discover how compound interest grows your wealth over time."
      },
      {
        title: "SIP vs Lump Sum",
        readTime: "5 min",
        level: "Intermediate",
        url: "https://www.amfiindia.com/investor-corner/knowledge-center/sip.html",
        description: "Compare systematic investing vs one-time investments."
      },
      {
        title: "Index Funds Explained",
        readTime: "6 min",
        level: "Intermediate",
        url: "https://investor.vanguard.com/investor-resources-education/index-funds",
        description: "Why index funds are a cornerstone of passive investing."
      },
      {
        title: "Asset Allocation",
        readTime: "7 min",
        level: "Advanced",
        url: "https://www.investopedia.com/terms/a/assetallocation.asp",
        description: "Build a balanced portfolio across different asset classes."
      },
    ]
  },
  {
    title: "Financial Protection",
    icon: "shield",
    lessons: [
      {
        title: "Insurance Basics",
        readTime: "4 min",
        level: "Beginner",
        url: "https://www.investopedia.com/terms/i/insurance.asp",
        description: "Essential insurance types every individual should consider."
      },
      {
        title: "Health Insurance Guide",
        readTime: "5 min",
        level: "Beginner",
        url: "https://www.consumerfinance.gov/consumer-tools/health-insurance/",
        description: "Navigate health insurance options and coverage decisions."
      },
      {
        title: "Life Insurance Types",
        readTime: "6 min",
        level: "Intermediate",
        url: "https://www.investopedia.com/terms/l/lifeinsurance.asp",
        description: "Compare term, whole, and universal life insurance options."
      },
      {
        title: "Estate Planning",
        readTime: "8 min",
        level: "Advanced",
        url: "https://www.investopedia.com/terms/e/estateplanning.asp",
        description: "Plan for transferring your assets to future generations."
      },
    ]
  },
  {
    title: "Credit & Debt",
    icon: "credit",
    lessons: [
      {
        title: "Credit Score Basics",
        readTime: "3 min",
        level: "Beginner",
        url: "https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/",
        description: "Understanding how credit scores work and why they matter."
      },
      {
        title: "Managing Credit Cards",
        readTime: "4 min",
        level: "Beginner",
        url: "https://www.consumerfinance.gov/consumer-tools/credit-cards/",
        description: "Best practices for responsible credit card usage."
      },
      {
        title: "Debt Repayment Strategies",
        readTime: "6 min",
        level: "Intermediate",
        url: "https://www.investopedia.com/terms/d/debt-management.asp",
        description: "Avalanche vs snowball methods for paying off debt."
      },
      {
        title: "Good Debt vs Bad Debt",
        readTime: "5 min",
        level: "Intermediate",
        url: "https://www.investopedia.com/articles/personal-finance/121814/good-debt-vs-bad-debt.asp",
        description: "Not all debt is harmful - learn the difference."
      },
    ]
  }
]

export const glossary = [
  { term: "SIP", definition: "Systematic Investment Plan - Regular fixed investment in mutual funds" },
  { term: "NAV", definition: "Net Asset Value - Per unit price of a mutual fund" },
  { term: "P/E Ratio", definition: "Price to Earnings - Valuation metric comparing price to earnings per share" },
  { term: "Asset Allocation", definition: "Distribution of investments across different asset classes" },
  { term: "Diversification", definition: "Spreading investments to reduce risk" },
  { term: "Liquidity", definition: "Ease of converting an asset to cash without significant loss" },
  { term: "Inflation", definition: "Rate at which prices rise over time, reducing purchasing power" },
  { term: "Compound Interest", definition: "Interest earned on both principal and accumulated interest" },
]

export const tips = [
  "Save at least 20% of your income before spending",
  "Build an emergency fund covering 6 months of expenses",
  "Start investing as early as possible",
  "Review your financial goals every quarter",
  "Avoid lifestyle inflation when income increases",
  "Pay off high-interest debt before investing",
  "Diversify your investments across asset classes",
  "Keep insurance separate from investments",
]

export const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner":
      return "bg-emerald-500/10 text-emerald-500"
    case "Intermediate":
      return "bg-[#BFD8F2]/10 text-[#BFD8F2]"
    case "Advanced":
      return "bg-rose-500/10 text-rose-500"
    default:
      return "bg-[#BFD8F2]/10 text-[#BFD8F2]"
  }
}
