// src/writer.js
import fs from "fs";
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, TextRun } from "docx";

/**
 * Génère un fichier Word formaté
 * @param {object} data
 * @param {string} outPath
 */
export async function writeWord(data, outPath) {
  const { meta, table, summary } = data;

  // Table header
  const headerRow = new TableRow({
    children: [
      "Section", "Frequency (MHz)", "SR", "Polarization", "Correction (dB)", "Mesure (dBµV/m)", "Limite (dBµV/m)", "Marge (dB)", "Verdict"
    ].map(h => new TableCell({ children: [new Paragraph(h)] }))
  });

  // Table body
  const bodyRows = table.map(row =>
    new TableRow({
      children: Object.values(row).map(val =>
        new TableCell({
          children: [new Paragraph(String(val))],
          width: { size: 15, type: WidthType.PERCENTAGE }
        })
      )
    })
  );

  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({ text: `Sample ID: ${meta.sampleId}`, bold: true }),
        new Paragraph({ text: `Operator: ${meta.operator}` }),
        new Paragraph({ text: "" }),
        new Table({ rows: [headerRow, ...bodyRows] }),
        new Paragraph({ text: `Verdict global: ${summary.globalVerdict}`, bold: true })
      ]
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);
}

/**
 * Génère un fichier CSV
 * @param {object} data
 * @param {string} outPath
 */
export async function writeCSV(data, outPath) {
  const { table } = data;

  const header = [
    "Section", "Frequency (MHz)", "SR", "Polarization",
    "Correction (dB)", "Mesure (dBµV/m)", "Limite (dBµV/m)",
    "Marge (dB)", "Verdict"
  ];

  const rows = table.map(r => Object.values(r).join(","));
  const csvContent = [header.join(","), ...rows].join("\n");

  fs.writeFileSync(outPath, csvContent, "utf8");
}
