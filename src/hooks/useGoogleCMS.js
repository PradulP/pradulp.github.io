import { useState, useEffect } from "react";
import { GOOGLE_CMS_URL } from "../data/config";

const CACHE_KEY_PREFIX = "portfolio_cms_";
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

/**
 * Hook to fetch content from Google Sheet CMS
 * @param {string} sectionName - The sheet tab name (lowercase), e.g., 'blog', 'projects'
 * @returns {Array} List of items from the sheet (or empty array if error/loading/not found)
 */
const useGoogleCMS = (sectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!GOOGLE_CMS_URL) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            // Check cache first
            const cached = localStorage.getItem(`${CACHE_KEY_PREFIX}${sectionName}`);
            if (cached) {
                const { timestamp, payload } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_DURATION) {
                    setData(payload);
                    setLoading(false);
                    // Background refresh
                    fetchFreshData(false);
                    return;
                }
            }

            await fetchFreshData(true);
        };

        const fetchFreshData = async (shouldSetLoading) => {
            if (shouldSetLoading) setLoading(true);
            try {
                const response = await fetch(GOOGLE_CMS_URL);
                if (!response.ok) throw new Error("Network error");

                const json = await response.json();
                // The script returns { "blog": [...], "projects": [...] }
                const items = json[sectionName] || [];

                if (items.length > 0) {
                    setData(items);
                    localStorage.setItem(`${CACHE_KEY_PREFIX}${sectionName}`, JSON.stringify({
                        timestamp: Date.now(),
                        payload: items
                    }));
                }
            } catch (err) {
                console.warn("CMS Fetch Error:", err);
                setError(err);
            } finally {
                if (shouldSetLoading) setLoading(false);
            }
        };

        fetchData();
    }, [sectionName]);

    return { data, loading, error };
};

export default useGoogleCMS;
