import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { generateRFPContent } from './services/gemini';
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

function App() {
  const [contextText, setContextText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // High-Performance PDF Parsing Logic
  const handleFileUpload = async (event) => {
    const files = event.target.files;
    let combinedText = "";

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        combinedText += textContent.items.map(item => item.str).join(" ");
      }
    }
    setContextText(combinedText);
  };

  const handleAction = async (type, input) => {
    setLoading(true);
    try {
      const result = await generateRFPContent(input, contextText);
      setOutput(result);
    } catch (error) {
      alert("Error generating content. Check API Key.");
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar onFileUpload={handleFileUpload} contextText={contextText} />
      
      <main className="flex-1 flex flex-col p-8 overflow-hidden">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Procurement Workbench</h2>
          <p className="text-slate-500">Drafting and analysis grounded in historical banking data.</p>
        </header>

        {/* Tab System & Workspace */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
           {/* Tab Logic and Display components go here */}
           <div className="p-8 overflow-y-auto">
              {loading ? (
                <div className="animate-pulse text-blue-600 font-medium">Analysing Document Context...</div>
              ) : (
                <div className="prose max-w-none">
                   <pre className="whitespace-pre-wrap font-sans text-slate-700">
                    {output || "Upload an RFP and ask a question to begin."}
                   </pre>
                </div>
              )}
           </div>
        </div>
      </main>
    </div>
  );
}

export default App;