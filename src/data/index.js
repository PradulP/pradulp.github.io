export { default as projectsData } from "./Projects.json";
export { default as skillsData } from "./skills.json";
export { default as blogData } from "./blog.json";
export { default as innovationData } from "./innovation.json";
export { default as certificationsData } from "./certifications.json";
export { default as profileData } from "./profile.json";

import projectsData from "./Projects.json";
import skillsData from "./skills.json";
import blogData from "./blog.json";
import innovationData from "./innovation.json";
import certificationsData from "./certifications.json";
import profileData from "./profile.json";

// Unified Content Object to replacing content.json
const content = {
    hero: profileData.hero,
    about: profileData.about,
    experience: profileData.experience,
    education: profileData.education,
    contact: profileData.contact,
    socials: profileData.socials,
    whatIDo: profileData.whatIDo,

    // Mapped data from specialized files
    projects: projectsData.projects,
    skills: skillsData,
    blog: blogData.posts,
    innovation: innovationData.items,
    certifications: certificationsData.items
};

export default content;
