import React, { useState, useEffect } from "react";
import { User, Transaction, Budget, Currency, CURRENCIES } from "./types";
import { Navbar } from "./components/Navbar";
import { LandingHero } from "./components/LandingHero";
import { AuthModal } from "./components/AuthModal";
import { Dashboard } from "./components/Dashboard";
import { TransactionsView } from "./components/TransactionsView";
import { BudgetsView } from "./components/BudgetsView";
import { AiAdvisorView } from "./components/AiAdvisorView";
import { AddTransactionModal } from "./components/AddTransactionModal";
import { supabase } from "./lib/supabase";

const STORAGE_USER_KEY = "spendwise_user";
const STORAGE_TX_KEY = "spendwise_transactions";
const STORAGE_BUDGET_KEY = "spendwise_budgets";
const STORAGE_CURRENCY_KEY = "spendwise_currency";

const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: "tx_1",
    userId: "user_demo_1",
    type: "income",
    amount: 4500,
    category: "Salary",
    description: "Monthly Tech Salary",
    date: new Date(Date.now() - 5 * 86400000).toISOString().split("T")[0],
    paymentMethod: "Bank Transfer",
    notes: "Primary job paycheck",
  },
  {
    id: "tx_2",
    userId: "user_demo_1",
    type: "expense",
    amount: 1200,
    category: "Rent & Housing",
    description: "Apartment Rent",
    date: new Date(Date.now() - 4 * 86400000).toISOString().split("T")[0],
    paymentMethod: "Bank Transfer",
    notes: "Monthly lease payment",
  },
  {
    id: "tx_3",
    userId: "user_demo_1",
    type: "expense",
    amount: 145.50,
    category: "Food & Groceries",
    description: "Supermarket Groceries",
    date: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0],
    paymentMethod: "Credit Card",
    notes: "Weekly essentials",
  },
  {
    id: "tx_4",
    userId: "user_demo_1",
    type: "expense",
    amount: 65.00,
    category: "Entertainment",
    description: "Dinner with friends",
    date: new Date(Date.now() - 1 * 86400000).toISOString().split("T")[0],
    paymentMethod: "Apple Pay",
    notes: "Italian bistro",
  },
  {
    id: "tx_5",
    userId: "user_demo_1",
    type: "income",
    amount: 350,
    category: "Freelance",
    description: "UI Design Project",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "PayPal",
    notes: "Landing page revamp",
  },
];

const DEFAULT_BUDGETS: Budget[] = [
  { id: "bud_1", userId: "user_demo_1", category: "Food & Groceries", monthlyLimit: 500 },
  { id: "bud_2", userId: "user_demo_1", category: "Rent & Housing", monthlyLimit: 1300 },
  { id: "bud_3", userId: "user_demo_1", category: "Bills & Utilities", monthlyLimit: 250 },
  { id: "bud_4", userId: "user_demo_1", category: "Shopping", monthlyLimit: 400 },
];

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem(STORAGE_CURRENCY_KEY);
    if (saved) {
      const found = CURRENCIES.find((c) => c.code === saved);
      if (found) return found;
    }
    return CURRENCIES[0]; // USD
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const savedUser = localStorage.getItem(STORAGE_USER_KEY);
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && parsedUser.id && parsedUser.id !== "user_demo_1") {
          const userSavedTx = localStorage.getItem(`${STORAGE_TX_KEY}_${parsedUser.id}`);
          if (userSavedTx) return JSON.parse(userSavedTx);
          return []; // New user starts with empty transactions
        }
      } catch (e) {}
    }
    const saved = localStorage.getItem(STORAGE_TX_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_TRANSACTIONS;
  });

  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem(STORAGE_BUDGET_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_BUDGETS;
  });

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.id !== "user_demo_1") {
      localStorage.setItem(`${STORAGE_TX_KEY}_${user.id}`, JSON.stringify(transactions));
    } else {
      localStorage.setItem(STORAGE_TX_KEY, JSON.stringify(transactions));
    }
  }, [transactions, user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_BUDGET_KEY, JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_CURRENCY_KEY, currency.code);
  }, [currency]);

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_USER_KEY);
    setUser(null);
    setActiveTab("dashboard");
  };

  const handleGoHome = () => {
    localStorage.removeItem(STORAGE_USER_KEY);
    setUser(null);
  };

  const handleOpenAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setTransactionToEdit(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (tx: Transaction) => {
    setTransactionToEdit(tx);
    setIsAddModalOpen(true);
  };

  // Fetch transactions from Supabase & backend when user changes
  useEffect(() => {
    const currentUserId = user ? user.id : "user_demo_1";

    const syncWithSupabase = async () => {
      try {
        // 1. Ensure user exists in Supabase users table
        await supabase.from("users").upsert([
          {
            id: currentUserId,
            name: user?.name || "Alex Morgan",
            email: user?.email || "alex@example.com",
          },
        ]);

        // 2. Fetch transactions from Supabase
        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", currentUserId);

        if (!error && data && data.length > 0) {
          const mapped: Transaction[] = data.map((item: any) => ({
            id: item.id || String(item.id),
            userId: item.user_id,
            type: item.type,
            amount: Number(item.amount),
            category: item.category,
            description: item.description,
            date: item.date,
            paymentMethod: item.payment_method || "Cash",
            notes: item.notes || "",
          }));
          setTransactions(mapped);
        } else {
          // Fallback to local storage or defaults, then push existing to Supabase
          const localKey = currentUserId === "user_demo_1" ? STORAGE_TX_KEY : `${STORAGE_TX_KEY}_${currentUserId}`;
          const savedTx = localStorage.getItem(localKey);
          let initialList: Transaction[] = DEFAULT_TRANSACTIONS;
          if (savedTx) {
            try {
              initialList = JSON.parse(savedTx);
            } catch (e) {}
          }

          if (initialList.length > 0) {
            setTransactions(initialList);
            // Auto-sync initial/local transactions to Supabase table
            const rows = initialList.map((t) => ({
              id: t.id,
              user_id: currentUserId,
              type: t.type,
              amount: Number(t.amount),
              category: t.category,
              description: t.description,
              date: t.date,
              payment_method: t.paymentMethod || "Cash",
              notes: t.notes || "",
            }));
            await supabase.from("transactions").upsert(rows);
          }
        }
      } catch (err) {
        console.error("Error syncing with Supabase:", err);
      }
    };

    syncWithSupabase();

    if (user) {
      fetch(`/api/budgets?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setBudgets(data);
          }
        })
        .catch(() => {});
    }

    // Subscribe to Supabase Realtime changes
    const channel = supabase
      .channel("realtime-transactions")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "transactions" },
        async () => {
          const { data } = await supabase
            .from("transactions")
            .select("*")
            .eq("user_id", currentUserId);
          if (data) {
            const mapped: Transaction[] = data.map((item: any) => ({
              id: item.id || String(item.id),
              userId: item.user_id,
              type: item.type,
              amount: Number(item.amount),
              category: item.category,
              description: item.description,
              date: item.date,
              paymentMethod: item.payment_method || "Cash",
              notes: item.notes || "",
            }));
            setTransactions(mapped);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Delete transaction action (instant state update + localStorage + Supabase + backend API call)
  const handleDeleteTransaction = async (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    const currentUserId = user ? user.id : "user_demo_1";
    if (currentUserId === "user_demo_1") {
      localStorage.setItem(STORAGE_TX_KEY, JSON.stringify(updated));
    } else {
      localStorage.setItem(`${STORAGE_TX_KEY}_${currentUserId}`, JSON.stringify(updated));
    }
    
    // Supabase delete
    try {
      const { error } = await supabase.from("transactions").delete().eq("id", id);
      if (error) console.error("Supabase delete error:", error);
    } catch (err) {
      console.error("Delete exception:", err);
    }

    try {
      fetch(`/api/transactions/${id}?userId=${currentUserId}`, {
        method: "DELETE",
      }).catch(() => {});
    } catch (err) {}
  };

  // Save transaction (add or edit) with Supabase sync
  const handleSaveTransaction = async (txData: Omit<Transaction, "id" | "userId">) => {
    const currentUserId = user ? user.id : "user_demo_1";

    try {
      // Ensure user profile row exists in Supabase
      await supabase.from("users").upsert([
        {
          id: currentUserId,
          name: user?.name || "Alex Morgan",
          email: user?.email || "alex@example.com",
        },
      ]);
    } catch (e) {}

    if (transactionToEdit) {
      // Edit existing
      const updatedTx: Transaction = {
        ...transactionToEdit,
        ...txData,
      };

      setTransactions((prev) =>
        prev.map((t) => (t.id === transactionToEdit.id ? updatedTx : t))
      );

      // Supabase update/upsert
      try {
        const { error } = await supabase
          .from("transactions")
          .upsert([
            {
              id: transactionToEdit.id,
              user_id: currentUserId,
              type: txData.type,
              amount: Number(txData.amount),
              category: txData.category,
              description: txData.description,
              date: txData.date,
              payment_method: txData.paymentMethod || "Cash",
              notes: txData.notes || "",
            },
          ]);
        if (error) console.error("Supabase update error:", error);
      } catch (err) {
        console.error("Supabase update exception:", err);
      }

      try {
        await fetch(`/api/transactions/${transactionToEdit.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: currentUserId, ...txData }),
        });
      } catch (err) {}
    } else {
      // Add new
      const txId = "tx_" + Date.now();
      const newTx: Transaction = {
        id: txId,
        userId: currentUserId,
        ...txData,
      };

      // Update state locally
      setTransactions((prev) => [newTx, ...prev]);

      // Supabase insert/upsert
      try {
        const { error } = await supabase.from("transactions").upsert([
          {
            id: txId,
            user_id: currentUserId,
            type: txData.type,
            amount: Number(txData.amount),
            category: txData.category,
            description: txData.description,
            date: txData.date,
            payment_method: txData.paymentMethod || "Cash",
            notes: txData.notes || "",
          },
        ]);
        if (error) console.error("Supabase insert error:", error);
      } catch (err) {
        console.error("Supabase insert exception:", err);
      }

      try {
        await fetch(`/api/transactions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: txId, userId: currentUserId, ...txData }),
        });
      } catch (err) {}
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        onLogout={handleLogout}
        onGoHome={handleGoHome}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!user ? (
          <LandingHero onOpenAuth={handleOpenAuth} />
        ) : (
          <>
            {activeTab === "dashboard" && (
              <Dashboard
                transactions={transactions}
                budgets={budgets}
                currency={currency}
                onOpenAddModal={handleOpenAddModal}
                onNavigateTab={setActiveTab}
              />
            )}
            {activeTab === "transactions" && (
              <TransactionsView
                userId={user.id}
                userName={user.name}
                userEmail={user.email}
                transactions={transactions}
                currency={currency}
                onOpenAddModal={handleOpenAddModal}
                onOpenEditModal={handleOpenEditModal}
                onDeleteTransaction={handleDeleteTransaction}
              />
            )}
            {activeTab === "budgets" && (
              <BudgetsView
                userId={user.id}
                transactions={transactions}
                budgets={budgets}
                currency={currency}
                onRefresh={() => {}}
              />
            )}
            {activeTab === "ai-insights" && <AiAdvisorView userId={user.id} />}
          </>
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setActiveTab("dashboard");
        }}
      />

      {/* Add / Edit Transaction Modal */}
      {user && (
        <AddTransactionModal
          isOpen={isAddModalOpen}
          userId={user.id}
          transactionToEdit={transactionToEdit}
          currency={currency}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveTransaction}
        />
      )}
    </div>
  );
}
