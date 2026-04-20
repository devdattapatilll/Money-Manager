<div align="center">
  <h1> Money Manager</h1>
  <p><b>A personal finance web application built for the Blostem Hackathon.</b></p>
  <p><i>Helping individuals in India track expenses, manage budgets, get investment guidance, and build financial literacy, all in one place.</i></p>
  
  <a href="https://money-manager-vxuh.vercel.app" target="_blank">
    <strong>View Live Demo</strong>
  </a>
</div>

<br />

##  The Problem

<p>Most personal finance tools available in India are either too generic, cluttered with irrelevant features, or don't account for India-specific investment instruments like PPF, Sovereign Gold Bonds, or SIPs in Nifty/Sensex. Money Manager is purpose-built for the Indian user — straightforward to use, locally relevant, and covering the full personal finance lifecycle from daily tracking to long-term investing.</p>

<hr />

##  Features

<h3> Budget Tracking</h3>
<ul>
  <li>Record income and expense transactions with category tagging.</li>
  <li>Set per-category monthly budget limits with real-time utilization bars.</li>
  <li>Smart alerts for over-budget and near-limit categories.</li>
  <li>Savings rate calculator with actionable spending insights.</li>
</ul>

<h3> Investment Guidance</h3>
<ul>
  <li>Risk profile selector — Conservative, Balanced, and Aggressive.</li>
  <li>Curated investment options with risk ratings and expected return ranges (FD, PPF, Index Funds, Direct Equity, SGB, REITs, Crypto).</li>
  <li>SIP calculator projecting future value at 12% annualized return.</li>
  <li>Suggested asset allocation breakdowns per risk profile.</li>
</ul>

<h3> Financial Literacy</h3>
<ul>
  <li>Bite-sized lessons across Budgeting, Investing, Insurance, and Credit.</li>
  <li>Financial glossary with plain-language definitions of 8+ key terms.</li>
  <li>Daily actionable tips and summarized money rules (50/30/20, etc.).</li>
</ul>

<hr />

##  Screenshots

<table>
  <tr>
    <td align="center"><b>Dashboard</b><br><i>Financial overview with smart insights</i></td>
    <td align="center"><b>Budget Tracker</b><br><i>Category-wise spending vs. limits</i></td>
  </tr>
  <tr>
    <td><img src="https://via.placeholder.com/600x350?text=Dashboard+Screenshot" alt="Dashboard Screenshot" width="100%"></td>
    <td><img src="https://via.placeholder.com/600x350?text=Budget+Tracker+Screenshot" alt="Budget Tracker Screenshot" width="100%"></td>
  </tr>
  <tr>
    <td align="center" colspan="2"><b>Add Transaction</b><br><i>Log income or expenses instantly</i></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img src="https://via.placeholder.com/800x400?text=Add+Transaction+Screenshot" alt="Add Transaction Screenshot" width="80%"></td>
  </tr>
</table>
<p align="center"><i>(Note: Replace the placeholder image URLs above with your actual screenshot paths)</i></p>

<hr />

##  Demo Video

<div align="center">
  <a href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID" target="_blank">
    <img src="https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg" alt="Watch the video" width="600" />
  </a>
  <p><i>The walkthrough covers: adding transactions, tracking category budgets, using the SIP calculator, exploring investment options, and navigating financial literacy content. (Click image to play)</i></p>
</div>

<hr />

##  Tech Stack

<table>
  <thead>
    <tr>
      <th>Layer</th>
      <th>Technology</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Framework</b></td>
      <td>Next.js 16 (App Router)</td>
    </tr>
    <tr>
      <td><b>Frontend</b></td>
      <td>React 19, TypeScript</td>
    </tr>
    <tr>
      <td><b>Styling</b></td>
      <td>Tailwind CSS v4</td>
    </tr>
    <tr>
      <td><b>Database</b></td>
      <td>Supabase (PostgreSQL)</td>
    </tr>
    <tr>
      <td><b>Authentication</b></td>
      <td>Supabase Auth</td>
    </tr>
    <tr>
      <td><b>Deployment</b></td>
      <td>Vercel</td>
    </tr>
  </tbody>
</table>

<hr />

##  Architecture

<pre>
┌─────────────────────────────────────────────┐
│              Next.js 16 App Router          │
│   /dashboard  /add  /budget  /invest  /learn│
└────────────────────┬────────────────────────┘
                     │
           ┌─────────▼──────────┐
           │   React Components │
           │   + Tailwind CSS v4│
           └─────────┬──────────┘
                     │
           ┌─────────▼──────────┐
           │   Supabase Client  │
           │  (Auth + PostgREST)│
           └─────────┬──────────┘
                     │
           ┌─────────▼──────────┐
           │  Supabase Backend  │
           │  PostgreSQL + Auth │
           └────────────────────┘
</pre>

<h3> Data Flow</h3>
<ol>
  <li>User authenticates via Supabase Auth (email/password).</li>
  <li>Transactions are written to and read from the <code>transactions</code> table via PostgREST.</li>
  <li>The dashboard aggregates data client-side — income, expenses, balance, category breakdowns.</li>
  <li>Smart insights and investment advice are computed dynamically based on balance thresholds.</li>
  <li>Budget limits are managed in component state with per-session persistence.</li>
</ol>

<hr />

##  Getting Started

<h3>Prerequisites</h3>
<ul>
  <li>Node.js >= 20.9.0</li>
  <li>A Supabase project (<code>supabase.com</code>)</li>
</ul>

<h3>1. Clone and install</h3>
<pre><code>git clone https://github.com/devdattapatilll/Money-Manager.git
cd Money-Manager
npm install</code></pre>

<h3>2. Configure environment variables</h3>
<pre><code>cp .env.example .env.local</code></pre>
<p>Edit <code>.env.local</code>:</p>
<pre><code>NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key</code></pre>

<h3>3. Set up the database</h3>
<p>Run the following in your Supabase SQL editor:</p>
<pre><code>create table transactions (
  id         uuid        default gen_random_uuid() primary key,
  amount     numeric     not null,
  category   text        not null,
  type       text        check (type in ('income', 'expense')) not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security (recommended)
alter table transactions enable row level security;</code></pre>

<h3>4. Run locally</h3>
<pre><code>npm run dev</code></pre>
<p>Open <a href="http://localhost:3000">http://localhost:3000</a>.</p>

<hr />

## 📂 Project Structure

<pre><code>money-manager/
├── app/
│   ├── dashboard/      # Financial overview — balance, insights, recent transactions
│   ├── add/            # Add income or expense with category tagging
│   ├── budget/         # Budget tracker with per-category limits and alerts
│   ├── invest/         # Risk profile selector, investment options, SIP calculator
│   ├── learn/          # Financial literacy lessons, glossary, tips
│   └── login/          # Authentication (sign in / sign up)
├── components/
│   └── Navigation.tsx  # Sticky top navigation
├── lib/
│   └── supabase.js     # Supabase client configuration
└── app/globals.css     # CSS design tokens — dark theme, colors, typography</code></pre>

<hr />

##  Roadmap

<ul>
  <li>[ ] Persistent budget limits stored in Supabase</li>
  <li>[ ] Transaction history with date filtering and search</li>
  <li>[ ] CSV / PDF export for reports</li>
  <li>[ ] Recurring transaction scheduling</li>
  <li>[ ] Push notifications for budget alerts</li>
  <li>[ ] Mobile app via React Native</li>
  <li>[ ] AI-powered personalized advice via LLM integration</li>
</ul>

<hr />

##  Hackathon Track

<p><b>Track:</b> Money Management — Personal Finance Dashboards, Budget Trackers, Investment Tools</p>
<p>This project directly addresses the track by delivering all three pillars: a functional budget tracker, India-specific investment guidance, and integrated financial education — deployed and publicly accessible.</p>

<hr />

## 📄  Author

<p><b>Built by:</b> Devdatta Patil: https://github.com/devdattapatilll </p>
