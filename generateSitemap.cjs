const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE_URL = "https://www.vettedrecipes.com";
const MAX_URLS_PER_SITEMAP = 8000;

async function crawlSite(startUrl) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const visitedUrls = new Set();
    const toVisit = new Set([startUrl]);

    console.log("🔍 Crawling site for URLs...");

    while (toVisit.size > 0) {
        const url = Array.from(toVisit)[0];
        toVisit.delete(url);
        visitedUrls.add(url);

        try {
            await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

            // Extract all links from the page
            const links = await page.evaluate(() =>
                Array.from(document.querySelectorAll("a[href]"))
                    .map(a => a.href)
                    .filter(href => href.startsWith(window.location.origin))
            );

            // Add new links to the queue
            links.forEach(link => {
                if (!visitedUrls.has(link) && !toVisit.has(link)) {
                    toVisit.add(link);
                }
            });

        } catch (error) {
            console.warn(`⚠️ Failed to load ${url}:`, error.message);
        }
    }

    await browser.close();
    console.log(`✅ Crawled ${visitedUrls.size} pages.`);
    return Array.from(visitedUrls);
}

async function generateSitemaps(urls) {
    console.log("📝 Generating sitemaps...");

    const sitemapFiles = [];
    const totalSitemaps = Math.ceil(urls.length / MAX_URLS_PER_SITEMAP);

    for (let i = 0; i < totalSitemaps; i++) {
        const start = i * MAX_URLS_PER_SITEMAP;
        const end = start + MAX_URLS_PER_SITEMAP;
        const sitemapUrls = urls.slice(start, end);

        const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `
    <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`).join("")}
</urlset>`;

        const sitemapFilename = `sitemap-${i + 1}.xml`;
        fs.writeFileSync(path.join("public", sitemapFilename), sitemapContent);
        sitemapFiles.push(`${BASE_URL}/${sitemapFilename}`);
    }

    // Generate sitemap index
    const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles.map(file => `<sitemap><loc>${file}</loc></sitemap>`).join("\n")}
</sitemapindex>`;

    fs.writeFileSync(path.join("public", "sitemap.xml"), sitemapIndexContent);
    console.log("✅ Sitemaps generated successfully!");
}

async function main() {
    const allUrls = await crawlSite(BASE_URL);
    await generateSitemaps(allUrls);
}

main();