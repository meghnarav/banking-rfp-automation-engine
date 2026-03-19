import { jsPDF } from "jspdf";

export const downloadAsPDF = (content, title = "RFP_Draft") => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxLineWidth = pageWidth - margin * 2;

  // 1. Add Official Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("INTERNAL BANKING DOCUMENT - AUTORFP", pageWidth / 2, 20, { align: "center" });
  
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, 25, pageWidth - margin, 25);

  // 2. Add Content
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  
  // Handling long text with auto-wrapping
  const splitText = doc.splitTextToSize(content, maxLineWidth);
  doc.text(splitText, margin, 35);

  // 3. Save the file
  doc.save(`${title.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.pdf`);
};