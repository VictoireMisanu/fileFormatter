// src/main.js
import fs from "fs";
import path from "path";
import { parseWordFile } from "./parser.js";
import { applyRules } from "./rules.js";
import { writeWord, writeCSV } from "./writer.js";

// Récupérer le fichier passé en argument
const inputFile = process.argv[2];
const outputDir = "./out";

if (!inputFile) {
  console.error("❌ Veuillez fournir un fichier Word en argument.");
  console.error("Exemple : node src/main.js monFichier.docx");
  process.exit(1);
}

// Vérifier que le fichier existe
if (!fs.existsSync(inputFile)) {
  console.error(`❌ Fichier introuvable : ${inputFile}`);
  process.exit(1);
}

async function main() {
  console.log(`🔍 Traitement de ${inputFile}...`);

  // Étape 1 : Lire et parser le fichier
  const rawData = await parseWordFile(inputFile);

  // Étape 2 : Appliquer les règles métier
  const processedData = applyRules(rawData);

  // Étape 3 : Générer les fichiers de sortie
  const baseName = path.parse(inputFile).name;
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  await writeWord(processedData, `${outputDir}/${baseName}_processed.docx`);
  await writeCSV(processedData, `${outputDir}/${baseName}_processed.csv`);

  console.log(`✅ Résultats disponibles dans ${outputDir}/`);
}

main().catch(err => console.error("❌ Erreur :", err));
