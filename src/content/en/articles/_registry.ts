// Registre des articles anglais. Miroir de src/content/articles/_registry.ts,
// tenu à la main : scripts/ingest-content.mjs ne génère que le français pour
// l'instant. Ajouter un article = déposer le module ici et l'ajouter au tableau.
import type { Article } from "@/lib/articles/types";
import a0 from "./why-translation-never-ranks-in-france";
import a1 from "./how-to-choose-a-french-seo-agency";
import a2 from "./get-cited-by-ai-answers-in-french";

export const registryEn: Article[] = [a0, a1, a2];
