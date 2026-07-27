import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API key fallback
if (!process.env.GEMINI_API_KEY) {
  process.env.GEMINI_API_KEY = "AQ.Ab8RN6Lx7vk0sZQtCOdpWou15Ku8_R-hgZBKBsGxdJYCfMRjXg";
}

const app = express();
const PORT = 3000;


app.use(express.json());

// Simple file-based database for persistence
const DB_FILE = path.join(process.cwd(), "server-db.json");

interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // simple demo hash or stored plain text for prototype simplicity
  createdAt: string;
}

interface Transaction {
  id: string;
  userId: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
  paymentMethod?: string;
  notes?: string;
}

interface Budget {
  id: string;
  userId: string;
  category: string;
  monthlyLimit: number;
}

interface DatabaseSchema {
  users: User[];
  transactions: Transaction[];
  budgets: Budget[];
}

function readDb(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading DB:", e);
  }
  return { users: [], transactions: [], budgets: [] };
}

function writeDb(db: DatabaseSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing DB:", e);
  }
}

// Initialize seed data if empty
const initialDb = readDb();
if (initialDb.users.length === 0) {
  const demoUser: User = {
    id: "user_demo_1",
    name: "Alex Morgan",
    email: "alex@example.com",
    passwordHash: "password123",
    createdAt: new Date().toISOString(),
  };
  initialDb.users.push(demoUser);

  const demoTransactions: Transaction[] = [
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
      category: "Rent",
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
      category: "Groceries",
      description: "Whole Foods Market",
      date: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0],
      paymentMethod: "Credit Card",
      notes: "Weekly groceries",
    },
    {
      id: "tx_4",
      userId: "user_demo_1",
      type: "expense",
      amount: 65.00,
      category: "Dining",
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
  initialDb.transactions.push(...demoTransactions);

  const demoBudgets: Budget[] = [
    { id: "bud_1", userId: "user_demo_1", category: "Groceries", monthlyLimit: 500 },
    { id: "bud_2", userId: "user_demo_1", category: "Dining", monthlyLimit: 300 },
    { id: "bud_3", userId: "user_demo_1", category: "Rent", monthlyLimit: 1300 },
    { id: "bud_4", userId: "user_demo_1", category: "Shopping", monthlyLimit: 400 },
  ];
  initialDb.budgets.push(...demoBudgets);

  writeDb(initialDb);
}

// --- API ROUTES ---

// Auth: Signup
app.post("/api/auth/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  const db = readDb();
  const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: "Email is already registered." });
  }

  const newUser: User = {
    id: "user_" + Math.random().toString(36).substring(2, 9),
    name,
    email: email.toLowerCase(),
    passwordHash: password, // In production, hash this with bcrypt
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);
  writeDb(db);

  const { passwordHash, ...safeUser } = newUser;
  res.json({ user: safeUser });
});

// Auth: Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const db = readDb();
  const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.passwordHash !== password) {
    return res.status(400).json({ error: "Invalid email or password." });
  }

  const { passwordHash, ...safeUser } = user;
  res.json({ user: safeUser });
});

// Transactions: Get by userId
app.get("/api/transactions", (req, res) => {
  const userId = req.query.userId as string;
  if (!userId) {
    return res.status(400).json({ error: "userId query parameter is required." });
  }

  const db = readDb();
  const userTransactions = db.transactions.filter((t) => t.userId === userId);
  // Sort descending by date
  userTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  res.json(userTransactions);
});

// Transactions: Create
app.post("/api/transactions", (req, res) => {
  const { id, userId, type, amount, category, description, date, paymentMethod, notes } = req.body;
  if (!userId || !type || amount === undefined || !category || !description || !date) {
    return res.status(400).json({ error: "Missing required transaction fields." });
  }

  const db = readDb();
  const newTx: Transaction = {
    id: id || ("tx_" + Math.random().toString(36).substring(2, 9)),
    userId,
    type,
    amount: Number(amount),
    category,
    description,
    date,
    paymentMethod: paymentMethod || "Cash",
    notes: notes || "",
  };

  db.transactions.push(newTx);
  writeDb(db);
  res.json(newTx);
});

// Transactions: Update
app.put("/api/transactions/:id", (req, res) => {
  const { id } = req.params;
  const { userId, type, amount, category, description, date, paymentMethod, notes } = req.body;

  const db = readDb();
  const index = db.transactions.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Transaction not found." });
  }

  if (userId && db.transactions[index].userId !== userId) {
    return res.status(403).json({ error: "Unauthorized." });
  }

  const updated: Transaction = {
    ...db.transactions[index],
    type: type !== undefined ? type : db.transactions[index].type,
    amount: amount !== undefined ? Number(amount) : db.transactions[index].amount,
    category: category !== undefined ? category : db.transactions[index].category,
    description: description !== undefined ? description : db.transactions[index].description,
    date: date !== undefined ? date : db.transactions[index].date,
    paymentMethod: paymentMethod !== undefined ? paymentMethod : db.transactions[index].paymentMethod,
    notes: notes !== undefined ? notes : db.transactions[index].notes,
  };

  db.transactions[index] = updated;
  writeDb(db);
  res.json(updated);
});

// Transactions: Delete
app.delete("/api/transactions/:id", (req, res) => {
  const { id } = req.params;
  const userId = req.query.userId as string;

  const db = readDb();
  const index = db.transactions.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Transaction not found." });
  }

  if (userId && db.transactions[index].userId !== userId) {
    return res.status(403).json({ error: "Unauthorized." });
  }

  db.transactions.splice(index, 1);
  writeDb(db);
  res.json({ success: true });
});

// Budgets: Get
app.get("/api/budgets", (req, res) => {
  const userId = req.query.userId as string;
  if (!userId) {
    return res.status(400).json({ error: "userId required" });
  }
  const db = readDb();
  const userBudgets = db.budgets.filter((b) => b.userId === userId);
  res.json(userBudgets);
});

// Budgets: Upsert / Create
app.post("/api/budgets", (req, res) => {
  const { userId, category, monthlyLimit } = req.body;
  if (!userId || !category || monthlyLimit === undefined) {
    return res.status(400).json({ error: "Missing required budget fields." });
  }

  const db = readDb();
  const existingIndex = db.budgets.findIndex((b) => b.userId === userId && b.category === category);

  let budget: Budget;
  if (existingIndex !== -1) {
    db.budgets[existingIndex].monthlyLimit = Number(monthlyLimit);
    budget = db.budgets[existingIndex];
  } else {
    budget = {
      id: "bud_" + Math.random().toString(36).substring(2, 9),
      userId,
      category,
      monthlyLimit: Number(monthlyLimit),
    };
    db.budgets.push(budget);
  }

  writeDb(db);
  res.json(budget);
});

// AI Insights using Gemini SDK
app.post("/api/ai-insights", async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "userId required" });
  }

  const db = readDb();
  const userTxs = db.transactions.filter((t) => t.userId === userId);
  const userBudgets = db.budgets.filter((b) => b.userId === userId);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Gemini API key not configured on server." });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Summarize financial data for prompt
    const totalIncome = userTxs.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const totalExpense = userTxs.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    const netSavings = totalIncome - totalExpense;

    const categoryTotals: Record<string, number> = {};
    userTxs.filter(t => t.type === 'expense').forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    const prompt = `Act as an expert personal financial advisor and budgeting coach. Analyze the following user financial summary and provide 3-4 constructive, practical, and encouraging insights with actionable tips to optimize spending and boost savings.

Financial Summary:
- Total Income: $${totalIncome.toFixed(2)}
- Total Expenses: $${totalExpense.toFixed(2)}
- Net Savings: $${netSavings.toFixed(2)}
- Expenses by Category: ${JSON.stringify(categoryTotals)}
- Budgets: ${JSON.stringify(userBudgets)}

Format your response in clean markdown with clear headings, actionable advice, and an encouraging tone.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ insights: response.text });
  } catch (error: any) {
    console.error("AI Insights error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI financial insights." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
