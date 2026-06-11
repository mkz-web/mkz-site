import { Client } from "basic-ftp";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const credentialsPath = resolve(__dirname, "..", ".ftp-credentials");

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

const client = new Client(30_000);
try {
  await client.access({
    host: env.FTP_HOST,
    user: env.FTP_USER,
    password: env.FTP_PASSWORD,
    secure: env.FTP_SECURE === "true",
  });
  await client.remove("/hello-mkz.html");
  console.log("✅ /hello-mkz.html supprimé");
} catch (err) {
  console.error("❌", err.message);
} finally {
  client.close();
}
