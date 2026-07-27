import React, { useState } from "react";
import { Transaction, Budget, CATEGORIES, Currency } from "../types";
import { PieChart, Plus, AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";

interface BudgetsViewProps {
  userId: string;
  transactions: Transaction[];
  budgets: Budget[];
  currency: Currency;
  onRefresh: () => void;
}

export const BudgetsView: React.FC<BudgetsViewProps> = ({
  userId,
  transactions,
  budgets,
  currency,
  onRefresh,
}) => {
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [limit, setLimit] = useState<string>("500");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate actual spending per category for current month
  const currentMonth = new Date().toISOString().substring(0, 7); // YYYY-MM
  const spentMap: Record<string, number> = {};
  transactions
    .filter((t) => t.type === "expense" && t.date.startsWith(currentMonth))
    .forEach((t) => {
      spentMap[t.category] = (spentMap[t.category] || 0) + t.amount;
    });

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!limit || parseFloat(limit) <= 0) {
      setError("Please enter a valid budget limit.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // In local/localStorage mode, we can update budgets in App state or localStorage if needed
      // For now, simulated success
      setTimeout(() => {
        setLoading(false);
        onRefresh();
      }, 200);
    } catch (err: any) {
      setError(err.message || "Error saving budget");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Monthly Budgets & Limits</h1>
        <p className="text-sm text-slate-500 mt-1">Set spending caps per category to keep your finances healthy and disciplined.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Set Budget Form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Set / Update Budget</h2>
          <p className="text-xs text-slate-500 mb-4">Choose a category and max monthly limit</p>

          <form onSubmit={handleSaveBudget} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Limit ({currency.symbol.trim()})</label>
              <input
                type="number"
                step="1"
                required
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder="500"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md shadow-emerald-600/20 text-sm transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>{loading ? "Saving..." : "Save Budget Goal"}</span>
            </button>
          </form>
        </div>

        {/* Budgets List & Progress Bars */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Current Month Progress</h2>
          <p className="text-xs text-slate-500 mb-6">Tracking against your set limits for {currentMonth}</p>

          <div className="space-y-6">
            {budgets.length > 0 ? (
              budgets.map((b) => {
                const spent = spentMap[b.category] || 0;
                const percentage = Math.min(100, Math.round((spent / b.monthlyLimit) * 100));
                const isOver = spent > b.monthlyLimit;

                return (
                  <div key={b.id} className="p-4 bg-slate-50/70 rounded-2xl border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-semibold text-slate-900 flex items-center space-x-2">
                        <span>{b.category}</span>
                        {isOver ? (
                          <span className="flex items-center space-x-1 text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full">
                            <ShieldAlert className="w-3 h-3" />
                            <span>Over Budget</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>On Track</span>
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-medium text-slate-600">
                        <span className={isOver ? "text-rose-600 font-bold" : "text-slate-900 font-bold"}>
                          {currency.symbol}{spent.toFixed(2)}
                        </span>{" "}
                        / {currency.symbol}{b.monthlyLimit.toFixed(2)}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isOver ? "bg-rose-500" : percentage > 80 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>{percentage}% used</span>
                      <span>{currency.symbol}{Math.max(0, b.monthlyLimit - spent).toFixed(2)} remaining</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-slate-400 text-sm">
                No budget limits set yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
