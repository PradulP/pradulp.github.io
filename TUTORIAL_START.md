# Step-by-Step Guide: Managing Your Website with Google Sheets

Follow this guide to connect your website to a Google Sheet. Once connected, any changes you make in the Sheet will instantly appear on your website!

## Phase 1: Create the Master Sheet
1.  Go to [Google Sheets](https://sheets.google.com) and create a **Blank Spreadsheet**.
2.  Name it `Portfolio_CMS`.
3.  **Rename the bottom tab** from `Sheet1` to `Blog`. (Exact case matters!).
4.  In the `Blog` tab, add these headers in **Row 1**:
    *   **A1**: `id`
    *   **B1**: `title`
    *   **C1**: `date`
    *   **D1**: `tag`
    *   **E1**: `summary`
    *   **F1**: `content`
    *   **G1**: `readTime`
5.  Add a dummy row of data in **Row 2** so you can test it:
    *   `100` | `My First Sheet Post` | `2024-05-20` | `News` | `This is a test summary.` | `This is the full content body.` | `2 min`

## Phase 2: Add the Sync Script
1.  In your Google Sheet, click **Extensions** > **Apps Script** (top menu).
2.  **Delete any code** in the editor and paste the code below:

```javascript
/* GOOGLE SHEET CMS SCRIPT */
function doGet() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var result = {};
  
  // Get all sheets
  var sheets = doc.getSheets();
  
  sheets.forEach(function(sheet) {
    var rawName = sheet.getName();
    var key = rawName.toLowerCase(); // 'Blog' -> 'blog'
    
    var data = sheet.getDataRange().getValues();
    if (data.length < 2) return; // Skip empty sheets
    
    var headers = data[0]; // Row 1
    var rows = data.slice(1); // Row 2+
    
    result[key] = rows.map(function(row) {
      var item = {};
      headers.forEach(function(header, i) {
         if (header) item[header.trim()] = row[i];
      });
      return item;
    });
  });
  
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3.  Click the **Save** icon (floppy disk).

## Phase 3: Deploy the API
1.  Click the blue **Deploy** button > **New deployment**.
2.  Click the **Gear Icon** > **Web app**.
3.  **Description**: `Content API v1`.
4.  **Execute as**: `Me` (your email).
5.  **Who has access**: **`Anyone`** (Critical!).
6.  Click **Deploy**.
7.  **Authorize Access** if asked (Click *Advanced > Go to Untitled Project (unsafe)* if Google warns you—it's safe because it's your own code).
8.  **COPY the "Web App URL"**. It looks like `https://script.google.com/.../exec`.

## Phase 4: Connect Your Website
1.  Go back to your code editor (VS Code).
2.  Open the file: `src/data/config.js`.
3.  Paste your Web App URL inside the quotes:
    ```javascript
    export const GOOGLE_CMS_URL = "https://script.google.com/macros/s/......./exec";
    ```
4.  Save the file.

## Phase 5: Verify
1.  Start your website (`npm run dev`).
2.  Go to the **Blog** page.
3.  You should see your "My First Sheet Post" from the Google Sheet!
4.  If you see it, you're done! You can now just add/edit rows in Google Sheets and refresh your website to see changes.

## Troubleshooting
*   **Nothing shows up?**
    *   Check `src/data/config.js` URL.
    *   Check if you renamed the Sheet tab to `Blog`.
    *   Check "Who has access" is `Anyone`.
