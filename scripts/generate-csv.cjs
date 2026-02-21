const fs = require('fs');

// Read existing JSON data
const expData = JSON.parse(fs.readFileSync('./src/data/experience.json', 'utf-8'));
const profileData = JSON.parse(fs.readFileSync('./src/data/profile.json', 'utf-8'));
const eduData = profileData.education;

// Format Experience for CSV
let expCsv = "id\ttitle\tcompany\tperiod\tlocation\tdescription\ttech\tvisible\n";
let expId = 1;

expData.forEach(item => {
    // Some items have multiple roles under one company
    if (item.roles && item.roles.length > 0) {
        item.roles.forEach(role => {
            const title = role.title || '';
            const company = item.company || '';
            const period = role.period || '';
            const location = item.location || '';
            const desc = role.points ? role.points.join(' || ') : '';
            const tech = role.tools ? role.tools.join(' || ') : '';

            expCsv += `${expId}\t${title}\t${company}\t${period}\t${location}\t${desc}\t${tech}\tTRUE\n`;
            expId++;
        });
    } else {
        const title = item.title || '';
        const company = item.company || '';
        const period = item.period || '';
        const location = item.location || '';
        const desc = item.points ? item.points.join(' || ') : '';
        const tech = item.tools ? item.tools.join(' || ') : '';

        expCsv += `${expId}\t${title}\t${company}\t${period}\t${location}\t${desc}\t${tech}\tTRUE\n`;
        expId++;
    }
});

fs.writeFileSync('experience_export.tsv', expCsv);

// Format Education for CSV
let eduCsv = "id\tdegree\tplace\tyears\tlocation\tdescription\tachievements\tvisible\n";
let eduId = 1;

eduData.forEach(item => {
    const degree = item.degree || '';
    const place = item.place || '';
    const years = item.years || '';
    const location = item.location || '';
    // Replace newlines in description with spaces so it stays on one line
    const desc = (item.description || '').replace(/\n/g, ' ');
    const achievements = item.highlights ? item.highlights.join(' || ') : '';

    eduCsv += `${eduId}\t${degree}\t${place}\t${years}\t${location}\t${desc}\t${achievements}\tTRUE\n`;
    eduId++;
});

fs.writeFileSync('education_export.tsv', eduCsv);
console.log('Successfully generated TSV files for copy-pasting!');
