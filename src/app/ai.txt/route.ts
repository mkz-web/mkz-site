import { aiTxtRacine, reponseTexte } from "@/lib/ai-txt";

// ai.txt (format aitxt.ing, avec la déclaration Spawning) généré au build.
// Formats, sources et gardes : src/lib/ai-txt.ts.

export const dynamic = "force-static";

export function GET() {
  return reponseTexte(aiTxtRacine());
}
