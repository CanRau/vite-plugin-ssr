const express = require("express");
const { createPageRender } = require("vite-plugin-ssr");
const vite = require("vite");

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}/..`;
const base = isProduction ? "/dist/client/" : "/";

startServer();

async function startServer() {
  const app = express();

  let viteDevServer;
  if (isProduction) {
    app.use(base, express.static(`${root}/dist/client`, { index: false }));
  } else {
    viteDevServer = await vite.createServer({
      root,
      base,
      server: { middlewareMode: true },
    });
    app.use(viteDevServer.middlewares);
  }

  const renderPage = createPageRender({
    viteDevServer,
    isProduction,
    root,
    base,
  });
  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;
    const contextProps = {};
    const result = await renderPage({ url, contextProps });
    if (result.nothingRendered) return next();
    res.status(result.statusCode).send(result.renderResult);
  });

  const port = 3000;
  app.listen(port);
  console.log(`Server running at http://localhost:${port}${base}`);
}
