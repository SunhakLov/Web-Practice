import http from "http"
import url from "url";
import path from "path";
import { getContentType } from "./utils/getContentType.js";
import fs from 'fs/promises'
import { sendResponse } from "./utils/sendResponse.js";

const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const server = http.createServer(async (req, res) => {
    if (req.url === '/api') {
        sendResponse(res, 200, "application/json", JSON.stringify({ message: "Hello API" }));
    } else if (!req.url.startsWith('/api')) {
        const publicDir = path.join(__dirname, "..", "public");
        const filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url);
        const ext = path.extname(filePath);

        const contentType = getContentType(ext);
        try {
            const content = await fs.readFile(filePath)
            sendResponse(res, 200, contentType, content)
        } catch (err) {
            if (err.code === 'ENOENT') {
                const content = await fs.readFile(path.join(publicDir, '404.html'));
                sendResponse(res, 404, 'text/html', content);
            } else {
                sendResponse(res, 500, 'text/html', `<html><h1>Server Error: ${err.code}</html>`)
            }
        }
        console.log("serve static")
    }
})

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})