# 🏗️ Engineering Portfolio: Feature Showcase

A high-performance, futuristic portfolio website designed specifically for a **Civil Engineer & BIM Specialist**. This project blends core engineering aesthetics (CAD/BIM) with modern web technologies, featuring a robust custom CMS and a highly interactive user experience.

---

## 🚀 Global Excellence (Minute Features)
*   **CAD Crosshair Cursor:** A custom-built cursor system that replicates the precision of AutoCAD/Revit design environments with pixel-perfect alignment.
*   **Adaptive Theme Engine:** 
    *   **Blueprint (Default):** Classic engineering aesthetic with grid backgrounds and blue accents.
    *   **Dark Modern:** Sleek, high-contrast HUD design with neon highlights.
    *   **Paper Mode:** A professional, lightweight white theme for formal presentation.
*   **Glassmorphism UI:** Advanced CSS Backdrop-filter techniques create realistic frosted-glass aesthetics across all overlays and panels.
*   **Micro-Animations:** Every button, card, and input field features staggered entry animations and hover-depth effects powered by `framer-motion`.
*   **HUD Overlays:** Futuristic Heads-Up Display elements provide "System Status" and "Data Feeds" throughout the interface.
*   **Zero-Backend CMS:** Orchestrates a complex data pipeline using Google Sheets, Google Apps Script, and automated JSON synchronization.
*   **SEO Optimized:** Automatic sitemap generation (`scripts/generate-sitemap.js`) and dynamic meta-tag management for search engine visibility.

---

## 🏠 Page-by-Page Breakdown

### 1. Home (The Command Center)
*   **Animated Hero:** Features a custom Typewriter component that reveals professional titles with a blinking terminal caret.
*   **Dynamic HUD Stats:** Real-time counters for "Years of Experience," "Projects Delivered," and "Engineering Tools"—all auto-calculated from CMS data.
*   **System Status Panel:** A localized HUD box showing current availability, geolocation, and a "Tech Data Visual" scanline animation.
*   **Resume Hub:** Integrated modal system for instant viewing and downloading of professional CVs.
*   **Featured Project Explorer:** 
    *   Staggered list of top-tier projects.
    *   3D Model Preview support directly on the landing page.
    *   Smooth transitions between project selections.

### 2. About (The Engineering Profile)
*   **Professional Narrative:** Dynamic profile text pulled directly from the CMS.
*   **"What I Do" Grid:** A categorized service architecture detailing site engineering, BIM modeling, and web development capabilities.
*   **Interactive Cards:** Each capability card features a hover-reveal mechanism with unique icons.

### 3. Skills (The Technical Stack)
*   **Dual-Vector Categorization:** 
    *   **Civil/BIM Stack:** Focuses on Revit, AutoCAD, ETABS, etc.
    *   **Digital/Web Stack:** Focuses on React, modern JS, and automation.
*   **Progressive Gauges:** Visual skill bars that animate on scroll to reflect proficiency levels.
*   **Hover Descriptions:** Minute details appear when interacting with individual skill badges.

### 4. Experience & Education (The Timeline)
*   **Vertical Chronology:** A custom-built timeline component with connected nodes for career events.
*   **Role Deep-Dive:** Expandable points for each job role, detailing specific achievements and project involvements.
*   **Institution HUDs:** Education cards featuring institutional logos and specific academic highlights.

### 5. Projects (The Portfolio Gallery)
*   **Smart Categorization:** Filter systems for Civil Engineering vs. Web Design projects.
*   **Search Integration:** Real-time search that parses project titles, summaries, and technologies.
*   **HUD Project Cards:** Every project card displays metadata (Year, Category) in a specialized HUD tag.
*   **Detail Mode:** 
    *   Full-page immersive view for each project.
    *   Comprehensive breakdown: Objectives, Approach, Technical Implementation, and Key Highlights.
    *   Multi-image carousel with high-resolution scaling.

### 6. Innovation (AEC Calculation Engine)
*   **Proprietary Tools:** Showcase of custom-built tools for engineering automation.
*   **Live Interactive Calculators:** 
    *   **Beam Solver:** Simple inputs for engineering checks.
    *   **Scale Converter:** Essential for BIM/CAD practitioners.
    *   **Unit Converters:** High-precision conversion for professional workflows.

### 7. Blog (The Engineering Journal)
*   **Journalistic Layout:** Clean, readable blog cards with date and read-time metadata.
*   **Article Reader:** 
    *   Immersive markdown rendering.
    *   Scroll-tracking progress bar at the top of the article.
    *   Estimated reading time algorithm based on word count.
    *   Integrated tag filtering system to find relevant technical notes.

### 8. Contact (The Signal Gateway)
*   **Integrated Signals:** Custom form that sends data directly to a Google Sheet database.
*   **WhatsApp Deep-Link:** Floating action button that generates a pre-filled direct message for instant connection.
*   **Location HUD:** Interactive display of current professional base.

---

## 🔒 Admin Console (The Architecture)
*   **Gatekeeper:** Secure password-protected access to the management layer.
*   **Data Explorer:** A professional-grade table viewer for all CMS collections (Blog, Projects, Skills, etc.).
*   **Communications Hub:** A "Live Inbox" for monitoring contact form submissions with direct "Reply via Email" and "WhatsApp" shortcuts.
*   **Google Forms Integration:** Direct embedding of management forms for adding new items without touching code.
*   **System Documentation:** A built-in technical manual detailing the site's internals, npm modules, and sync protocols.

---

## 🛠️ Technology Highlights
*   **React 19:** Utilizing the latest concurrent rendering features.
*   **Vite:** Ultra-fast development and build environment.
*   **Framer Motion:** High-end motion design and orchestration.
*   **Lucide React:** Consistent, lightweight engineering iconography.
*   **CSS Grid/Flexbox:** Modern, responsive layout architecture.

---
*Created for Pradul P — Engineering the Future of Architectural Web Design.*
