import Link from "next/link"

export default function Home() {
  const features = [
    { icon: "📊", title: "Budget Tracking", desc: "Monitor income, expenses & savings", color: "from-emerald-500 to-teal-500" },
    { icon: "📈", title: "Investment Guidance", desc: "Smart portfolio recommendations", color: "from-violet-500 to-purple-500" },
    { icon: "📚", title: "Financial Literacy", desc: "Learn money management skills", color: "from-amber-500 to-orange-500" },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border mb-6">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted">Smart Finance Management</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white via-primary to-secondary bg-clip-text text-transparent">
            Master Your Money
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-10">
            Track expenses, get AI-powered investment guidance, and build your financial literacy all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-linear-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Started →
            </Link>
            <Link
              href="/learn"
              className="px-8 py-4 bg-card border border-border text-foreground font-semibold rounded-xl hover:bg-card-hover transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div
            key={i}
            className="group p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center text-3xl mb-4 shadow-lg`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "₹10L+", label: "Tracked" },
            { value: "5K+", label: "Users" },
            { value: "50+", label: "Invest Options" },
            { value: "100+", label: "Lessons" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Ready to take control?</h2>
        <p className="text-muted mb-8 max-w-xl mx-auto">
          Join thousands of users who are already managing their finances smarter.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300"
        >
          Start Your Journey →
        </Link>
      </section>
    </div>
  )
}