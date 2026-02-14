export { default as projectsData } from "./Projects.json";
export { default as skillsData } from "./skills.json";
export { default as blogData } from "./blog.json";
export { default as innovationData } from "./innovation.json";
export { default as certificationsData } from "./certifications.json";
export { default as experienceData } from "./experience.json";
export { default as profileData } from "./profile.json";

import projectsData from "./Projects.json";
import skillsData from "./skills.json";
import blogData from "./blog.json";
import innovationData from "./innovation.json";
import certificationsData from "./certifications.json";
import experienceData from "./experience.json";
import profileData from "./profile.json";

// Helper to safely get array from data
const getArray = (data, key) => {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data[key])) return data[key];
    return [];
};

// Unified Content Object
const content = {
    // Base Profile Data
    hero: profileData.hero || {},
    about: profileData.about || {},
    education: profileData.education || [],
    contact: profileData.contact || {},
    socials: profileData.socials || {},
    whatIDo: profileData.whatIDo || [],

    // Overrides & External Data
    experience: getArray(experienceData, 'experience'), // Handles both [] and { experience: [] }
    projects: getArray(projectsData, 'projects'),
    skills: skillsData || {},
    blog: getArray(blogData, 'posts'),
    innovation: getArray(innovationData, 'items'),
    certifications: getArray(certificationsData, 'items')
};

export default content;
