import { getContentType } from "./getContentType.js";
import { sendResponse } from "./sendResponse.js";
import fs from 'fs/promises';
import path from "path";


export async function serveStatic(res, req, __dirname) {
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