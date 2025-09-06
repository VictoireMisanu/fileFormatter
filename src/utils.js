// src/utils.js

/**
 * Nettoie une valeur (ex: remplacer virgules par points)
 */
export function normalizeNumber(value) {
  if (!value) return null;
  return parseFloat(String(value).replace(",", "."));
}
