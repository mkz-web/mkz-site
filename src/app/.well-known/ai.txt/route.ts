import { aiTxtWellKnown, reponseTexte } from "@/lib/ai-txt";

// /.well-known/ai.txt (brouillon IETF draft-car-ai-txt-wellknown-00) généré au build.
// Formats, sources et gardes : src/lib/ai-txt.ts.

export const dynamic = "force-static";

export function GET() {
  return reponseTexte(aiTxtWellKnown());
}
