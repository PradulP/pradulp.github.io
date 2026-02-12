/**
 * fetch-live-data.js
 * 
 * This script fetches live data from the Google Sheet via the configured API URL
 * and updates the local JSON files in src/data.
 * 
 * Usage: node scripts/fetch-live-data.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- CONFIGURATION ---
// You must replace this with your actual Google Script Web App URL
const API_URL = "https://script.google.com/macros/s/AKfycbz_GvHqHqe84yYtKzQhJOe7-1A8DbaV2Qwbj-Rz6eH14X2tXN_3FmYgRz0vW6Xg44E/exec";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../src/data');

const FILES = {
    blog: 'blog.json',
    project: 'Projects.json',
    skill: 'skills.json',
    innovation: 'innovation.json'
};

async function fetchData(type) {
    console.log(`[FETCH] Fetching ${type}...`);
    try {
        const response = await fetch(`${API_URL}?type=${type}`);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`[ERROR] Failed to fetch ${type}:`, error.message);
        return null;
    }
}

async function updateFile(filename, data) {
    const filePath = path.join(DATA_DIR, filename);

    // Read existing file to preserve structure if needed (e.g. for projects wrapper)
    // For simplicity, we will just overwrite with the fetched array or wrapped object

    let content = data;

    // Special handling to match existing JSON structures if they differ from raw array
    if (filename === 'Projects.json') {
        // Existing Projects.json structure might be { projects: [...] } or just [...]
        // Based on previous files, it seems to be { projects: [...] }
        content = { projects: data };
    }
    else if (filename === 'blog.json') {
        content = { posts: data };
    }
    else if (filename === 'innovation.json') {
        content = { items: data };
    }
    // Skills might require complex parsing if the sheet is flat but JSON is nested. 
    // For now, we assume the sheet returns the structure we want or we dump it as is.

    console.log(`[WRITE] Updating ${filename}...`);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
}

async function main() {
    console.log("--- STARTING DATA SYNC ---");

    for (const [type, filename] of Object.entries(FILES)) {
        const data = await fetchData(type);
        if (data && Array.isArray(data) && data.length > 0) {
            await updateFile(filename, data);
        } else {
            console.warn(`[WARN] No data or invalid data for ${type}, skipping file update.`);
        }
    }

    console.log("--- SYNC COMPLETE ---");
}

main();
