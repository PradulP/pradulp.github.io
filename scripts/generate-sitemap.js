import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '../');
const DATA_DIR = path.join(ROOT_DIR, 'src/data');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const DOMAIN = "https://pradulp.github.io"; // Use your actual domain or GitHub Pages URL

const STATIC_ROUTES = [
    '/',
    '/about',
    '/experience',
    '/education',
    '/projects',
    '/skills',
    '/blog',
    '/innovation',
    '/contact'
];

function loadJson(filename) {
    try {
        const filePath = path.join(DATA_DIR, filename);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(content);
        }
    } catch (e) {
        console.warn(`[WARN] Could not load ${filename}:`, e.message);
    }
    return null;
}

function generateSitemap() {
    console.log("Generating sitemap...");

    let urls = [...STATIC_ROUTES];

    // Blog Posts
    const blogData = loadJson('blog.json');
    if (blogData && blogData.posts) {
        blogData.posts.forEach(post => {
            const slug = post.slug || post.id;
            if (slug) urls.push(`/blog/${slug}`);
        });
    }

    // Projects
    const projectData = loadJson('Projects.json');
    if (projectData && projectData.projects) {
        projectData.projects.forEach(proj => {
            if (proj.id) urls.push(`/projects/${proj.id}`);
        });
    }

    // Innovations (Optional, if detail pages exist)
    const innovationData = loadJson('innovation.json');
    if (innovationData && innovationData.items) {
        innovationData.items.forEach(item => {
            if (item.id) urls.push(`/innovation/${item.id}`);
        });
    }

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${DOMAIN}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>
`).join('')}
</urlset>`;

    if (!fs.existsSync(PUBLIC_DIR)) {
        fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapContent);
    console.log(`Sitemap generated with ${urls.length} URLs at public/sitemap.xml`);
}

generateSitemap();
