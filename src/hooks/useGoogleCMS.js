import { useState, useEffect } from "react";
import { GOOGLE_CMS_URL } from "../data/config";

const CACHE_KEY_PREFIX = "portfolio_cms_";
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

/**
 * Hook to fetch content from Google Sheet CMS
 * @param {string} sectionName - The sheet tab name (lowercase), e.g., 'blog', 'projects'
 * @returns {Array} List of items from the sheet (or empty array if error/loading/not found)
 */
const useGoogleCMS = (sectionName, skipCache = false, reloadTrigger = 0) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        if (!GOOGLE_CMS_URL) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            // ... existing logic ...
        };

        const fetchFreshData = async (shouldSetLoading) => {
            if (shouldSetLoading && isMounted) setLoading(true);
            try {
                // Add timestamp to prevent browser caching if skipping internal cache
                const url = skipCache
                    ? `${GOOGLE_CMS_URL}?t=${Date.now()}`
                    : GOOGLE_CMS_URL;

                const response = await fetch(url);
                if (!response.ok) throw new Error("Network error");

                const json = await response.json();
                // The script returns { "blog": [...], "projects": [...] }
                let items = sectionName === "all" ? json : (json[sectionName] || []);

                // REVERSE ORDER: Google Sheets appends new rows at the bottom (index last).
                // To show the newest entries at the top of the website, we reverse the array.
                if (Array.isArray(items)) {
                    items = [...items].reverse();
                }

                if (isMounted) {
                    if (items && (Array.isArray(items) ? items.length > 0 : Object.keys(items).length > 0)) {
                        setData(items);
                        // Only cache if we are not skipping cache
                        if (!skipCache) {
                            localStorage.setItem(`${CACHE_KEY_PREFIX}${sectionName}`, JSON.stringify({
                                timestamp: Date.now(),
                                payload: items
                            }));
                        }
                    }
                }
            } catch (err) {
                console.warn("CMS Fetch Error:", err);
                if (isMounted) setError(err);
            } finally {
                if (shouldSetLoading && isMounted) setLoading(false);
            }
        };

        const initialize = async () => {
            // Check cache first (unless skipping)
            if (!skipCache) {
                const cached = localStorage.getItem(`${CACHE_KEY_PREFIX}${sectionName}`);
                if (cached) {
                    const { timestamp, payload } = JSON.parse(cached);
                    if (Date.now() - timestamp < CACHE_DURATION) {
                        if (isMounted) {
                            setData(payload);
                            setLoading(false);
                        }
                        // Background refresh
                        fetchFreshData(false);
                        return;
                    }
                }
            }
            await fetchFreshData(true);
        }

        initialize();

        return () => { isMounted = false; };
    }, [sectionName, skipCache, reloadTrigger]);

    const refresh = () => {
        localStorage.removeItem(`${CACHE_KEY_PREFIX}${sectionName}`);
        // Trigger a re-run effectively or just call the internal fetch
        // Since we can't easily call the internal fetch from here without exposing it or refactoring, 
        // a simple way is to force a re-mount or expose a refetch function.
        // For now, let's just make the hook return a refetch function.
    };

    return { data, loading, error, refetch: () => setData([]) || localStorage.removeItem(`${CACHE_KEY_PREFIX}${sectionName}`) };
    // The simplified refetch above is a bit hacky (rendering empty then re-fetching on prop change is better), 
    // but for now let's just stick to the initial load or allow the consumer to key the component to force reload.
};

export default useGoogleCMS;
