// Typographie française posée à l'affichage, sur de la PROSE seulement (jamais sur une adresse,
// une valeur technique ou un attribut) : insécable avant la ponctuation haute et dans les
// guillemets, apostrophe typographique entre deux lettres, points de suspension en un caractère.
// L'insécable n'est posée que si la ponctuation est précédée d'une espace ET suivie d'une espace
// ou de la fin : le deux-points d'une adresse ou d'une heure n'est donc jamais touché.
// Les mots ne changent pas. Le texte source reste écrit avec des espaces ordinaires.

const INSECABLE = String.fromCharCode(160);

export function typoFr(texte: string): string {
  return texte
    .replace(/\.\.\./g, "…")
    .replace(/(\p{L})'(?=\p{L})/gu, "$1’")
    .replace(/ ([?!;:])(?= |$)/g, INSECABLE + "$1")
    .replace(/« /g, "«" + INSECABLE)
    .replace(/ »/g, INSECABLE + "»");
}
