# How to Get WhatsApp Notifications

To receive a WhatsApp message when someone fills out your contact form, we will use the free **CallMeBot** service.

## Step 1: Get Your API Key
1. Add the phone number `+34 644 66 32 62` to your phone contacts (Name it "CallMeBot").
2. Send this exact message to that contact via WhatsApp:
   `I allow callmebot to send me messages`
3. Wait for the reply. It will give you an **apikey**.

## Step 2: Update Your Apps Script
1. Go to your Google Sheet > **Extensions** > **Apps Script**.
2. Update your `doPost` function to include this WhatsApp block (add your details):

```javascript
/* ADD THESE VARIABLES AT THE TOP */
var EMAIL_TO = "pradul.p123@gmail.com"; 
var WA_PHONE = "918078376902"; // Your number with country code (no +)
var WA_APIKEY = "YOUR_API_KEY_HERE"; // From Step 1

/* ... inside doPost ... */
    // Send Email Notification (existing code)
    // ...

    // Send WhatsApp Notification (New)
    if (WA_APIKEY) {
       var waMsg = "New Portfolio Inquiry!\n" +
                   "Name: " + (e.parameter.Name || "") + "\n" +
                   "Phone: " + (e.parameter.Phone || "") + "\n" +
                   "Topic: " + (e.parameter.Topic || "");
       
       var url = "https://api.callmebot.com/whatsapp.php?phone=" + WA_PHONE + "&text=" + encodeURIComponent(waMsg) + "&apikey=" + WA_APIKEY;
       try {
         UrlFetchApp.fetch(url);
       } catch(err) {
         // ignore whatsapp errors
       }
    }
/* ... */
```

3. **Deploy > Manage deployments > Edit > New version > Deploy**.
4. Done! You will now get a WhatsApp message for every submission.
