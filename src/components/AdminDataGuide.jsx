import React from 'react';

const AdminDataGuide = () => {
    return (
        <div className="h-full overflow-y-auto p-8 text-slate-300 space-y-8 pb-24">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 border-b border-slate-800 pb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">Data Dictionary & Form Guide</h1>
                    <p className="text-slate-400">A strict reference guide on how to format text inside the Google Forms so it renders beautifully on the website.</p>
                </header>

                {/* GENERAL RULES */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-xl font-bold text-sky-400 flex items-center gap-2">
                        1. General Rules
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-400 bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                        <li><strong>Simple Lists (Arrays):</strong> Anywhere the UI expects a simple list (like "Tech Stack", "Highlights", "Use Cases"), you MUST separate items with a double-pipe <code className="text-sky-300">||</code>. Example: <code className="text-sky-300">React || Node.js || Python || AWS</code>. (Using a single pipe <code className="text-sky-300">|</code> still works as a fallback).</li>
                        <li><strong>Complex Lists (Titles & Descriptions):</strong> For structured data with a title and description (like the "Approach" or "Objectives" in Projects), use a double-colon <code className="text-emerald-400">::</code> between the Title and Description, and separate the steps with <code className="text-sky-300">||</code>. <br /><br />
                            <em>Example:</em> <code className="text-emerald-300">Site Planning :: Studied orientation and sun || Architectural Modeling :: Developed models in Revit</code> <br />
                            (This replaces the need to write raw JSON like <code className="text-slate-500">{`[{"title":"...","desc":"..."}]`}</code>).
                        </li>
                        <li><strong>Images:</strong> The <code className="text-sky-300">image</code> field expects a DIRECT URL starting with <code className="text-sky-300">https://</code>. You can copy image link addresses from unsplash, imgur, etc. If left blank, the system will try to auto-map a default.</li>
                        <li><strong>Visibility:</strong> Almost every form will have a "Visible" field. Use exactly <code className="text-emerald-400">true</code> to show it on the site, and <code className="text-red-400">false</code> to hide/draft it.</li>
                        <li><strong>Dates:</strong> Use a consistent format. Example: <code className="text-sky-300">Mar 2024</code> or <code className="text-sky-300">12 Oct 2024</code>.</li>
                    </ul>
                </section>

                <div className="grid gap-8">
                    {/* BLOG POSTS */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 hover:border-sky-500/30 transition-colors">
                        <h3 className="font-bold text-slate-200 text-lg border-b border-slate-800 pb-2 mb-4">Blog Posts</h3>
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                            <div><strong className="text-sky-400">title</strong>: Headline of the post</div>
                            <div><strong className="text-sky-400">date</strong>: Formatted Date (e.g. Oct 2024)</div>
                            <div><strong className="text-sky-400">tag</strong>: Primary category (e.g. Automation, Development)</div>
                            <div><strong className="text-sky-400">readtime</strong>: Number + string (e.g. 5 min read)</div>
                            <div className="md:col-span-2"><strong className="text-sky-400">summary</strong>: 1-2 sentences shown on the card</div>
                            <div className="md:col-span-2"><strong className="text-sky-400">content</strong>: The full article. You can use standard text. Paragraphs are supported if you hit enter.</div>
                            <div className="md:col-span-2"><strong className="text-emerald-400">image</strong> (Optional): URL to a header image</div>
                        </div>
                    </div>

                    {/* INNOVATION (ENGINEERING SYSTEMS) */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
                        <h3 className="font-bold text-slate-200 text-lg border-b border-slate-800 pb-2 mb-4">Innovation / Systems</h3>
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                            <div><strong className="text-emerald-400">title</strong>: Name of the tool/system</div>
                            <div><strong className="text-emerald-400">type</strong>: Category (e.g. pyRevit, LISP, Web App)</div>
                            <div><strong className="text-emerald-400">status</strong>: Text tag (e.g. IN_PRODUCTION, EXPERIMENTAL)</div>
                            <div className="md:col-span-2"><strong className="text-emerald-400">tech</strong>: COMMA SEPARATED list of tools used</div>
                            <div className="md:col-span-2"><strong className="text-emerald-400">description</strong>: Short 1-sentence summary</div>
                            <div className="md:col-span-2"><strong className="text-emerald-400">details</strong>: Long paragraph detailing the underlying technical logic</div>
                            <div className="md:col-span-2"><strong className="text-amber-400">features</strong>: COMMA SEPARATED list of key capabilities</div>
                            <div className="md:col-span-2"><strong className="text-amber-400">use_cases</strong>: COMMA SEPARATED list of practical applications</div>
                            <div className="md:col-span-2"><strong className="text-amber-400">impact</strong>: Short paragraph describing what the system improved</div>
                            <div><strong className="text-pink-400">demo_link</strong> (Optional): URL to live app / youtube video</div>
                            <div><strong className="text-pink-400">repo_link</strong> (Optional): URL to GitHub</div>
                            <div className="md:col-span-2"><strong className="text-violet-400">image / glimpse</strong> (Optional): URL to a cover image/GIF</div>
                        </div>
                    </div>

                    {/* PROJECTS */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 hover:border-violet-500/30 transition-colors">
                        <h3 className="font-bold text-slate-200 text-lg border-b border-slate-800 pb-2 mb-4">Projects</h3>
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                            <div><strong className="text-violet-400">title</strong>: Main Title</div>
                            <div><strong className="text-violet-400">subtitle</strong>: Catchy secondary title</div>
                            <div><strong className="text-violet-400">category</strong>: Filtering category (e.g. Civil Engineering)</div>
                            <div><strong className="text-violet-400">role</strong>: Your specific role</div>
                            <div><strong className="text-violet-400">year / duration</strong>: Timeline (e.g. Q3 2023)</div>
                            <div className="md:col-span-2"><strong className="text-violet-400">summary</strong>: The elevator pitch of the project</div>
                            <div className="md:col-span-2"><strong className="text-violet-400">tech</strong>: <code className="text-xs">React || Node || Python</code></div>
                            <div className="md:col-span-2"><strong className="text-amber-400">highlights</strong>: <code className="text-xs">Bullet 1 || Bullet 2 || Bullet 3</code></div>
                            <div className="md:col-span-2"><strong className="text-amber-400">approach</strong>: <code className="text-xs">Phase 1 :: Description here || Phase 2 :: Description here</code></div>
                            <div className="md:col-span-2"><strong className="text-pink-400">image</strong>: Direct URL for the thumbnail image</div>
                            <div className="md:col-span-2"><strong className="text-pink-400">links object -&gt; demo/repo</strong>: Separate columns in sheet for URLs. Use JSON for complex links list: <code className="text-xs">{`{"demo":"https://..."}`}</code></div>
                        </div>
                    </div>

                    {/* EXPERIENCE */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 hover:border-blue-500/30 transition-colors">
                        <h3 className="font-bold text-slate-200 text-lg border-b border-slate-800 pb-2 mb-4">Experience</h3>
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                            <div><strong className="text-blue-400">title</strong>: Your Job Title (e.g. Junior Engineer)</div>
                            <div><strong className="text-blue-400">company</strong>: Name of the Company</div>
                            <div><strong className="text-blue-400">period</strong>: Timeline (e.g. 2024 - Present)</div>
                            <div><strong className="text-blue-400">location</strong>: Office Location</div>
                            <div className="md:col-span-2"><strong className="text-amber-400">description</strong>: COMMA SEPARATED list of your specific achievements or duties (e.g. Developed X, Designed Y)</div>
                            <div className="md:col-span-2"><strong className="text-amber-400">tech</strong>: COMMA SEPARATED list of technologies used</div>
                        </div>
                    </div>

                    {/* EDUCATION */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 hover:border-yellow-500/30 transition-colors">
                        <h3 className="font-bold text-slate-200 text-lg border-b border-slate-800 pb-2 mb-4">Education</h3>
                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                            <div><strong className="text-yellow-400">degree</strong>: Degree Name (e.g. B.Tech in Civil Engineering)</div>
                            <div><strong className="text-yellow-400">place</strong>: Institution Name</div>
                            <div><strong className="text-yellow-400">years</strong>: Timeline (e.g. 2020 - 2024)</div>
                            <div><strong className="text-yellow-400">location</strong>: University Location</div>
                            <div className="md:col-span-2"><strong className="text-amber-400">description</strong>: Short paragraph summarizing your academic focus</div>
                            <div className="md:col-span-2"><strong className="text-amber-400">achievements</strong>: COMMA SEPARATED list of honors, clubs, etc.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDataGuide;
