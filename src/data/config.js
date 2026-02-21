// Google Sheet CMS Configuration - Main Portfolio CMS (projects, blog, experience etc.)
export const GOOGLE_CMS_URL = "https://script.google.com/macros/s/AKfycbxjZPdjWJPmsiOPzaegufgVTObCFnr-10JKZEaWzpQxNIor9i0pnQIFPpTPYCB1-dY6zQ/exec";

// Contact Form Script URL (separate script on the contact sheet, or same script after you add doPost)
// Keep this the SAME as GOOGLE_CMS_URL once you add doPost to your main Portfolio CMS script
export const CONTACT_FORM_URL = "https://script.google.com/macros/s/AKfycbzFfwOv7qY3uxzkJ_psn9IkGHRhMwlos0OfE4n-Of3bxVm3BntKqHvmDdUGP_Rs0zdQAA/exec";

// Google Form URLs (Paste from Apps Script Logger)
export const FORM_URLS = {
    blog: "https://docs.google.com/forms/d/e/1FAIpQLSeRLVPl8fbZ9fzOZV3u7YjHO-UhGaIpp9TD--emA0eKHO7Bhg/viewform",
    projects: "https://docs.google.com/forms/d/e/1FAIpQLSeHAe_Jm7nB440IH-g-QimRBjY8VrQtxnQtBkdNhitaAl42LA/viewform",
    skills: "https://docs.google.com/forms/d/e/1FAIpQLScrhtrrO_jCymZ-u0WQNMoWP8a2j7CN8qzJHZI6ugToxZoAOg/viewform",
    innovation: "https://docs.google.com/forms/d/e/1FAIpQLSctjpyP3xm_Rr9UiBj-RxyNS5ucF2vxpnpN1ba7owtT6AiXdQ/viewform",
    experience: "https://docs.google.com/forms/d/e/1FAIpQLSd4vXkL8VGp6IrHopT_nmCGXWvoPxKs35Fbmj9hmagUGUbNiQ/viewform",
    education: "https://docs.google.com/forms/d/e/1FAIpQLSdDsTZr3FOvOe3aUDf6iIvZ5nv8bZwRggXPycJvVEvkx-vKDA/viewform"
};

// Fallback to local data if fetch fails
export const FALLBACK_TO_LOCAL = true;
