import { Client } from "basic-ftp";
import { readFileSync, existsSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { tmpdir } from "node:os";
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
const tmp = mkdtempSync(join(tmpdir(), "ftp-smoke-"));
const localFile = join(tmp, "hello-mkz.html");
writeFileSync(localFile, "<!doctype html><h1>MKZ smoke test OK</h1>");

try {
  await client.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    secure: FTP_SECURE === "true",
  });

  console.log(`pwd = ${await client.pwd()}`);

  // Upload test file
  console.log("→ Uploading hello-mkz.html to /…");
  await client.uploadFrom(localFile, "/hello-mkz.html");
  await client.send("SITE CHMOD 644 /hello-mkz.html");
  console.log("✅ Uploaded + chmod 644");

  // Download .htaccess back to inspect what the server actually has
  const localHtaccess = join(tmp, "htaccess-from-server");
  await client.downloadTo(localHtaccess, "/.htaccess");
  const htaccessContent = readFileSync(localHtaccess, "utf8");
  console.log(`\n→ Current .htaccess on server (${htaccessContent.length} bytes):`);
  console.log("─────────────────");
  console.log(htaccessContent);
  console.log("─────────────────");

  // Verify SIZE of index.html
  try {
    const size = await client.size("/index.html");
    console.log(`\n/index.html SIZE = ${size} bytes`);
  } catch (e) {
    console.log(`\n⚠️ Cannot get SIZE of /index.html: ${e.message}`);
  }
} catch (err) {
  console.error("❌", err.message);
} finally {
  client.close();
  rmSync(tmp, { recursive: true, force: true });
}
