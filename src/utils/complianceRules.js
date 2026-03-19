export const checkRFPCompliance = (text) => {
  const rules = [
    { 
      label: "EMD / Bid Security", 
      passed: /EMD|Earnest Money|Bid Security/i.test(text),
      desc: "Mandatory for Indian Public Sector Bank Tenders." 
    },
    { 
      label: "Cybersecurity Framework", 
      passed: /ISO 27001|VAPT|Cyber Security|RBI guidelines/i.test(text),
      desc: "Ensures adherence to RBI's 2024 Cybersecurity circular." 
    },
    { 
      label: "SLA / Penalty Clause", 
      passed: /SLA|Penalty|Liquidated Damages|Service Level/i.test(text),
      desc: "Necessary for service-level accountability." 
    },
    { 
      label: "Termination / Exit Policy", 
      passed: /Termination|Exit Clause|Notice Period/i.test(text),
      desc: "Critical for long-term vendor management." 
    }
  ];

  const score = Math.round((rules.filter(r => r.passed).length / rules.length) * 100);
  
  return { rules, score };
};