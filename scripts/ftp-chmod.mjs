import { Client } from "basic-ftp";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, posix } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const credentialsPath = resolve(projectRoot, ".ftp-credentials");

if (!existsSync(credentialsPath)) {
  console.error("❌ .ftp-credentials introuvable.");
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

const client = new Client(30_000);
client.ftp.verbose = false;

let fileCount = 0;
let dirCount = 0;
let errCount = 0;

async function chmodAll(dir) {
  const items = await client.list(dir);
  for (const item of items) {
    const full = posix.join(dir, item.name);
    try {
      if (item.isDirectory) {
        await client.send(`SITE CHMOD 755 ${full}`);
        dirCount++;
        await chmodAll(full);
      } else if (item.isFile) {
        await client.send(`SITE CHMOD 644 ${full}`);
        fileCount++;
        if (fileCount % 20 === 0) {
          process.stdout.write(`  ${fileCount} fichiers traités…\r`);
        }
      }
    } catch (err) {
      errCount++;
      console.error(`\n  ⚠️ ${full}: ${err.message}`);
    }
  }
}

try {
  console.log(`→ Connexion à ${FTP_HOST}…`);
  await client.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    secure: FTP_SECURE === "true",
  });
  console.log("✅ Connecté.\n");

  console.log(`→ Application chmod 644 (fichiers) / 755 (dossiers) dans ${FTP_REMOTE_DIR}…`);
  await chmodAll(FTP_REMOTE_DIR);

  console.log(`\n✅ Terminé : ${fileCount} fichiers, ${dirCount} dossiers${errCount ? `, ${errCount} erreurs` : ""}.`);
} catch (err) {
  console.error("\n❌ Erreur:", err.message);
  process.exitCode = 1;
} finally {
  client.close();
}
