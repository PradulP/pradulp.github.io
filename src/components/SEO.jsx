import { useEffect } from "react";

/**
 * Reusable SEO Component (Custom implementation for React 19 compatibility)
 * @param {string} title - Page title
 * @param {string} description - Meta description
 * @param {string} keywords - Comma-separated keywords
 */
const SEO = ({ title, description, keywords }) => {
    const metaDescription = description || "Pradul P - Portfolio | Civil Engineer & Full Stack Developer";
    const metaTitle = title ? `${title} | Pradul P` : "Pradul P | Portfolio";
    const metaKeywords = keywords || "Pradul P, Portfolio, Civil Engineer, BIM, Revit, React Developer, Full Stack";

    useEffect(() => {
        // Update Title
        document.title = metaTitle;

        // Update Meta Tags
        const setMeta = (name, content) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement("meta");
                element.setAttribute("name", name);
                document.head.appendChild(element);
            }
            element.setAttribute("content", content);
        };

        const setOgMeta = (property, content) => {
            let element = document.querySelector(`meta[property="${property}"]`);
            if (!element) {
                element = document.createElement("meta");
                element.setAttribute("property", property);
                document.head.appendChild(element);
            }
            element.setAttribute("content", content);
        };

        setMeta("description", metaDescription);
        setMeta("keywords", metaKeywords);
        setOgMeta("og:title", metaTitle);
        setOgMeta("og:description", metaDescription);
        setOgMeta("og:type", "website");

        // Optional: Cleanup if needed, but usually strictly persisting is fine for SPA navigation
    }, [metaTitle, metaDescription, metaKeywords]);

    return null; // This component renders nothing in the DOM
};

export default SEO;
