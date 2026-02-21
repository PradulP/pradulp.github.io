# Portfolio Website Documentation

## 1. Project Overview
This is a high-performance, futuristic portfolio website designed for a Civil Engineer/BIM Specialist. It features a unique **CAD/BIM-inspired UI**, 3D interactive elements, and a custom **Google Sheets-based CMS** for easy content management.

### Tech Stack
- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS, Vanilla CSS
- **Animations**: Framer Motion, GSAP (if present), Custom CSS Keyframes
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Routing**: React Router DOM v6/v7
- **Deployment**: GitHub Pages

---

## 2. Project Structure
```text
/
├── public/                 # Static assets (images, models, etc.)
├── scripts/                # Utility scripts
│   └── fetch-live-data.js  # Script to sync data from Google Sheets
├── src/
│   ├── components/         # Reusable UI components
│   ├── data/               # Content JSON files (Database)
│   ├── pages/              # Main page views
│   ├── App.jsx             # Main application entry & Routing
│   └── main.jsx            # React root injection
├── .env                    # Environment variables
├── package.json            # Dependencies & Scripts
└── vite.config.js          # Vite configuration
```

---

## 3. Page Details & Features

### **1. Home (`src/pages/Home.jsx`)**
- **Features**:
    - **3D Hero Scene**: Suspended particles animation using `react-three-fiber`.
    - **Typewriter Effect**: Animated text reveal for headings.
    - **Stats Counter**: Digital counters for "Years Experience", "Projects", etc.
- **Key Modules**: `@react-three/fiber`, `@react-three/drei`, `framer-motion`.

### **2. Projects (`src/pages/Projects.jsx`)**
- **Features**:
    - **Category Filtering**: Filter projects by "BIM", "Civil", "Dev", etc.
    - **Detail Modal/Page**: Dedicated view for project deep-dives.
    - **Video Support**: Embeds YouTube/Vimeo links.
- **Key Modules**: `react-player` (for video), `framer-motion` (for layout transitions).

### **3. Blog (`src/pages/Blog.jsx`) & Detail**
- **Features**:
    - **Reading Time**: Automatically calculated based on word count.
    - **Text-to-Speech**: Web Speech API integration to read articles aloud.
    - **Scroll Progress**: Visual indicator at the top of the page.
    - **Social Share**: Native sharing or clipboard copy.
- **Key Modules**: `framer-motion` (for scroll linked animations).

### **4. Innovation (`src/pages/Innovation.jsx`)**
- **Features**:
    - **Tools Showcase**: Similar to projects but focused on scripts/plugins.
    - **3D Viewer**: Optional integration to view 3D models (GLB/GLTF).
- **Key Modules**: `@react-three/drei` (Loader, Float, Stage).

### **5. Contact (`src/pages/Contact.jsx`)**
- **Features**:
    - **Google Sheets Integration**: Submits form data directly to a Google Sheet via Apps Script URL.
    - **WhatsApp Link Generator**: Auto-creates a pre-filled WhatsApp message link.
    - **Validation**: Ensures required fields are present before submission.
- **Key Modules**: `lucide-react` (Icons), `fetch` (Standard API).

---

## 4. CMS Architecture (Google Sheets Integration)
The website uses a "Headless CMS" approach.

1.  **Input**: The Admin user inputs data (Blogs, Projects) via **Google Forms** embedded in the `/admin` page.
2.  **Storage**: Google Forms save responses to a **Google Sheet**.
3.  **API**: A Google Apps Script exposes this data via a web app URL.
4.  **Sync**: The local script `scripts/fetch-live-data.js` fetches this data and writes it to `src/data/*.json`.

---

## 5. Content Management Guide

### Step 1: Add Content
1.  Navigate to `/admin`.
2.  Use the tabs to select "New Blog Post" or "New Project".
3.  Fill out the Google Form. The data is saved to the Cloud instantly.

### Step 2: Sync Data
1.  Open your terminal in VS Code.
2.  Run the sync command:
    ```bash
    npm run sync
    ```
3.  This downloads the new content to your local `src/data` folder.

### Step 3: Deploy
1.  Commit the new data files.
2.  Run the deploy command:
    ```bash
    npm run deploy
    ```

---

## 6. Commands Reference
- `npm run dev`: Start local development server.
- `npm run build`: Build for production.
- `npm run sync`: Fetch live data from Google Sheets.
- `npm run deploy`: Deploy to GitHub Pages.
- `npm run lint`: Check code for errors.
