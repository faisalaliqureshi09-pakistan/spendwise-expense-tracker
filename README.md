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

- **Client-Side Authentication & Session Control**: Secure Email/Password Signup/Login operating entirely in the browser using React state and `localStorage` to ensure zero-network failures on static hosting. Includes a 1-click **Demo Account** sandbox mode.
- **Dynamic Multi-Currency Engine**: Supports PKR (Rs.), USD ($), EUR (€), GBP (£), INR (₹), AED, SAR, CAD, and AUD with live currency conversion formatting.
- **Full Transaction Lifecycle (CRUD)**: Create, view, edit, and delete transactions with instant, real-time recalculation of net worth and savings rate.
- **Localized Payment Channels & Categories**: Includes JazzCash, EasyPaisa, SadaPay, NayaPay, Raast alongside a wide array of expense categories.
- **Professional PDF Financial Statement Export**: Generates printable financial reports summarizing net balance and itemized history.
- **AI-Powered Financial Advisor**: Analyzes monthly cash flow to provide tailored budget-saving recommendations.
- **Supabase Client-Side SDK Integration**: Secure database synchronization without fragile server-side API routes.

---

## 🤖 AI Feature & System Prompt Engineering

The **AI Advisor** acts as an automated virtual financial consultant. It reviews the user's logged financial snapshot to generate short, concrete, and encouraging advice.

**System Prompt Used:**
> "You are SpendWise AI, a certified senior financial advisor and empathetic budget coach. Analyze the user's current financial snapshot and provide clear, encouraging, and highly specific financial coaching. Identify discretionary spending leaks and provide 3 actionable recommendations."

---

## 🛠️ Tools, Services, and AI Models Used

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons
- **Backend & Database**: Supabase (PostgreSQL, Realtime Client)
- **AI Model**: Google Gemini 1.5 Flash (`@google/generative-ai`)
- **Hosting**: Netlify Deployment Platform

---

## 📸 Screenshots of the App in Action

### 1. Welcome Landing Hero & Auth View
<img width="1352" height="639" alt="Landing Page" src="https://github.com/user-attachments/assets/92f76d9a-c643-4e2c-8592-2dd6c462d7dd" />
<img width="1352" height="641" alt="Auth Modal" src="https://github.com/user-attachments/assets/a85c1bff-665b-468a-a868-094a1cee02a5" />
*Clean Welcome page introducing SpendWise AI features with secure user Login/Signup modals and demo account option.*

### 2. Financial Overview Dashboard
<img width="1350" height="650" alt="Financial Dashboard" src="https://github.com/user-attachments/assets/53fdeffc-80e5-464e-93bd-11996ce8066b" />
*Interactive dashboard displaying Total Balance, Income, Expense, Savings Rate, and Multi-Currency Dropdown.*

### 3. Income vs. Expenses Trend & Category Breakdown
<img width="1352" height="643" alt="Income vs Expenses Trend" src="https://github.com/user-attachments/assets/07efbfac-68cd-4bbc-9b1b-ccaef438686c" />
<img width="1352" height="646" alt="Spending by Category" src="https://github.com/user-attachments/assets/f7b61be9-9243-486b-be7d-318a6a9dd284" />
*Visual financial trajectory charts and spending distribution breakdown by category.*

### 4. Transactions Manager & Recent Logs
<img width="1352" height="646" alt="Transactions Manager" src="https://github.com/user-attachments/assets/4780faca-adb9-4771-a381-29d1161f8a24" />
<img width="1353" height="637" alt="Recent Transactions" src="https://github.com/user-attachments/assets/bdeaddb7-d94a-4edb-a537-aa194c3e3df9" />
*Transaction management view with category filters, payment method tagging, and recent record logs.*

### 5. Monthly Budgets & Spending Caps
<img width="1352" height="646" alt="Monthly Budgets" src="https://github.com/user-attachments/assets/900418c5-2293-4a86-ac39-d8c92c5bfff8" />
*Budget tracking interface with visual progress bars monitoring monthly spending limits per category.*

### 6. AI Financial Advisor (Gemini AI Coach)
<img width="1346" height="639" alt="image" src="https://github.com/user-attachments/assets/f3a0908e-5436-46ce-a97d-e5e35f748c24" />
*AI Financial Coach providing personalized savings insights and financial health coaching based on real-time data.*

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

Follow these instructions to run SpendWise AI on your local machine:

Prerequisites

  - Node.js (v18.0.0 or higher)
  - npm or yarn or bun
  - A free Google AI Studio Gemini API Key
  - A free Supabase Account

Step-by-Step Installation Guide

1.  Clone the Repository:
```sql
    git clone https://github.com/faisalaliqureshi09-pakistan/spendwise-expense-tracker.git
    cd spendwise-expense-tracker
```
2.  Install Dependencies:
```sql
    npm install
```
3.  Configure Environment Variables: Create a .env.local file in the root
    directory:
```sql
    VITE_GEMINI_API_KEY=your_gemini_api_key_here
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
4.  Start the Development Server:
```sql
    npm run dev
```
    Open your browser and navigate to http://localhost:5173.

5.  Build for Production:
```sql
    npm run build
```
📜 License

Distributed under the MIT License. See LICENSE for more information.

