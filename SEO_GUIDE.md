# SEO Setup Guide for Pradul P's Portfolio

This guide walks you through setting up Google Search Console and Bing Webmaster Tools to ensure your site is discovered and indexed.

## 1. Google Search Console (GSC)

1.  **Go to**: [Google Search Console](https://search.google.com/search-console/about).
2.  **Login**: Use your Google Account.
3.  **Add Property**:
    *   Select **"URL prefix"** (Recommended for GitHub Pages).
    *   Enter your URL: `https://pradulp.github.io/` (or your custom domain).
    *   Click **Continue**.
4.  **Verify Ownership**:
    *   Choose the **"HTML Tag"** method.
    *   Copy the meta tag provided: `<meta name="google-site-verification" content="..." />`.
    *   Open your project's `index.html` file.
    *   Paste the code into the placeholder I created (look for `<!-- Google Search Console Verification -->`).
    *   **Commit & Push** your changes to GitHub.
    *   Wait a few minutes for the site to deploy.
    *   Go back to GSC and click **Verify**.
5.  **Submit Sitemap**:
    *   Once verified, go to "Sitemaps" in the left sidebar.
    *   Enter `sitemap.xml` in the "Add a new sitemap" box.
    *   Click **Submit**.

## 2. Bing Webmaster Tools

1.  **Go to**: [Bing Webmaster Tools](https://www.bing.com/webmasters/about).
2.  **Login**: You can use your Google/Microsoft account.
3.  **Add Site**:
    *   You can often **"Import from Google Search Console"** if you did step 1 first. This is the easiest way!
    *   If adding manually: Enter your URL `https://pradulp.github.io/`.
4.  **Verify Ownership** (If not imported):
    *   Choose **"HTML Meta Tag"**.
    *   Copy the code: `<meta name="msvalidate.01" content="..." />`.
    *   Paste it into `index.html` in the Bing placeholder.
    *   **Commit & Push**.
    *   Click **Verify**.
5.  **Submit Sitemap**:
    *   Go to "Sitemaps".
    *   Submit `https://pradulp.github.io/sitemap.xml`.

## 3. IndexNow (Faster Indexing)

IndexNow allows you to ping search engines (Bing, Yandex) instantly when you update content.

1.  **Generate API Key**:
    *   In Bing Webmaster Tools, go to **IndexNow** (left menu).
    *   Click **Generate API Key**.
    *   Download the key file (e.g., `Abc123...txt`).
2.  **Add to Project**:
    *   Place this `.txt` file in your `public/` folder.
    *   Commit & Push.
3.  **Ping**:
    *   Whenever you update the site, you can manually ping via the Bing dashboard or use a simple script/tool to notify them.

## 4. Robots.txt

I have already created `public/robots.txt` which points search engines to your sitemap automatically.

## 5. Important Notes

*   **Deployment**: Ensure you run `npm run deploy` (or your deployment command) after adding the verification tags.
*   **Time**: It may take a few days for Google to crawl and index your pages after submission.
