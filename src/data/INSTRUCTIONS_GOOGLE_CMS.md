# Google Sheet CMS: Automated Setup Guide

Follow this guide to generate Google Forms for adding content AND set up the API for your website.

## Phase 1: Set up the Script & Forms
1.  Open your Google Sheet (`Portfolio_CMS`).
2.  Go to **Extensions > Apps Script**.
3.  **Delete everything** and paste the code below:

```javascript
function doGet() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var result = {};
  var sheets = doc.getSheets();
  
  sheets.forEach(function(sheet) {
    var rawName = sheet.getName();
    // Normalize sheet names: 'Form Responses 1' -> 'form_responses_1', 'Blog' -> 'blog'
    // BUT we prefer short names.
    var key = rawName.toLowerCase(); 
    
    var data = sheet.getDataRange().getValues();
    if (data.length < 2) return;
    
    var headers = data[0];
    var rows = data.slice(1);
    
    result[key] = rows.map(function(row) {
      var item = {};
      headers.forEach(function(header, i) {
         if (!header) return;
         // Force lowercase keys for compatibility (Title -> title)
         var cleanHeader = header.trim().toLowerCase();
         var val = row[i];
         
         // Handle Array Columns (split by |)
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

// RUN THIS FUNCTION ONCE TO CREATE FORMS
function setupForms() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ssId = ss.getId();
  
  // 1. BLOG FORM
  var formBlog = FormApp.create('CMS - Add Blog Post');
  formBlog.addTextItem().setTitle('id').setRequired(true);
  formBlog.addTextItem().setTitle('title').setRequired(true);
  formBlog.addDateItem().setTitle('date').setRequired(true);
  formBlog.addTextItem().setTitle('tag').setRequired(true);
  formBlog.addParagraphTextItem().setTitle('summary').setRequired(true);
  formBlog.addParagraphTextItem().setTitle('content').setRequired(true);
  formBlog.addTextItem().setTitle('readTime');
  formBlog.setDestination(FormApp.DestinationType.SPREADSHEET, ssId);
  
  // 2. PROJECT FORM
  var formProj = FormApp.create('CMS - Add Project');
  formProj.addTextItem().setTitle('id').setHelpText('Unique ID (e.g. my-project-1)').setRequired(true);
  formProj.addTextItem().setTitle('title').setRequired(true);
  formProj.addTextItem().setTitle('subtitle');
  formProj.addTextItem().setTitle('type');
  formProj.addListItem().setTitle('category').setChoiceValues(['civil', 'web', 'other']).setRequired(true);
  formProj.addTextItem().setTitle('year');
  formProj.addTextItem().setTitle('role');
  formProj.addParagraphTextItem().setTitle('summary').setRequired(true);
  formProj.addParagraphTextItem().setTitle('tech').setHelpText('Separate items with | (e.g. React | Node)');
  formProj.addParagraphTextItem().setTitle('highlights').setHelpText('Separate items with |');
  formProj.addParagraphTextItem().setTitle('images').setHelpText('Separate URLs with |');
  formProj.addTextItem().setTitle('demo_link');
  formProj.addTextItem().setTitle('repo_link');
  formProj.addCheckboxItem().setTitle('homeFeatured').setChoiceValues(['true']);
  formProj.setDestination(FormApp.DestinationType.SPREADSHEET, ssId);
  
  // 3. SKILL FORM
  var formSkill = FormApp.create('CMS - Add Skill');
  formSkill.addTextItem().setTitle('category').setRequired(true);
  formSkill.addTextItem().setTitle('name').setRequired(true);
  formSkill.addListItem().setTitle('level').setChoiceValues(['Advanced', 'Intermediate', 'Working', 'Learning']).setRequired(true);
  formSkill.addParagraphTextItem().setTitle('details');
  formSkill.setDestination(FormApp.DestinationType.SPREADSHEET, ssId);
  
  // 4. INNOVATION FORM
  var formInn = FormApp.create('CMS - Add Innovation');
  formInn.addTextItem().setTitle('id').setRequired(true);
  formInn.addTextItem().setTitle('title').setRequired(true);
  formInn.addTextItem().setTitle('type');
  formInn.addTextItem().setTitle('status');
  formInn.addParagraphTextItem().setTitle('description');
  formInn.addParagraphTextItem().setTitle('details');
  formInn.addParagraphTextItem().setTitle('tech').setHelpText('Separate with |');
  formInn.addTextItem().setTitle('repo_link');
  formInn.addCheckboxItem().setTitle('showOnHome').setChoiceValues(['true']);
  formInn.setDestination(FormApp.DestinationType.SPREADSHEET, ssId);
  
  Logger.log('------------------------------------------------');
  Logger.log('FORMS CREATED SUCCESSFULLY! COPY THESE URLs:');
  Logger.log('Blog Form: ' + formBlog.getPublishedUrl());
  Logger.log('Project Form: ' + formProj.getPublishedUrl());
  Logger.log('Skill Form: ' + formSkill.getPublishedUrl());
  Logger.log('Innovation Form: ' + formInn.getPublishedUrl());
  Logger.log('------------------------------------------------');
}
```

## Phase 2: Run Setup
1.  Save the script (Floppy Disk icon).
2.  Select `setupForms` from the function dropdown (top bar).
3.  Click **Run**. (Grant permissions if asked).
4.  Wait for execution to finish.

## Phase 3: Connect Forms to CMS
1.  Go back to your Google Sheet.
2.  You will see 4 new tabs (e.g., `Form Responses 1`, `Form Responses 2`...).
3.  **Rename these tabs** to match the section names exactly:
    *   Start with the tab linked to the Blog form -> Rename to `Blog`.
    *   Project form tab -> Rename to `Projects`.
    *   Skill form tab -> Rename to `Skills`.
    *   Innovation form tab -> Rename to `Innovation`.
    *   *(If these names are taken by old tabs, delete the old ones first!)*.
4.  **Copy Data**: If you have existing data in the old tabs, copy/paste the rows into these new form-linked tabs.

## Phase 4: Deploy API
1.  Click **Deploy > New deployment**.
2.  Select **Web App**.
3.  Who has access: **Anyone**.
4.  Deploy and copy URL.
5.  Update `src/data/config.js`.

Now you can just fill the Google Forms to add content, and edit the Sheet to fix mistakes!
