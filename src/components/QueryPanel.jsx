import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

const QueryPanel = ({ onQuery, loading }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;
    onQuery(query);
    setQuery("");
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        <div className="flex gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100">
          <Bot className="w-5 h-5 text-blue-600 shrink-0" />
          <p className="text-sm text-blue-800">
            I am grounded in your uploaded RFPs. Ask me about penalty clauses, EMD amounts, or technical specs.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-200 flex gap-2">
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about the tenders..."
          className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button 
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default QueryPanel;