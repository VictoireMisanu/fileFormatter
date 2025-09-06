// src/rules.js

/**
 * Applique les règles métier aux données brutes
 * @param {object} rawData
 * @returns {object} processedData
 */
export function applyRules(rawData) {
  // Pour l’instant on va simuler des mesures
  const processedTable = rawData.lines.map((line, i) => {
    const freq = 100 + i; // simulation
    const measure = Math.random() * 50 + 20;
    const limit = 60;
    const margin = limit - measure;
    const verdict = margin >= 0 ? "PASS" : "FAIL";

    return {
      section: "CISPR.AVG",
      frequency: freq.toFixed(3),
      sr: "120 kHz",
      polarization: i % 2 === 0 ? "Vertical" : "Horizontal",
      correction: 0.00,
      measure: measure.toFixed(2),
      limit: limit.toFixed(2),
      margin: margin.toFixed(2),
      verdict
    };
  });

  // Détermination verdict global
  const globalVerdict = processedTable.every(r => r.verdict === "PASS") ? "PASS" : "FAIL";

  return {
    meta: rawData.meta,
    table: processedTable,
    summary: {
      globalVerdict
    }
  };
}
