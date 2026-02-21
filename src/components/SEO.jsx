import { useEffect } from "react";

/**
 * Reusable SEO Component (Custom implementation for React 19 compatibility)
 * @param {string} title - Page title
 * @param {string} description - Meta description
 * @param {string} keywords - Comma-separated keywords
 */
const SEO = ({ title, description, keywords, image, url }) => {
    const metaDescription = description || "Pradul P - Portfolio | Civil Engineer & Full Stack Developer";
    const metaTitle = title ? `${title} | Pradul P` : "Pradul P | Portfolio";
    const metaKeywords = keywords || "Pradul P, Portfolio, Civil Engineer, BIM, Revit, React Developer, Full Stack";

    // Default URL and Image (Adjust domain as needed)
    const siteUrl = "https://pradulp.github.io";
    const currentUrl = url ? `${siteUrl}${url}` : window.location.href;
    const metaImage = image ? (image.startsWith("http") ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.png`;

    useEffect(() => {
        // Update Title
        document.title = metaTitle;

        // Helper to set meta tags
        const setMetaTag = (selector, content) => {
            let element = document.querySelector(selector);
            if (!element) {
                element = document.createElement("meta");
                // Parse selector to set correct attribute
                if (selector.includes("[name=")) {
                    element.setAttribute("name", selector.match(/name="([^"]+)"/)[1]);
                } else if (selector.includes("[property=")) {
                    element.setAttribute("property", selector.match(/property="([^"]+)"/)[1]);
                }
                document.head.appendChild(element);
            }
            element.setAttribute("content", content);
        };

        // Standard Meta
        setMetaTag('meta[name="description"]', metaDescription);
        setMetaTag('meta[name="keywords"]', metaKeywords);

        // Open Graph / Facebook
        setMetaTag('meta[property="og:type"]', "website");
        setMetaTag('meta[property="og:url"]', currentUrl);
        setMetaTag('meta[property="og:title"]', metaTitle);
        setMetaTag('meta[property="og:description"]', metaDescription);
        setMetaTag('meta[property="og:image"]', metaImage);

        // Twitter
        setMetaTag('meta[name="twitter:card"]', "summary_large_image");
        setMetaTag('meta[name="twitter:url"]', currentUrl);
        setMetaTag('meta[name="twitter:title"]', metaTitle);
        setMetaTag('meta[name="twitter:description"]', metaDescription);
        setMetaTag('meta[name="twitter:image"]', metaImage);

    }, [metaTitle, metaDescription, metaKeywords, currentUrl, metaImage]);



    return null; // This component renders nothing in the DOM
};

export default SEO;
