"use client";

import { useState } from "react";

export default function ResumeDownloadButton({ name }: { name: string }) {
  const [downloading, setDownloading] = useState(false);

  const downloadPDF = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) return;

    setDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: 0.5,
        filename: `${name?.trim() || "resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error: any) {
      alert(`PDF download failed: ${error.message || "Unknown error"}`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={downloadPDF}
      disabled={downloading}
      className="px-5 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-all"
    >
      {downloading ? "Generating..." : "⬇ Download PDF"}
    </button>
  );
}