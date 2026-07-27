import React, { useState } from "react";
import { Sparkles, Bot, ArrowRight, RefreshCw } from "lucide-react";
import Markdown from "react-markdown";

interface AiAdvisorViewProps {
  userId: string;
}

export const AiAdvisorView: React.FC<AiAdvisorViewProps> = ({ userId }) => {
  const [insights, setInsights] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleGenerateInsights = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate AI insights");
      }

      setInsights(data.insights);
    } catch (err: any) {
      setError(err.message || "Error communicating with AI advisor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Gemini AI Financial Coach</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">AI Financial Advisor</h1>
          <p className="text-sm text-slate-500 mt-1">Get personalized spending analysis, budgeting tips, and savings guidance.</p>
        </div>
        <button
          onClick={handleGenerateInsights}
          disabled={loading}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-600/20 text-sm flex items-center justify-center space-x-2 transition-all disabled:opacity-50 shrink-0"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Finances...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Fresh Insights</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* Insights Display Card */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
        {insights ? (
          <div className="prose prose-slate max-w-none">
            <Markdown>{insights}</Markdown>
          </div>
        ) : (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Bot className="w-8 h-8" />
            </div>
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-bold text-slate-900">Your AI Advisor is ready</h3>
              <p className="text-sm text-slate-500 mt-1">
                Click "Generate Fresh Insights" above to have Gemini analyze your income, spending habits, and budget goals securely.
              </p>
            </div>
            <button
              onClick={handleGenerateInsights}
              disabled={loading}
              className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm inline-flex items-center space-x-2 shadow-md shadow-emerald-600/20 transition-all"
            >
              <span>Analyze Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
