require("dotenv").config();
import { createServer } from "http";
import next from "next";
import express from "express";
import { method2 } from "./lib/upload";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
const server = createServer(app);
app.use(express.json());

(async () => {
    await nextApp.prepare();

    app.post("/api/upload", (req, res) => {
        method2(req, res);
    });

    app.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
})();

// export { }
