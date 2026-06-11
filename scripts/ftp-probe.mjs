import { Client } from "basic-ftp";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");
const credentialsPath = resolve(projectRoot, ".ftp-credentials");

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

const { FTP_HOST, FTP_USER, FTP_PASSWORD, FTP_SECURE = "false" } = env;

const client = new Client(30_000);
client.ftp.verbose = false;

try {
  await client.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    secure: FTP_SECURE === "true",
  });

  console.log(`Initial pwd: ${await client.pwd()}\n`);

  // Try common OVH paths
  for (const path of ["/", "/www", "/www/", "/home", "/public_html", "/htdocs"]) {
    try {
      await client.cd(path);
      const cwd = await client.pwd();
      console.log(`✅ cd ${path} → pwd = ${cwd}`);
      const items = await client.list();
      const preview = items.slice(0, 10).map((i) => `${i.isDirectory ? "d" : "-"} ${i.name}`).join("\n    ");
      console.log(`   ${items.length} items${items.length ? ":\n    " + preview : ""}`);
    } catch (err) {
      console.log(`❌ cd ${path} → ${err.message}`);
    }
    console.log("");
  }

  // Also try to list top level including hidden
  await client.cd("/");
  console.log("Listing / with LIST -a :");
  try {
    const items = await client.list("-a");
    items.forEach((i) => console.log(`  ${i.isDirectory ? "d" : "-"} ${i.name}`));
  } catch (err) {
    console.log(`  ⚠️ ${err.message}`);
  }
} catch (err) {
  console.error("❌", err.message);
} finally {
  client.close();
}
