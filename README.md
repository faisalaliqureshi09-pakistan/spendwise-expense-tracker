# 💳 SpendWise AI — Intelligent Personal Finance & Expense Tracker

[![Live Application](https://img.shields.io/badge/Live_App-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://spendwise-expense-tracker-ai.netlify.app/)
[![Built with React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Backend Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![AI Powered](https://img.shields.io/badge/AI_Engine-Gemini_1.5_Flash-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> **SpendWise AI** is an intelligent, real-time personal expense manager and automated financial coach. It empowers users to effortlessly track incomes, monitor daily spending, manage multi-currency budgets, and receive personalized AI recommendations to achieve total financial clarity.

---

## 🌐 Live Deployed Application

🔗 **Clickable Public Live Link**: [https://spendwise-expense-tracker-ai.netlify.app/](https://spendwise-expense-tracker-ai.netlify.app/)

🔗 **GitHub Repository Link**: [https://github.com/faisalaliqureshi09-pakistan/spendwise-expense-tracker](https://github.com/faisalaliqureshi09-pakistan/spendwise-expense-tracker)

---

## 📌 Problem Statement & Target Audience

### The Real Problem
Managing personal finances using paper registers or static spreadsheets is tedious, error-prone, and lacks actionable financial intelligence. Existing expense management tools suffer from major drawbacks:
1. **Lack of Multi-Currency Flexibility**: Foreign currencies are often hardcoded to US Dollars ($), making them impractical for local users (e.g., Pakistani Rupees - PKR) or international travelers.
2. **Missing Localized Payment Channels**: Popular mobile wallets (e.g., JazzCash, EasyPaisa, SadaPay, NayaPay, Raast) are completely omitted from global financial apps.
3. **Absence of Actionable Financial Guidance**: Standard applications merely record raw numbers without analyzing *where* money is leaking or *how* users can improve their monthly savings rate.

### The Solution
**SpendWise AI** solves these challenges by automating transaction record-keeping, computing live net balances across major global currencies, generating 1-click printable PDF financial statements, and delivering personalized, real-time AI budget coaching powered by Large Language Models (LLMs).

### Target Audience
- **Students & Fresh Graduates**: Monitoring monthly allowances and educational expenses.
- **Freelancers & Remote Workers**: Tracking irregular income streams across multiple client channels.
- **Households & Individuals**: Auditing recurring utility bills, rent, groceries, and personal savings goals.

---

## ✨ Complete Features List

- **🔐 User Authentication & Session Control**:
  - Secure Email and Password Signup/Login flow.
  - Persistent session management with client-side fallback and Supabase backend authorization.
  - One-click **Logout** button that safely terminates sessions and redirects to the initial Welcome Landing Page.

- **🌍 Dynamic Multi-Currency Engine**:
  - Header currency dropdown supporting **PKR (Rs.)**, **USD ($)**, **EUR (€)**, **GBP (£)**, **INR (₹)**, **AED**, **SAR**, **CAD ($)**, and **AUD ($)**.
  - Dynamically updates all balance cards, transaction logs, modal forms, and reports into the selected currency in real time.

- **⚡ Full Transaction Lifecycle Management (CRUD)**:
  - **Create**: Log income and expense records with amount, date, description, category, and payment method.
  - **Read**: View structured transaction tables equipped with search bars, category dropdown filters, and date ordering.
  - **Update**: Edit existing financial entries dynamically.
  - **Delete**: Instant row deletion via the trash icon with immediate, live recalculation of Total Net Worth, Total Income, Total Expenses, and Savings Rate %.

- **🇵🇰 Comprehensive Categories & Localized Payment Channels**:
  - **Categories**: Food & Groceries, Rent & Housing, Bills & Utilities, Transport & Fuel, Education & Fees, Health & Medical, Shopping & Clothes, Entertainment & Dining, Salary, Freelance, Investments, Personal Care, Gifts & Donations, Savings, and Other.
  - **Payment Methods**: Cash, JazzCash, EasyPaisa, SadaPay, NayaPay, Raast, Bank Transfer, Credit/Debit Card, PayPal, Apple Pay, and Other.

- **📄 Professional PDF Financial Statement Export**:
  - Replaces basic CSV exports with a clean, branded, printable PDF financial report containing user metadata, balance overview cards, and itemized transaction logs.

- **🤖 AI-Powered Financial Advisor**:
  - Integrated AI budget coach that analyzes income vs. spending ratios in real time to offer tailored budget-saving tips.

- **🗄️ Supabase Realtime Database Integration & RLS Support**:
  - Cloud database synchronization featuring Row Level Security (RLS) policies and an interactive database setup modal with copyable SQL scripts.

---

## 🤖 AI Feature & System Prompt Engineering

### How the AI Feature Works
The **AI Advisor** acts as an automated virtual financial consultant. It reviews the user's logged financial snapshot (Total Monthly Income, Total Expenses, Net Remaining Balance, Savings Rate %, and Top Categories) to generate short, concrete, and encouraging advice aimed at optimizing cash flow and curbing discretionary overspending.

### AI Infrastructure
- **Model**: Google Gemini 1.5 Flash (`@google/generative-ai`)
- **Execution**: Asynchronous REST stream configured with structured system prompts.

### System Prompt Driving the AI Engine
```text
You are SpendWise AI, a certified senior financial advisor and empathetic budget coach.
Your task is to analyze the user's current financial snapshot and provide clear, encouraging, and highly specific financial coaching.

Input Data Provided:
- User Profile: {userName}
- Currency Selected: {currencySymbol}
- Total Income Logged: {totalIncome}
- Total Expense Logged: {totalExpenses}
- Net Balance Remaining: {netBalance}
- Savings Rate: {savingsRatePercentage}%
- Recent Transactions Breakdown: {transactionListJSON}

Instructions:
1. Evaluate the user's financial health based on their Savings Rate and Net Balance.
2. Identify the single largest expense category causing budget leaks.
3. Provide 3 short, concrete, actionable recommendations to reduce discretionary spending.
4. Keep the tone empathetic, professional, clear, and concise. Avoid complex financial jargon.

🛠️ Tools, Services, and AI Models Used

| Category                            | Technology / Service                                 |
| :---------------------------------- | :--------------------------------------------------- |
| **Frontend Framework**              | React 18, Vite, TypeScript                           |
| **Styling & UI Components**         | Tailwind CSS, Lucide React Icons, Framer Motion      |
| **AI Model & SDK**                  | Google Gemini 1.5 Flash (`@google/generative-ai`)    |
| **Database & Auth**                 | Supabase (PostgreSQL, Realtime Client, RLS Policies) |
| **PDF Generation Engine**           | HTML5 Printable PDF Engine                           |
| **Version Control**                 | Git & GitHub Desktop                                 |
| **Hosting & Continuous Deployment** | Netlify Deployment Platform                          |

📸 Screenshots of the App in Action

1. Welcome Landing Hero & Auth View

2. Financial Overview Dashboard & Multi-Currency Header

3. Transactions Manager & PDF Export

4. Add Transaction Modal (Categories & Local Payment Methods)

5. AI Financial Advisor Interface

🗄️ Database Setup & Supabase RLS Script

To set up the Supabase database manually, execute the following SQL script
inside the Supabase SQL Editor:

-- Create Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  description TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
  category TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable RLS for testing or create public policies
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;

-- Enable Realtime Sync
ALTER PUBLICATION supabase_realtime ADD TABLE transactions;

💻 How to Run the Project Locally

Follow these instructions to run SpendWise AI on your local machine:

Prerequisites

  - Node.js (v18.0.0 or higher)
  - npm or yarn or bun
  - A free Google AI Studio Gemini API Key
  - A free Supabase Account

Step-by-Step Installation Guide

1.  Clone the Repository:

    git clone https://github.com/faisalaliqureshi09-pakistan/spendwise-expense-tracker.git
    cd spendwise-expense-tracker

2.  Install Dependencies:

    npm install

3.  Configure Environment Variables: Create a .env.local file in the project
    root folder:

    VITE_GEMINI_API_KEY=your_gemini_api_key_here
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

4.  Start the Development Server:

    npm run dev

    Open your browser and navigate to http://localhost:5173.

5.  Build for Production:

    npm run build

📜 License

Distributed under the MIT License. See LICENSE for more information.

