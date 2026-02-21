import React from 'react';

const AdminDocumentation = () => {
    return (
        <div className="h-full overflow-y-auto p-8 text-slate-300 space-y-8 pb-24">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 border-b border-slate-800 pb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">Website Documentation</h1>
                    <p className="text-slate-400">Comprehensive guide to the architecture, features, and management of the portfolio.</p>
                </header>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-sky-400 flex items-center gap-2">
                        1. Project Overview
                    </h2>
                    <p>
                        This is a high-performance, futuristic portfolio website designed for a Civil Engineer/BIM Specialist.
                        It features a unique <strong>CAD/BIM-inspired UI</strong>, 3D interactive elements, and a custom
                        <strong> Google Sheets-based CMS</strong> for easy content management.
                    </p>
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                        <h3 className="font-semibold text-slate-200 mb-2">Tech Stack</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                            <li><strong>Framework:</strong> React 19 (via Vite)</li>
                            <li><strong>Styling:</strong> Tailwind CSS, Vanilla CSS</li>
                            <li><strong>Animations:</strong> Framer Motion, GSAP</li>
                            <li><strong>3D Graphics:</strong> Three.js, React Three Fiber</li>
                            <li><strong>Routing:</strong> React Router DOM v6/v7</li>
                        </ul>
                    </div>
                </section>

                <section className="space-y-4 pt-6">
                    <h2 className="text-xl font-bold text-sky-400">2. Dependencies (NPM Modules)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <h3 className="font-bold text-emerald-400 mb-2">Core & Styling</h3>
                            <ul className="text-sm space-y-2 text-slate-400">
                                <li><code className="bg-slate-800 px-1 py-0.5 rounded text-slate-200">react-router-dom</code>: Client-side routing.</li>
                                <li><code className="bg-slate-800 px-1 py-0.5 rounded text-slate-200">tailwindcss</code>: Utility-first CSS.</li>
                                <li><code className="bg-slate-800 px-1 py-0.5 rounded text-slate-200">lucide-react</code>: Iconography.</li>
                            </ul>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <h3 className="font-bold text-violet-400 mb-2">Animation & 3D</h3>
                            <ul className="text-sm space-y-2 text-slate-400">
                                <li><code className="bg-slate-800 px-1 py-0.5 rounded text-slate-200">framer-motion</code>: Page transitions & effects.</li>
                                <li><code className="bg-slate-800 px-1 py-0.5 rounded text-slate-200">@react-three/fiber</code>: 3D Rendering.</li>
                                <li><code className="bg-slate-800 px-1 py-0.5 rounded text-slate-200">@react-three/drei</code>: 3D Helpers.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="space-y-4 pt-6">
                    <h2 className="text-xl font-bold text-sky-400">3. Features & Architecture</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-200">CAD/BIM Theme</h3>
                            <p className="text-slate-400 text-sm mt-1">
                                The application simulates professional engineering software using a
                                <code className="mx-1 text-sky-300">CadUIController</code> and
                                <code className="mx-1 text-sky-300">AutoCADCommandLine</code> component.
                                Key features include a custom crosshair cursor and data overlays.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-slate-200">CMS Architecture</h3>
                            <p className="text-slate-400 text-sm mt-1 mb-2">
                                "Headless CMS" using Google Sheets.
                            </p>
                            <ol className="list-decimal list-inside space-y-1 text-sm text-slate-400 bg-slate-900 p-4 rounded border border-slate-800">
                                <li>Admin inputs data via <strong>Google Forms</strong> (embedded in this panel).</li>
                                <li>Forms save responses to a <strong>Google Sheet</strong>.</li>
                                <li><strong>Google Apps Script</strong> exposes data via JSON API.</li>
                                <li>Local script <code className="text-sky-300">npm run sync</code> fetches data to <code className="text-sky-300">src/data/*.json</code>.</li>
                            </ol>
                        </div>
                    </div>
                </section>

                <section className="space-y-4 pt-6">
                    <h2 className="text-xl font-bold text-sky-400">4. File Structure & Purpose</h2>
                    <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800 font-mono text-xs overflow-x-auto">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-emerald-400 font-bold mb-2 uppercase tracking-wider">/src (Core)</h4>
                                    <ul className="space-y-1 text-slate-400">
                                        <li><span className="text-sky-300">App.jsx</span> : Main Router & Layout</li>
                                        <li><span className="text-sky-300">main.jsx</span> : React Entry Point</li>
                                        <li><span className="text-sky-300">index.css</span> : Global Styles (Tailwind)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-emerald-400 font-bold mb-2 uppercase tracking-wider">/src/pages (Views)</h4>
                                    <ul className="space-y-1 text-slate-400 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                                        <li><span className="text-sky-300">Home.jsx</span> : Landing Page</li>
                                        <li><span className="text-sky-300">Projects.jsx</span> : Portfolio Gallery</li>
                                        <li><span className="text-sky-300">Blog.jsx</span> : Engineering Journal</li>
                                        <li><span className="text-sky-300">Experience.jsx</span> : Resume Timeline</li>
                                        <li><span className="text-sky-300">Contact.jsx</span> : Message Form</li>
                                        <li><span className="text-sky-300">Admin.jsx</span> : CMS Dashboard</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-emerald-400 font-bold mb-2 uppercase tracking-wider">/src/components (UI)</h4>
                                    <ul className="space-y-1 text-slate-400 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                                        <li><span className="text-violet-400">Navbar/Footer.jsx</span> : Global UI</li>
                                        <li><span className="text-violet-400">Hero.jsx</span> : 3D Intro Section</li>
                                        <li><span className="text-violet-400">CadUIController.jsx</span> : Custom Cursor</li>
                                        <li><span className="text-violet-400">ProjectCard.jsx</span> : Gallery Item</li>
                                        <li><span className="text-violet-400">AdminDocumentation.jsx</span> : This File</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-emerald-400 font-bold mb-2 uppercase tracking-wider">/src/data (Content)</h4>
                                    <ul className="space-y-1 text-slate-400">
                                        <li><span className="text-amber-300">blog.json</span> : Blog Posts</li>
                                        <li><span className="text-amber-300">Projects.json</span> : Portfolio Items</li>
                                        <li><span className="text-amber-300">skills.json</span> : Skill Ratings</li>
                                        <li><span className="text-white opactiy-50">INSTRUCTIONS_*.md</span> : User Guides</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-emerald-400 font-bold mb-2 uppercase tracking-wider">/public (Assets)</h4>
                                    <ul className="space-y-1 text-slate-400">
                                        <li><span className="text-pink-300">images/</span> : Static Images</li>
                                        <li><span className="text-pink-300">models/</span> : 3D GLB/GLTF Models</li>
                                        <li><span className="text-pink-300">Pradul_cv.pdf</span> : Resume Download</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-emerald-400 font-bold mb-2 uppercase tracking-wider">/scripts (Tools)</h4>
                                    <ul className="space-y-1 text-slate-400">
                                        <li><span className="text-green-400">fetch-live-data.js</span> : Google Sync Script</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-4 pt-6">
                    <h2 className="text-xl font-bold text-sky-400">5. Page-by-Page Details</h2>
                    <div className="space-y-6">
                        {[
                            {
                                name: "Home",
                                path: "src/pages/Home.jsx",
                                features: ["3D Hero Scene with suspended particles", "Animated Text Reveal (Typewriter)", "Featured Projects Carousel", "Stats Counter"],
                                modules: ["@react-three/fiber", "@react-three/drei", "framer-motion"]
                            },
                            {
                                name: "Projects & Innovation",
                                path: "src/pages/Projects.jsx",
                                features: ["Category Filtering", "Masonry-style Grid", "Detail View with Video Support", "3D Model Preview (Innovation)"],
                                modules: ["react-player (Videos)", "framer-motion (Layout)", "lucide-react"]
                            },
                            {
                                name: "Blog & Detail",
                                path: "src/pages/Blog.jsx",
                                features: ["Tag-based Filtering", "Reading Time Calculation", "Text-to-Speech (Web Speech API)", "Scroll Progress Bar", "Social Sharing"],
                                modules: ["react-router-dom", "framer-motion"]
                            },
                            {
                                name: "Contact",
                                path: "src/pages/Contact.jsx",
                                features: ["Google Sheets Integration (No Backend)", "WhatsApp Deep Link Generator", "Form Validation", "Success/Error Modals"],
                                modules: ["fetch (Native API)", "lucide-react", "framer-motion"]
                            },
                            {
                                name: "Admin Dashboard",
                                path: "src/pages/Admin.jsx",
                                features: ["Client-side Authentication", "Google Forms Embedding", "JSON Data Viewer", "Configuration Management"],
                                modules: ["react-router-dom", "lucide-react", "localStorage API"]
                            }
                        ].map((page) => (
                            <div key={page.name} className="bg-slate-900/40 border border-slate-800 rounded-lg p-5 hover:border-sky-500/30 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-slate-800 pb-3">
                                    <h3 className="font-bold text-slate-200 text-lg">{page.name}</h3>
                                    <code className="text-xs text-sky-400 font-mono bg-sky-950/30 px-2 py-1 rounded border border-sky-500/20">{page.path}</code>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">Key Features</h4>
                                        <ul className="list-disc list-inside space-y-1">
                                            {page.features.map((f, i) => (
                                                <li key={i} className="text-sm text-slate-400">{f}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-2">Modules / Tech</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {page.modules.map((m, i) => (
                                                <span key={i} className="text-xs text-slate-300 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-4 pt-6">
                    <h2 className="text-xl font-bold text-sky-400">6. How to Add Content</h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="bg-emerald-900/10 border border-emerald-500/20 p-5 rounded-xl">
                            <h3 className="font-bold text-emerald-400 mb-2 uppercase tracking-wider text-sm">Step 1: Input</h3>
                            <p className="text-sm text-slate-300 mb-2">
                                Use the tabs on the left (New Blog Post, New Project) to open the Google Form.
                            </p>
                            <p className="text-xs text-slate-500">
                                Fill out the details and submit. The data is instantly saved to your Google Sheet.
                            </p>
                        </div>

                        <div className="bg-sky-900/10 border border-sky-500/20 p-5 rounded-xl">
                            <h3 className="font-bold text-sky-400 mb-2 uppercase tracking-wider text-sm">Step 2: Sync</h3>
                            <p className="text-sm text-slate-300 mb-2">
                                Open your terminal and run:
                            </p>
                            <code className="block bg-slate-950 p-2 rounded text-sky-300 text-xs mb-2">
                                npm run sync
                            </code>
                            <p className="text-xs text-slate-500">
                                This fetches the latest data from the sheet and updates your local website files.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4 pt-6 border-t border-slate-800 mt-8">
                    <h2 className="text-xl font-bold text-slate-200">Deployment</h2>
                    <p className="text-slate-400">
                        To update the live site on GitHub Pages:
                    </p>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-sm text-slate-300">
                        <div className="text-slate-500"># 1. Sync Data</div>
                        <div>npm run sync</div>
                        <div className="text-slate-500 mt-2"># 2. Build & Deploy</div>
                        <div>npm run deploy</div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminDocumentation;
