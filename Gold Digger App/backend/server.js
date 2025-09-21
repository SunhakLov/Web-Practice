import http from "http"
import url from "url";
import path from "path";
import { sendResponse } from "./utils/sendResponse.js";
import { serveStatic } from "./utils/serveStatic.js";
import { writeData } from "./utils/writeData.js";

const PORT = process.env.PORT || 3000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const server = http.createServer(async (req, res) => {
    if (req.url === '/api') {
        sendResponse(res, 200, "application/json", JSON.stringify({ message: "Hello API" }));
    } else if (req.url === '/save' && req.method === "POST") {
        return await writeData(req, res, __dirname);

    } else {
        return await serveStatic(res, req, __dirname);
    }
})

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})