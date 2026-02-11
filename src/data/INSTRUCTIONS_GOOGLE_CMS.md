# Google Sheet CMS: Full Setup Guide

To manage your entire portfolio (Blog, Projects, Skills, Innovation) from one Google Sheet, follow these steps.

## Step 1: Create the Master Sheet
1.  Go to [Google Sheets](https://sheets.google.com) and create a **Blank Spreadsheet**.
2.  Name it: `Portfolio_CMS`.

## Step 2: Upload Data Templates
I have generated 4 CSV files in your `src/data/` folder with your current website content. You need to upload them to create the tabs.

1.  **File > Import > Upload** -> Select `src/data/Blog_Template.csv`.
    *   **Import location**: "Replace current sheet" (or Insert new sheet).
    *   **Rename Tab**: `Blog`.
2.  **File > Import > Upload** -> Select `src/data/Projects_Template.csv`.
    *   **Import location**: "Insert new sheet".
    *   **Rename Tab**: `Projects`.
3.  **File > Import > Upload** -> Select `src/data/Skills_Template.csv`.
    *   **Import location**: "Insert new sheet".
    *   **Rename Tab**: `Skills`.
4.  **File > Import > Upload** -> Select `src/data/Innovation_Template.csv`.
    *   **Import location**: "Insert new sheet".
    *   **Rename Tab**: `Innovation`.

> **CRITICAL**: The tab names (`Blog`, `Projects`, `Skills`, `Innovation`) must match exactly (Case Sensitive).

## Step 3: Add the Sync Script
1.  **Extensions > Apps Script**.
2.  Delete any code and paste this:

```javascript
/* PORTFOLIO CMS SCRIPT */
function doGet() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var result = {};
  var sheets = doc.getSheets();
  
  sheets.forEach(function(sheet) {
    var rawName = sheet.getName();
    var key = rawName.toLowerCase(); // blog, projects, skills, innovation
    
    var data = sheet.getDataRange().getValues();
    if (data.length < 2) return;
    
    var headers = data[0];
    var rows = data.slice(1);
    
    result[key] = rows.map(function(row) {
      var item = {};
      headers.forEach(function(header, i) {
         if (!header) return;
         var cleanHeader = header.trim();
         var val = row[i];
         
         // Handle Array Columns (splitted by |)
         if (['tech', 'highlights', 'images'].indexOf(cleanHeader) > -1 && typeof val === 'string') {
             item[cleanHeader] = val.split('|').filter(s => s.trim());
         } else {
             item[cleanHeader] = val;
         }
      });
      return item;
    });
  });
  
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
```

3.  **Deploy > New deployment > Web app > Everyone > Deploy**.
4.  Copy the URL.

## Step 4: Update Config
1.  Open `src/data/config.js`.
2.  Paste the URL: `export const GOOGLE_CMS_URL = "YOUR_URL";`

## Step 5: Verify
Restart your dev server. Your website will now load content from the Sheet!
