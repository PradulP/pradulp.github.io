# How to Manage Your Website Content with Google Sheets (CMS)

You can use a single Google Sheet to manage your Blogs, Projects, Skills, and more!
The website will verify if there is new data in the sheet and display it.

## Step 1: Create the Master Sheet
1. Create a new Google Sheet.
2. Name it `Portfolio_CMS`.
3. Create separate tabs (sheets) at the bottom for each section you want to control.
   - **Important**: The Tab Names must match EXACTLY: `Blog`, `Projects`, `Skills`, `Innovation`.

### Tab 1: "Blog" (Example Setup)
Row 1 Headers:
- `id` (unique number)
- `title`
- `date` (YYYY-MM-DD)
- `tag`
- `summary`
- `content` (Full text)
- `readTime`
- `image` (URL, optional)

### Tab 2: "Projects"
Row 1 Headers:
- `id`
- `title`
- `category` (civil / web)
- `summary`
- `image`

## Step 2: Add the Sync Script
1. In the Sheet, go to **Extensions > Apps Script**.
2. Paste this code:

```javascript
function doGet() {
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var result = {};
  var sheets = spreadSheet.getSheets();
  
  sheets.forEach(function(sheet) {
    var rawName = sheet.getName();
    // Normalize name to lowercase key (Blog -> blog)
    var key = rawName.toLowerCase(); 
    
    var data = sheet.getDataRange().getValues();
    if (data.length < 2) return; // Empty sheet
    
    var headers = data[0];
    var rows = data.slice(1);
    
    result[key] = rows.map(function(row) {
      var obj = {};
      headers.forEach(function(header, i) {
         // Handle comma-separated arrays (e.g. "React, JS" -> ["React", "JS"])
         var cleanHeader = header.trim();
         var val = row[i];
         
         if (typeof val === 'string' && (cleanHeader === 'tech' || cleanHeader === 'images' || cleanHeader === 'badges')) {
            obj[cleanHeader] = val.split(',').map(function(s) { return s.trim(); });
         } else {
            obj[cleanHeader] = val;
         }
      });
      return obj;
    });
  });
  
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy**:
   - **Deploy > New deployment**.
   - Type: **Web app**.
   - Execute as: **Me**.
   - Who has access: **Anyone**.
   - Click Deploy and **Copy the URL**.

## Step 3: Connect to Website
1. Open `src/data/config.js` (or created file).
2. Paste the URL:
   ```javascript
   export const GOOGLE_CMS_URL = "YOUR_WEB_APP_URL";
   ```

Now, your website will load data from this Sheet!
