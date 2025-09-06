// src/parser.js
import fs from "fs";
import mammoth from "mammoth";

/**
 * Parse un fichier Word (.docx) et retourne du texte brut structuré
 * @param {string} filePath
 * @returns {Promise<object>}
 */
export async function parseWordFile(filePath) {
  const buffer = fs.readFileSync(filePath);

  const result = await mammoth.extractRawText({ buffer });
  const text = result.value;

  // Pour simplifier : on simule une extraction en transformant le texte brut
  // Plus tard : ajouter regex pour détecter sections, tableaux, etc.
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  // Retourne un objet brut (à enrichir ensuite)
  return {
    meta: {
      sampleId: "Sample_001", // à extraire plus tard
      operator: "Unknown",    // idem
    },
    lines
  };
}
