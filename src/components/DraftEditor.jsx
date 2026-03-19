import React from 'react';
import { Download, Copy, Check } from 'lucide-react';
import { downloadAsPDF } from '../utils/exportPdf';

const DraftEditor = ({ content }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!content) return null;

  return (
    <div className="mt-6 border-t border-slate-100 pt-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-slate-500 uppercase">Document Output</span>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied" : "Copy Text"}
          </button>
          
          <button 
            onClick={() => downloadAsPDF(content)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all shadow-md shadow-blue-200"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 min-h-[400px]">
        <div className="prose prose-slate max-w-none">
          <pre className="whitespace-pre-wrap font-sans leading-relaxed text-slate-700">
            {content}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DraftEditor;