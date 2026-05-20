import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const rootArgumentIndex = process.argv.indexOf("--root");
const selectedRoot =
  rootArgumentIndex >= 0 ? process.argv[rootArgumentIndex + 1] : process.env.SERVE_ROOT;
const serveRoot = path.join(root, selectedRoot || "src");
const port = Number(process.env.PORT || 4173);

const mimeTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"]
]);

function resolveRequestPath(requestUrl) {
  const url = new URL(requestUrl, `http://localhost:${port}`);
  const decodedPath = decodeURIComponent(url.pathname);
  const normalizedPath = path.normalize(decodedPath).replace(/^([/\\])+/, "");
  const candidate = path.join(serveRoot, normalizedPath);

  if (!candidate.startsWith(serveRoot)) {
    return null;
  }

  return candidate;
}

async function findFile(candidate) {
  const fileStat = await stat(candidate).catch(() => null);
  if (fileStat?.isFile()) {
    return candidate;
  }

  if (fileStat?.isDirectory()) {
    const indexPath = path.join(candidate, "index.html");
    const indexStat = await stat(indexPath).catch(() => null);
    if (indexStat?.isFile()) {
      return indexPath;
    }
  }

  const htmlPath = `${candidate}.html`;
  const htmlStat = await stat(htmlPath).catch(() => null);
  if (htmlStat?.isFile()) {
    return htmlPath;
  }

  return null;
}

const server = createServer(async (req, res) => {
  try {
    const candidate = resolveRequestPath(req.url || "/");
    const filePath = candidate ? await findFile(candidate) : null;

    if (!filePath) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    const extension = path.extname(filePath);
    const contentType = mimeTypes.get(extension) || "application/octet-stream";
    res.writeHead(200, { "content-type": contentType });
    res.end(await readFile(filePath));
  } catch (error) {
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end(error instanceof Error ? error.message : "Server error");
  }
});

server.listen(port, () => {
  console.log(`Serving ${serveRoot}`);
  console.log(`Local URL: http://localhost:${port}`);
});
