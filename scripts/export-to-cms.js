import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src/data');
const outDir = path.join(process.cwd(), 'cms_exports');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

// Helper to convert array of objects to TSV (Tab Separated Values)
// TSV is much safer for Google Sheets copy-pasting than CSV because commas in descriptions break CSV parsing easily.
function jsonToTsv(jsonArray, outFilename) {
    if (!jsonArray || !jsonArray.length) {
        console.log(`Skipping ${outFilename} - no data`);
        return;
    }

    // Extract headers from the first object, plus any scattered keys
    const headersSet = new Set();
    jsonArray.forEach(obj => {
        Object.keys(obj).forEach(key => headersSet.add(key));
    });

    // Ensure 'timestamp' and 'id' are first if they exist
    const headers = Array.from(headersSet).sort((a, b) => {
        if (a === 'timestamp') return -1;
        if (b === 'timestamp') return 1;
        if (a === 'id') return -1;
        if (b === 'id') return 1;
        return 0;
    });

    // Create rows
    const rows = [];

    // Header row
    rows.push(headers.join('\t'));

    // Data rows
    jsonArray.forEach(obj => {
        const row = headers.map(header => {
            let val = obj[header];

            if (val === undefined || val === null) {
                return '';
            }

            if (Array.isArray(val)) {
                // Check if it's an array of objects
                if (val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
                    val = JSON.stringify(val);
                } else {
                    // Join flat arrays with an agreed separator like ' || '
                    val = val.join(' || ');
                }
            } else if (typeof val === 'object' && val !== null) {
                val = JSON.stringify(val);
            }

            // Convert to string and replace newlines/tabs with spaces to avoid breaking the TSV structure
            return String(val).replace(/\t/g, ' ').replace(/\n/g, '  ');
        });
        rows.push(row.join('\t'));
    });

    const outPath = path.join(outDir, outFilename);
    // Write as .tsv - TSV copy pastes directly into Google sheets perfectly without import menus
    fs.writeFileSync(outPath, rows.join('\n'));
    console.log(`Generated: ${outPath} (${jsonArray.length} items)`);
}

// Process files
const filesToProcess = {
    'blog.json': 'posts',
    'projects.json': 'projects',
    'innovation.json': 'items',
    'experience.json': null, // null means the root is an array
    'education.json': 'items',
    'skills.json': 'categories'
};

for (const [filename, arrayKey] of Object.entries(filesToProcess)) {
    try {
        const filePath = path.join(dataDir, filename);
        if (!fs.existsSync(filePath)) {
            console.log(`File not found: ${filename}`);
            continue;
        }

        const rawData = fs.readFileSync(filePath, 'utf8');
        const parsed = JSON.parse(rawData);

        let targetArray = arrayKey ? parsed[arrayKey] : parsed;

        // Custom flattening for experience data to match Google Form flat schema
        if (filename === 'experience.json') {
            const flatArray = [];
            targetArray.forEach(company => {
                const cmpName = company.company;
                const loc = company.location || 'Remote / On-site';
                if (company.roles && Array.isArray(company.roles)) {
                    company.roles.forEach(role => {
                        flatArray.push({
                            title: role.title || '',
                            company: cmpName || '',
                            period: role.period || '',
                            location: loc || '',
                            description: role.points ? role.points.join(' || ') : '',
                            tech: role.tools ? role.tools.join(' || ') : '',
                            visible: true
                        });
                    });
                }
            });
            targetArray = flatArray;
        }

        if (!Array.isArray(targetArray)) {
            console.log(`Target format invalid in ${filename}`);
            continue;
        }

        const baseName = path.basename(filename, '.json');
        jsonToTsv(targetArray, `${baseName}_export.tsv`);

    } catch (e) {
        console.error(`Error processing ${filename}:`, e.message);
    }
}
console.log("TSV Generation Complete! You can open these with Excel and copy-paste them directly into Google Sheets.");
