import React from "react";
import { ShieldCheck, TrendingUp, Sparkles, ArrowRight, Wallet, PieChart, Lock, CheckCircle2 } from "lucide-react";

interface LandingHeroProps {
  onOpenAuth: (mode: "login" | "signup") => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onOpenAuth }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-emerald-50/50 via-white to-slate-50/50 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-emerald-100/70 text-emerald-800 rounded-full text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Smart Personal Finance & Expense Tracker</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              Take Control of Your Wealth with <span className="text-emerald-600">Absolute Clarity</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
              Effortlessly log income and expenses, monitor monthly budgets, analyze visual spending patterns, and get AI-powered financial coaching securely in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => onOpenAuth("signup")}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenAuth("login")}
                className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center transition-all"
              >
                Sign In to Account
              </button>
            </div>

            <div className="pt-4 grid grid-cols-3 gap-6 border-t border-slate-200/80">
              <div>
                <div className="text-2xl font-bold text-slate-900">100%</div>
                <div className="text-xs text-slate-500 font-medium">Secure Storage</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">AI-Powered</div>
                <div className="text-xs text-slate-500 font-medium">Financial Insights</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">Real-Time</div>
                <div className="text-xs text-slate-500 font-medium">Expense Analytics</div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Preview */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-slate-200/60 border border-slate-200/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs text-slate-500 font-medium">Total Balance</div>
                  <div className="text-2xl font-bold text-slate-900">$12,450.00</div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                  +14.2% this month
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                      💼
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Monthly Salary</div>
                      <div className="text-xs text-slate-500">Today, 9:00 AM</div>
                    </div>
                  </div>
                  <span className="text-emerald-600 font-bold text-sm">+$4,500.00</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                      🏠
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Apartment Rent</div>
                      <div className="text-xs text-slate-500">Yesterday</div>
                    </div>
                  </div>
                  <span className="text-rose-600 font-bold text-sm">-$1,200.00</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                      🛒
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Groceries Market</div>
                      <div className="text-xs text-slate-500">Jul 24</div>
                    </div>
                  </div>
                  <span className="text-rose-600 font-bold text-sm">-$145.50</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-xs text-emerald-900 font-medium">
                  "Your dining expenses are 15% lower than last month. Great job sticking to your budget!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="mt-28 pt-16 border-t border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Everything you need to master your money</h2>
            <p className="text-slate-600 mt-3">Designed for speed, security, and intuitive daily expense tracking.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Income & Expense Logs</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Quickly add, edit, categorize, and filter your transactions with rich notes and payment method tagging.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <PieChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Budget Goals & Analytics</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Set monthly category limits and monitor your spending trajectory with interactive charts and alerts.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Secure Email Authentication</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Your personal financial data is securely tied to your email account with robust session management and instant logout.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="mt-24 pt-16 border-t border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">How SpendWise Works</h2>
            <p className="text-slate-600 mt-3">Three simple steps to financial clarity and peace of mind.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Create Your Account</h3>
              <p className="text-slate-sm text-slate-600 text-sm leading-relaxed">
                Sign up in seconds with your email and secure password to protect your financial records.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Log Income & Expenses</h3>
              <p className="text-slate-sm text-slate-600 text-sm leading-relaxed">
                Record transactions instantly, categorize spending, and assign monthly budget goals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mx-auto text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Get AI Insights</h3>
              <p className="text-slate-sm text-slate-600 text-sm leading-relaxed">
                Leverage Gemini AI advisor to receive customized advice on optimizing savings.
              </p>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div id="security" className="mt-24 pt-16 border-t border-slate-200/80 mb-12">
          <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-800/50 rounded-full blur-2xl pointer-events-none" />
            <div className="max-w-2xl relative z-10 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-emerald-800 text-emerald-200 rounded-full text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Bank-Grade Data Protection</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Your Financial Privacy is Our Highest Priority</h2>
              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                All records are securely encrypted and stored with strict user isolation. You control your data completely with instant logout and session security.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onOpenAuth("signup")}
                  className="px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-900 font-semibold rounded-2xl shadow-md text-sm transition-all"
                >
                  Create Secure Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} SpendWise Personal Expense Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};
