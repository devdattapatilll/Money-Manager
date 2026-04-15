export default function Home() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">
        Smart Money Manager
      </h1>

      <p className="mb-6">
        Track your expenses, analyze spending, and get financial insights.
      </p>

      <div className="flex justify-center gap-4">
        <a href="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded">
          Go to Dashboard
        </a>

        <a href="/add" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Transaction
        </a>
      </div>
    </div>
  )
}