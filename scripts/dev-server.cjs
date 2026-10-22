// Servidor estático local, sem dependências e sem uso em produção.
const http = require("node:http");
const { readFile, realpath } = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

const server = http.createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const segments = pathname.split("/");
    if (segments.some((segment) => segment.startsWith("."))) {
      response.writeHead(403).end();
      return;
    }
    const filename = await realpath(
      path.join(root, pathname === "/" ? "index.html" : pathname),
    );
    if (
      !filename.startsWith(root + path.sep) ||
      filename.includes(path.sep + "node_modules" + path.sep)
    ) {
      response.writeHead(403).end();
      return;
    }
    const type = types[path.extname(filename)];
    if (!type) {
      response.writeHead(403).end();
      return;
    }
    const body = await readFile(filename);
    response.writeHead(200, {
      "Content-Type": type,
      "Cache-Control": "no-store",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(404).end("Arquivo não encontrado.");
  }
});
server.on("error", (error) => {
  console.error(`Não foi possível iniciar o servidor: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () =>
  console.log(`Portfólio: http://localhost:${port}`),
);
