/**
 * fetch-live-data.js
 * 
 * Fetches data from Google Sheet CMS and updates local JSON files.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '../');
const DATA_DIR = path.join(ROOT_DIR, 'src/data');

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
    console.error("[ERROR] VITE_GOOGLE_SCRIPT_URL not found in .env file.");
    process.exit(1);
}

// Function to fetch all data at once
async function fetchAllData() {
    console.log(`[FETCH] Connecting to Google CMS...`);
    try {
        const response = await fetch(API_URL); // No params needed for this script version
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        // Handle HTML error responses (like 404/Auth error page)
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("text/html")) {
            throw new Error("Received HTML instead of JSON. Check Script Permissions (Access: Anyone).");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`[ERROR] Fetch failed:`, error.message);
        return null;
    }
}

function processSkills(flatSkills, existingData) {
    if (!Array.isArray(flatSkills)) return existingData;

    // Group by category
    const groupsMap = {};
    flatSkills.forEach(skill => {
        const cat = skill.category || "Other";
        if (!groupsMap[cat]) {
            groupsMap[cat] = {
                title: cat,
                skills: []
            };
        }
        groupsMap[cat].skills.push({
            name: skill.name,
            level: skill.level,
            details: skill.details
        });
    });

    // Convert map to array
    const newGroups = Object.values(groupsMap);

    // Merge with existing metadata
    return {
        ...existingData,
        groups: newGroups
    };
}

async function updateFile(filename, content) {
    const filePath = path.join(DATA_DIR, filename);
    console.log(`[WRITE] Updating ${filename}...`);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
}

async function main() {
    console.log("--- STARTING DATA SYNC ---");
    console.log("API URL:", API_URL);

    const data = await fetchAllData();
    if (!data) {
        console.error("[FAIL] No data received. Exiting.");
        return;
    }

    // 1. BLOG
    if (data.blog && Array.isArray(data.blog)) {
        await updateFile('blog.json', { posts: data.blog });
    } else {
        console.warn("[WARN] 'blog' data missing or invalid.");
    }

    // 2. PROJECTS
    if (data.projects && Array.isArray(data.projects)) {
        // Parse the complex stringified fields back into clean JSON
        const parsedProjects = data.projects.map(proj => {
            const cleanProj = { ...proj };
            const complexFields = ['objectives', 'approach', 'tech', 'highlights', 'images', 'deliverables', 'challenges', 'links'];

            complexFields.forEach(field => {
                if (typeof cleanProj[field] === 'string') {
                    let val = cleanProj[field].trim();
                    // 1) Try JSON parse
                    if ((val.startsWith('[') && val.endsWith(']')) || (val.startsWith('{') && val.endsWith('}'))) {
                        try { cleanProj[field] = JSON.parse(val); return; } catch (e) { }
                    }
                    // 2) Try || separator with :: parsing
                    const processItem = (s) => {
                        const trimmed = s.trim();
                        if (trimmed.includes('::')) {
                            const [t, d] = trimmed.split('::').map(x => x.trim());
                            return { title: t, desc: d };
                        }
                        return trimmed;
                    };
                    if (val.includes('||')) {
                        cleanProj[field] = val.split('||').map(processItem).filter(Boolean);
                    } else if (val.includes('|')) {
                        cleanProj[field] = val.split('|').map(processItem).filter(Boolean);
                    }
                }
            });
            return cleanProj;
        });

        await updateFile('Projects.json', { projects: parsedProjects });
    } else {
        console.warn("[WARN] 'projects' data missing or invalid.");
    }

    // 3. INNOVATION
    if (data.innovation && Array.isArray(data.innovation)) {
        await updateFile('innovation.json', { items: data.innovation });
    } else {
        console.warn("[WARN] 'innovation' data missing or invalid.");
    }

    // 4. SKILLS
    if (data.skills && Array.isArray(data.skills)) {
        // Read existing for metadata
        let existingSkills = {};
        try {
            existingSkills = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'skills.json'), 'utf-8'));
        } catch (e) {
            console.warn("[WARN] Could not read existing skills.json, using default structure.");
            existingSkills = { sectionId: "skills", title: "Skills", groups: [] };
        }

        const mergedSkills = processSkills(data.skills, existingSkills);
        await updateFile('skills.json', mergedSkills);
    } else {
        console.warn("[WARN] 'skills' data missing or invalid.");
    }

    // 5. EXPERIENCE
    if (data.experience && Array.isArray(data.experience)) {
        await updateFile('experience.json', { experience: data.experience });
    } else {
        console.warn("[WARN] 'experience' data missing or invalid.");
    }

    // 6. EDUCATION (Updates profile.json education array or creates education.json)
    // Actually, experience is in experience.json but education is in profile.json.
    // Let's create an education.json and update data/index.js to read from it if we want, or just save to education.json and read it.
    if (data.education && Array.isArray(data.education)) {
        await updateFile('education.json', { items: data.education });
    } else {
        console.warn("[WARN] 'education' data missing or invalid.");
    }

    console.log("--- SYNC COMPLETE ---");
}

main();
