export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: string; // YYYY-MM-DD
  paymentMethod?: string;
  notes?: string;
}

export interface Budget {
  id: string;
  userId: string;
  category: string;
  monthlyLimit: number;
}

export const CATEGORIES = [
  "Food & Groceries",
  "Rent & Housing",
  "Bills & Utilities",
  "Transport & Fuel",
  "Education & Fees",
  "Health & Medical",
  "Shopping & Clothes",
  "Entertainment & Dining",
  "Salary",
  "Freelance",
  "Investments",
  "Personal Care",
  "Gifts & Donations",
  "Savings",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "USD ($)" },
  { code: "PKR", symbol: "Rs. ", name: "PKR (Rs.)" },
  { code: "EUR", symbol: "€", name: "EUR (€)" },
  { code: "GBP", symbol: "£", name: "GBP (£)" },
  { code: "INR", symbol: "₹", name: "INR (₹)" },
  { code: "AED", symbol: "AED ", name: "AED" },
  { code: "SAR", symbol: "SAR ", name: "SAR" },
  { code: "CAD", symbol: "CA$", name: "CAD" },
  { code: "AUD", symbol: "A$", name: "AUD" },
];

