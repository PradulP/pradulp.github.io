# FINAL FIX: Google Sheet Connection

Your Sheet is named `Form Responses 1` and has different headers than expected. 

**Follow these 2 steps to fix it properly:**

## Step 1: Update Your Apps Script (Universal Version)
1. Go to your Sheet > **Extensions** > **Apps Script**.
2. **Delete everything** and paste this code. It works with **ANY** sheet name and **ANY** headers (as long as columns are in order: Name, Email, Phone, Topic, Message).

```javascript
/* 
   UNIVERSAL CONTACT FORM SCRIPT 
   Works with "Form Responses 1" OR "Sheet1"
*/

var EMAIL_TO = "pradul.p123@gmail.com"; 

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    
    // Check for standard sheet names
    var sheet = doc.getSheetByName("Form Responses 1") || doc.getSheetByName("Sheet1") || doc.getSheets()[0];

    // Prepare data (Column A is Timestamp, B is Name, C is Email, etc.)
    var rowData = [
      new Date(),             // A: Timestamp
      e.parameter.Name,       // B: Name
      e.parameter.Email,      // C: Email
      e.parameter.Phone,      // D: Phone
      e.parameter.Topic,      // E: Topic
      e.parameter.Message     // F: Message
    ];

    // Append the row
    sheet.appendRow(rowData);

    // Send Email Notification
    if (EMAIL_TO) {
       var subject = "Portfolio Inquiry from " + (e.parameter.Name || "Visitor");
       var body = "Name: " + (e.parameter.Name || "") + "\n" +
                  "Email: " + (e.parameter.Email || "") + "\n" +
                  "Phone: " + (e.parameter.Phone || "") + "\n" +
                  "Topic: " + (e.parameter.Topic || "") + "\n" +
                  "Message: \n" + (e.parameter.Message || "");
       
       MailApp.sendEmail(EMAIL_TO, subject, body);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

## Step 2: Deploy New Version (CRITICAL!)
1. Click **Deploy** (blue button) > **Manage deployments**.
2. Click the **Edit** (pencil icon).
3. Under **Version**, select **New version** (this is important!).
4. Ensure "Who has access" is **"Anyone"**.
5. Click **Deploy**.

**You do NOT need to change your React code url** (it stays the same). Just updating the script logic and deploying a new version is enough.
