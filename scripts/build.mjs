import { cp, mkdir, readFile, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const src = path.join(root, "src");
const dist = path.join(root, "dist");

const requiredFiles = [
  "index.html",
  "privacy/index.html",
  "assets/styles.css",
  "assets/staron-symbol.png",
  "assets/favicon.png",
  "assets/favicon-192.png",
  "assets/apple-touch-icon.png",
  "assets/og-image.png",
  "assets/chartradar-home.png",
  "assets/chartradar-evidence.png",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "CNAME"
];

async function assertFile(relativePath) {
  const fullPath = path.join(dist, relativePath);
  const fileStat = await stat(fullPath).catch(() => null);
  if (!fileStat?.isFile()) {
    throw new Error(`Missing build output: ${relativePath}`);
  }
}

async function assertContains(relativePath, expected) {
  const content = await readFile(path.join(dist, relativePath), "utf8");
  if (!content.includes(expected)) {
    throw new Error(`Expected ${relativePath} to contain: ${expected}`);
  }
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(src, dist, { recursive: true });

await Promise.all(requiredFiles.map(assertFile));
await assertContains("index.html", "StarOn Labs");
await assertContains("index.html", "https://staronlabs.com");
await assertContains("index.html", "705-06-03540");
await assertContains("index.html", "support@staronlabs.com");
await assertContains("privacy/index.html", "Privacy Notice");

console.log("Build completed: dist/");
