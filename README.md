# banking-rfp-automation-engine
React + Gemini 2.0 RAG engine to automate banking RFP responses. Handles doc parsing, context-grounded generation, and compliance checks.
---
# banking-rfp-automation-engine

A React-based RAG system for automating the Banking RFP lifecycle. Built for the Indian Bank Hackathon to solve the manual bottleneck in procurement document processing.

## The TL;DR
This engine takes unstructured RFP docs (PDFs/Text), runs them through a **Gemini 2.0 Flash** RAG pipeline, and generates context-aware, grounded responses that actually follow banking compliance rules.

## The Problem vs. The Solution
* **The Problem:** Bank RFPs take 30–45 days to draft and clarify manually, leading to vendor delays and compliance risks.
* **The SafeDraft Solution:** Automated, grounded drafting and query resolution in < 60 seconds using a specialized RAG pipeline.

## Stack
* **Frontend:** React + Vite (Fast HMR, clean build)
* **LLM:** Google Gemini 2.0 Flash SDK (Low latency, massive context window)
* **UI:** Tailwind + Lucide + Framer Motion (Clean, professional banking UI)
* **Logic:** Custom RAG implementation for document grounding.

## Project Structure
- `/src/services/gemini.js` - API integration & Prompt Logic.
- `/src/components/` - Functional UI components (Upload, Result Viewer).
- `/research/` - Original Python/Streamlit prototype (for reference).

## Setup
1. `npm install`
2. Create `.env` with `VITE_GEMINI_API_KEY`
3. `npm run dev`

## Why Gemini 2.0 Flash?
Chosen for its high-speed inference and superior performance in **grounding**—essential for preventing hallucinations in sensitive banking data.

## Prototype
Validated via initial Python/Streamlit prototype (see `/research`) before scaling to a high-fidelity React frontend.