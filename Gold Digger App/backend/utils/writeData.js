import fs from "fs/promises"
import path from "path";

export async function writeData(req, res, __dirname) {
    let content = ''

    req.on('data', chunk => {
        content += chunk.toString();
    })

    req.on('end', async () => {
        try {
            const data = JSON.parse(content);
            const contentText = `${data.timestamp}, amount paid: £${data.amount}, price per Oz: ${data.price}\n`;

            console.log("Writing:", contentText);

            // Write file
            await fs.appendFile(path.join(__dirname, "data", "data.txt"), contentText);

            // Success response
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Saved!" }));
        } catch (err) {
            // Error response
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Error saving file", error: err.message }));
        }
    })
}