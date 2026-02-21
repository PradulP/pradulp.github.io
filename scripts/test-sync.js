import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '../');

// Load environment variables manually
let API_URL = "";
try {
    const envPath = path.join(ROOT_DIR, '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8');
        const match = envContent.match(/VITE_GOOGLE_SCRIPT_URL=(.*)/);
        if (match && match[1]) {
            API_URL = match[1].trim();
        }
    }
} catch (e) {
    console.warn("[WARN] Could not read .env file:", e.message);
}

if (!API_URL) {
    console.error("No API URL found.");
    process.exit(1);
}

console.log("Testing URL:", API_URL);

async function test() {
    try {
        const response = await fetch(API_URL);
        const text = await response.text();
        console.log("\nResponse Status:", response.status);
        console.log("Response Content-Type:", response.headers.get('content-type'));
        console.log("\n--- BODY PREVIEW ---");
        console.log(text.substring(0, 500));
        console.log("--- END PREVIEW ---\n");
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

test();
