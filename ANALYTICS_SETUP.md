# Website Analytics Setup Guide

To track how many users open your website and see exactly what they do (click, scroll, "go through"), follow these steps.

## 1. Google Analytics 4 (Traffic Stats)
Best for: _"How many users visited today? Where did they come from?"_

1.  **Go to**: [analytics.google.com](https://analytics.google.com/).
2.  **Start Measuring** (Create Account).
3.  **Property Setup**:
    *   Property Name: `Pradul Portfolio`.
    *   Reporting Time Zone: Your zone (India).
    *   Currency: INR or USD.
4.  **Business Details**: Select "Small", "Education/Jobs".
5.  **Choose Platform**: Select **Web**.
6.  **Set up Data Stream**:
    *   Website URL: `https://pradulp.github.io/`.
    *   Stream Name: `Pradul Portfolio`.
7.  **Get Measurement ID**:
    *   Once created, you will see a **Measurement ID** starting with `G-XXXXXXXXXX`.
    *   **Copy this ID**.

## 2. Microsoft Clarity (Heatmaps & Recordings)
Best for: _"How deep did they scroll? Did they click my Projects link?"_ (Visual recording).

1.  **Go to**: [clarity.microsoft.com](https://clarity.microsoft.com/).
2.  **Sign Up** (Free).
3.  **Add Project**:
    *   Name: `Pradul Portfolio`.
    *   URL: `https://pradulp.github.io/`.
4.  **Get Project ID**:
    *   Go to **Settings > Review**.
    *   Find the **Project ID** (a short string like `ky1abcd`).
    *   **Copy this ID**.

## 3. Add to Website
I have already added the code placeholders in your `index.html`. You just need to paste your IDs.

1.  Open `index.html`.
2.  Find `YOUR_GA_ID` (appears twice). Replace both with your `G-XXXXXXXXXX`.
3.  Find `YOUR_CLARITY_ID`. Replace with your Clarity Project ID.
4.  Run `npm run deploy` in your terminal.

## 4. View Data
*   **Google Analytics**: Realtime reports show users active *right now*. Full reports take 24hrs.
*   **Microsoft Clarity**: Session recordings appear within minutes.
