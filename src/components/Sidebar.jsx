import React, { useState } from 'react';
import { ShieldCheck, FileUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { checkRFPCompliance } from '../utils/complianceRules';

const Sidebar = ({ onFileUpload, contextText }) => {
  const { rules, score } = checkRFPCompliance(contextText);

  return (
    <div className="w-80 h-screen bg-white border-r border-slate-200 p-6 flex flex-col gap-8">
      {/* Branding */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-lg">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <h1 className="font-bold text-slate-800 text-xl tracking-tight">SafeDraft</h1>
      </div>

      {/* File Ingestion */}
      <div>
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
          Knowledge Memory
        </label>
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-blue-400 transition-colors cursor-pointer bg-slate-50">
          <FileUp className="mx-auto w-8 h-8 text-slate-400 mb-2" />
          <input 
            type="file" 
            className="hidden" 
            id="rfp-upload" 
            multiple 
            accept=".pdf"
            onChange={onFileUpload}
          />
          <label htmlFor="rfp-upload" className="text-sm font-semibold text-blue-600 cursor-pointer">
            Upload Past RFPs
          </label>
        </div>
      </div>

      {/* Compliance Scorecard */}
      <div className="flex-1">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
          Compliance Health
        </label>
        <div className="bg-slate-900 rounded-2xl p-6 text-white mb-6 shadow-xl shadow-blue-900/10">
          <div className="text-4xl font-bold mb-1">{score}%</div>
          <div className="text-slate-400 text-sm italic">Risk Rating: {score > 70 ? 'Low' : 'Critical'}</div>
          <div className="w-full bg-slate-700 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-1000" 
              style={{ width: `${score}%` }} 
            />
          </div>
        </div>

        {/* Detailed Checks */}
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <div key={index} className="flex items-start gap-3">
              {rule.passed ? 
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> : 
                <AlertCircle className="w-5 h-5 text-slate-300 shrink-0" />
              }
              <div>
                <p className={`text-sm font-medium ${rule.passed ? 'text-slate-700' : 'text-slate-400'}`}>
                  {rule.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;