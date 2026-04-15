<h1>Money Manager</h1>

<p>
A full-stack personal finance management application designed to help users track expenses, analyze spending behavior, and receive actionable financial insights.
</p>

<p>
<strong>Live Demo:</strong> 
<a href="https://money-manager-vxuh.vercel.app/" target="_blank">
https://money-manager-vxuh.vercel.app/
</a>
</p>

<hr />

<h2>Overview</h2>

<p>
Money Manager simplifies personal finance tracking while going beyond basic expense logging. The application processes user data to generate insights and provide financial guidance, enabling better decision-making.
</p>

<hr />

<h2>Features</h2>

<ul>
  <li>Add and manage transactions (income and expenses)</li>
  <li>Real-time financial dashboard</li>
  <li>Automatic calculation of income, expenses, and balance</li>
  <li>Smart spending insights based on user behavior</li>
  <li>Basic investment guidance based on savings</li>
  <li>Simple and clean user interface</li>
</ul>

<hr />

<h2>Tech Stack</h2>

<p><strong>Frontend:</strong></p>
<ul>
  <li>Next.js (App Router)</li>
  <li>React</li>
  <li>Tailwind CSS</li>
</ul>

<p><strong>Backend:</strong></p>
<ul>
  <li>Supabase (Database and API)</li>
</ul>

<p><strong>Deployment:</strong></p>
<ul>
  <li>Vercel</li>
</ul>

<hr />

<h2>Project Structure</h2>

<pre>
app/
  dashboard/     -> Dashboard page
  add/           -> Add transaction page
  page.tsx       -> Root route (redirect/landing)

lib/
  supabase.js    -> Supabase client setup

public/
  Static assets
</pre>

<hr />

<h2>How It Works</h2>

<ol>
  <li>User adds income or expense transactions</li>
  <li>Data is stored in Supabase</li>
  <li>Dashboard fetches and processes the data</li>
  <li>Application calculates income, expenses, and balance</li>
  <li>Insights and financial advice are generated dynamically</li>
</ol>

<hr />

<h2>Getting Started</h2>

<p><strong>Clone the repository:</strong></p>

<pre>
git clone https://github.com/devdattapatilll/Money-Manager.git
</pre>

<p><strong>Install dependencies:</strong></p>

<pre>
npm install
</pre>

<p><strong>Run locally:</strong></p>

<pre>
npm run dev
</pre>

<hr />

<h2>Environment Variables</h2>

<p>Create a <code>.env.local</code> file and add the following:</p>

<pre>
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
</pre>

<hr />

<h2>Deployment</h2>

<p>
This project is deployed on Vercel. Any changes pushed to the main branch automatically trigger a new deployment.
</p>

<hr />

<h2>Future Improvements</h2>

<ul>
  <li>User authentication</li>
  <li>Edit and delete transactions</li>
  <li>Category-based analytics</li>
  <li>Charts and visualizations</li>
  <li>Monthly and yearly insights</li>
</ul>

<hr />

<h2>Author</h2>

<p>
<strong>Devdatta Patil</strong>
</p>
