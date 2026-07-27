import React, { useState } from "react";
import { Transaction, CATEGORIES, Currency } from "../types";
import { Plus, Search, Filter, FileText, Edit3, Trash2, ArrowUpDown } from "lucide-react";

interface TransactionsViewProps {
  userId: string;
  userName?: string;
  userEmail?: string;
  transactions: Transaction[];
  currency: Currency;
  onOpenAddModal: () => void;
  onOpenEditModal: (tx: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  userId,
  userName,
  userEmail,
  transactions,
  currency,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteTransaction,
}) => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "amount-desc" | "amount-asc">("date-desc");

  // Filtering
  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase()) ||
      (tx.notes && tx.notes.toLowerCase().includes(search.toLowerCase()));

    const matchesType = selectedType === "all" || tx.type === selectedType;
    const matchesCategory = selectedCategory === "all" || tx.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Sorting
  filtered.sort((a, b) => {
    if (sortBy === "date-desc") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === "date-asc") return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === "amount-desc") return b.amount - a.amount;
    return a.amount - b.amount;
  });

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;
    onDeleteTransaction(id);
  };

  const handleExportPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const totalIncome = filtered
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = filtered
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);
    const netBalance = totalIncome - totalExpense;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>SpendWise - Personal Financial Statement</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; padding: 40px; margin: 0; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 24px; font-weight: bold; color: #059669; display: flex; align-items: center; gap: 8px; }
            .meta { text-align: right; font-size: 13px; color: #64748b; }
            .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
            .card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; }
            .card-title { font-size: 12px; font-weight: 600; text-transform: uppercase; color: #64748b; margin-bottom: 8px; }
            .card-value { font-size: 22px; font-weight: bold; color: #0f172a; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
            th { background: #f1f5f9; text-align: left; padding: 12px; font-weight: 600; color: #475569; border-bottom: 1px solid #cbd5e1; }
            td { padding: 12px; border-bottom: 1px solid #e2e8f0; color: #334155; }
            .text-right { text-align: right; }
            .income { color: #059669; font-weight: bold; }
            .expense { color: #e11d48; font-weight: bold; }
            .footer { margin-top: 40px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">SpendWise Financial Statement</div>
              <p style="margin: 4px 0 0 0; font-size: 14px; color: #475569;">Comprehensive transaction history and cash flow report</p>
            </div>
            <div class="meta">
              <div><strong>Account:</strong> ${userName || "User"} (${userEmail || "user@spendwise.app"})</div>
              <div><strong>Currency:</strong> ${currency.name} (${currency.symbol})</div>
              <div><strong>Generated:</strong> ${new Date().toLocaleDateString()}</div>
            </div>
          </div>

          <div class="summary">
            <div class="card">
              <div class="card-title">Total Income</div>
              <div class="card-value income">+${currency.symbol}${totalIncome.toFixed(2)}</div>
            </div>
            <div class="card">
              <div class="card-title">Total Expenses</div>
              <div class="card-value expense">-${currency.symbol}${totalExpense.toFixed(2)}</div>
            </div>
            <div class="card">
              <div class="card-title">Net Balance</div>
              <div class="card-value">${currency.symbol}${netBalance.toFixed(2)}</div>
            </div>
          </div>

          <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">Transaction Records (${filtered.length})</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Payment Method</th>
                <th class="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${
                filtered.length > 0
                  ? filtered
                      .map(
                        (t) => `
                    <tr>
                      <td>${t.date}</td>
                      <td><strong>${t.description}</strong>${t.notes ? `<br/><small style="color:#64748b;">${t.notes}</small>` : ""}</td>
                      <td>${t.category}</td>
                      <td>${t.paymentMethod || "Cash"}</td>
                      <td class="text-right ${t.type === "income" ? "income" : "expense"}">
                        ${t.type === "income" ? "+" : "-"}${currency.symbol}${t.amount.toFixed(2)}
                      </td>
                    </tr>
                  `
                      )
                      .join("")
                  : `<tr><td colspan="5" style="text-align: center; color: #94a3b8; padding: 24px;">No transactions found</td></tr>`
              }
            </tbody>
          </table>

          <div class="footer">
            SpendWise Personal Finance Management • Confidential Financial Statement • Page 1 of 1
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Transactions Manager</h1>
          <p className="text-sm text-slate-500 mt-1">Create, view, edit, and delete all your income and spending logs.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportPDF}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm flex items-center space-x-2 transition-colors"
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Export PDF / Statement</span>
          </button>
          <button
            onClick={onOpenAddModal}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md shadow-emerald-600/20 text-sm flex items-center space-x-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search description or category..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900"
          />
        </div>

        {/* Type Filter */}
        <div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900"
          >
            <option value="all">All Types (Income & Expense)</option>
            <option value="income">Income Only</option>
            <option value="expense">Expenses Only</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900"
          >
            <option value="date-desc">Date: Newest First</option>
            <option value="date-asc">Date: Oldest First</option>
            <option value="amount-desc">Amount: High to Low</option>
            <option value="amount-asc">Amount: Low to High</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Payment</th>
                <th className="py-4 px-4 text-right">Amount</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.length > 0 ? (
                filtered.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                            tx.type === "income" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {tx.type === "income" ? "+" : "-"}
                        </div>
                        <div>
                          <div>{tx.description}</div>
                          {tx.notes && <div className="text-xs text-slate-400 font-normal">{tx.notes}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-500 text-xs">{tx.date}</td>
                    <td className="py-4 px-4 text-slate-500 text-xs">{tx.paymentMethod || "Cash"}</td>
                    <td
                      className={`py-4 px-4 text-right font-bold text-base ${
                        tx.type === "income" ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {tx.type === "income" ? "+" : "-"}{currency.symbol}{tx.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => onOpenEditModal(tx)}
                          title="Edit"
                          className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            onDeleteTransaction(tx.id);
                          }}
                          title="Delete"
                          className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer relative z-10 pointer-events-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                    No transactions match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
