import React from 'react';
import { FileText, MessageSquare, ClipboardList } from 'lucide-react';

const TabSystem = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'draft', label: 'Drafting', icon: FileText },
    { id: 'query', label: 'Grounded QA', icon: MessageSquare },
    { id: 'corrigendum', label: 'Corrigendum', icon: ClipboardList },
  ];

  return (
    <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit mb-8 border border-slate-200">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabSystem;