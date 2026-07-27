import React, { useState } from "react";
import { User } from "../types";
import { X, Mail, Lock, User as UserIcon, ArrowRight, Wallet, Sparkles } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  initialMode: "login" | "signup";
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();
      const cleanName = name.trim();

      if (!cleanEmail || !cleanPassword || (mode === "signup" && !cleanName)) {
        throw new Error("Please fill in all required fields.");
      }

      if (cleanPassword.length < 3) {
        throw new Error("Password must be at least 3 characters.");
      }

      const USERS_REGISTRY_KEY = "spendwise_registered_users";
      let existingUsers: (User & { password?: string })[] = [];
      try {
        const stored = localStorage.getItem(USERS_REGISTRY_KEY);
        if (stored) {
          existingUsers = JSON.parse(stored);
        }
      } catch (err) {
        existingUsers = [];
      }

      let loggedInUser: User;

      if (mode === "signup") {
        const existing = existingUsers.find(
          (u) => u.email.toLowerCase() === cleanEmail
        );

        if (existing) {
          throw new Error("An account with this email already exists. Please Sign In.");
        }

        const newUser = {
          id: "user_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
          name: cleanName,
          email: cleanEmail,
          password: cleanPassword,
          createdAt: new Date().toISOString(),
        };

        existingUsers.push(newUser);
        localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(existingUsers));

        loggedInUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
        };
      } else {
        // Sign In Mode
        const found = existingUsers.find(
          (u) => u.email.toLowerCase() === cleanEmail
        );

        if (found) {
          if (found.password && found.password !== cleanPassword) {
            throw new Error("Incorrect password. Please try again.");
          }
          loggedInUser = {
            id: found.id,
            name: found.name,
            email: found.email,
            createdAt: found.createdAt,
          };
        } else {
          // Create new user record for first-time sign-in
          const derivedName = cleanEmail.split("@")[0] || "User";
          const formattedName =
            derivedName.charAt(0).toUpperCase() + derivedName.slice(1);

          const newUser = {
            id: "user_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
            name: formattedName,
            email: cleanEmail,
            password: cleanPassword,
            createdAt: new Date().toISOString(),
          };

          existingUsers.push(newUser);
          localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(existingUsers));

          loggedInUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt,
          };
        }
      }

      onLoginSuccess(loggedInUser);
      onClose();
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demoUser: User = {
      id: "user_demo_1",
      name: "Alex Morgan",
      email: "alex@example.com",
      createdAt: new Date().toISOString(),
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200/80 overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-8 pb-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-4 shadow-md shadow-emerald-600/20">
            <Wallet className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {mode === "login" ? "Welcome Back to SpendWise" : "Create Your Free Account"}
          </h2>
          <p className="text-sm text-slate-500 mt-1.5">
            {mode === "login"
              ? "Enter your credentials to access your financial dashboard"
              : "Start tracking your income and budgeting smarter today"}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl mt-6">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === "login" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError("");
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === "signup" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Email Sign Up
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-slate-900"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-slate-900"
              />
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-600/20 text-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{loading ? "Processing..." : mode === "login" ? "Sign In to Dashboard" : "Create Account & Get Started"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-xs text-slate-400 font-medium">or</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl text-sm transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Try Demo Account (with Sample Data)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
