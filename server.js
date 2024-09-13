import { createRequestHandler } from "@remix-run/express";
import express from "express";
import path from "path";

const app = express();

// Vite dev server setup
const viteDevServer =
  process.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      );

// Serve static files
app.use(express.static("public"));

// Rewrite /admin to /admin/index.html
app.get("/admin", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/admin/index.html"));
});

// Use Vite dev server middlewares in development
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  app.use(express.static("build/client"));
}

// Load the Remix build
const build = viteDevServer
  ? () => viteDevServer.ssrLoadModule("virtual:remix/server-build")
  : await import("./build/server/index.js");

// Handle Remix requests
app.all("*", createRequestHandler({ build }));

// Start the server
app.listen(3000, () => {
  console.log("App listening on http://localhost:3000");
});
