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

- **User Authentication & Session Control**: Secure Email/Password Signup/Login with Supabase backend authorization and 1-click Logout.
- **Dynamic Multi-Currency Engine**: Supports PKR (Rs.), USD ($), EUR (€), GBP (£), INR (₹), AED, SAR, CAD, and AUD with live currency conversion formatting.
- **Full Transaction Lifecycle (CRUD)**: Create, view, edit, and delete transactions with instant, real-time recalculation of net worth and savings rate.
- **Localized Payment Channels & Categories**: Includes JazzCash, EasyPaisa, SadaPay, NayaPay, Raast alongside a wide array of expense categories.
- **Professional PDF Financial Statement Export**: Generates printable financial reports summarizing net balance and itemized history.
- **AI-Powered Financial Advisor**: Analyzes monthly cash flow to provide tailored budget-saving recommendations.
- **Supabase Realtime Database Integration**: Secure cloud synchronization with RLS support.

---

## 🤖 AI Feature & System Prompt Engineering

The **AI Advisor** acts as an automated virtual financial consultant. It reviews the user's logged financial snapshot to generate short, concrete, and encouraging advice.

**System Prompt Used:**
> "You are SpendWise AI, a certified senior financial advisor and empathetic budget coach. Analyze the user's current financial snapshot and provide clear, encouraging, and highly specific financial coaching. Identify discretionary spending leaks and provide 3 actionable recommendations."

---

## 🛠️ Tools, Services, and AI Models Used

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons
- **Backend & Database**: Supabase (PostgreSQL, Realtime)
- **AI Model**: Google Gemini 1.5 Flash (`@google/generative-ai`)
- **Hosting**: Netlify Deployment Platform

---

## 📸 Screenshots of the App in Action

### 1. Welcome Landing & Auth View
![Landing Page](https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80)
*Clean Welcome page introducing SpendWise AI features with secure user Login/Signup modals.*

### 2. Financial Overview Dashboard
![Dashboard View](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80)
*Interactive dashboard displaying Net Balance, Income, Expense, Savings Rate, and Multi-Currency Dropdown.*

### 3. Transactions Manager & PDF Export
![Transactions View](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80)
*Transaction management view with category filters, delete action, and PDF statement export.*

### 4. AI Financial Advisor Interface
![AI Advisor View](https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1000&q=80)
*AI Financial Coach providing personalized savings advice based on real-time spending logs.*

---

## 🗄️ Database Setup & Supabase RLS Script

Execute this SQL script inside your **Supabase SQL Editor**:

```sql
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
 ```
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
ALTER PUBLICATION supabase_realtime ADD TABLE transactions;

💻 How to Run the Project Locally

1.  Clone the Repository:

    git clone https://github.com/faisalaliqureshi09-pakistan/spendwise-expense-tracker.git
    cd spendwise-expense-tracker

2.  Install Dependencies:

    npm install

3.  Configure Environment Variables: Create a .env.local file:

    VITE_GEMINI_API_KEY=your_gemini_api_key_here
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

4.  Start Development Server:

    npm run dev

📜 License

Distributed under the MIT License.

