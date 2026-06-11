import { Client } from "basic-ftp";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const credentialsPath = resolve(projectRoot, ".ftp-credentials");
const outDir = resolve(projectRoot, "out");

if (!existsSync(credentialsPath)) {
  console.error("❌ .ftp-credentials introuvable. Copie .ftp-credentials.example → .ftp-credentials et remplis-le.");
  process.exit(1);
}

if (!existsSync(outDir)) {
  console.error("❌ Dossier out/ introuvable. Lance `npm run build` d'abord.");
  process.exit(1);
}

const env = Object.fromEntries(
  readFileSync(credentialsPath, "utf8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const { FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_REMOTE_DIR = "/", FTP_SECURE = "false" } = env;

if (!FTP_HOST || !FTP_USER || !FTP_PASSWORD) {
  console.error("❌ FTP_HOST, FTP_USER, FTP_PASSWORD sont requis dans .ftp-credentials");
  process.exit(1);
}

const client = new Client(30_000);
client.ftp.verbose = false;

try {
  console.log(`→ Connexion à ${FTP_HOST} (${FTP_SECURE === "true" ? "FTPS" : "FTP"})…`);
  await client.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    secure: FTP_SECURE === "true",
  });

  console.log(`→ Cible: ${FTP_REMOTE_DIR}`);
  await client.ensureDir(FTP_REMOTE_DIR);

  console.log(`→ Upload de ${outDir} …`);
  client.trackProgress((info) => {
    if (info.name) {
      process.stdout.write(`  ${info.type} ${info.name}\r`);
    }
  });

  await client.uploadFromDir(outDir, FTP_REMOTE_DIR);
  client.trackProgress();

  console.log("\n✅ Déploiement terminé.");
} catch (err) {
  console.error("\n❌ Erreur:", err.message);
  process.exitCode = 1;
} finally {
  client.close();
}
