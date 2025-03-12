const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const BASE_URL = "https://www.vettedrecipes.com";
const MAX_URLS_PER_SITEMAP = 8000;
const CONCURRENCY_LIMIT = 5; // Adjust this number based on your system/network capacity

async function crawlSite(startUrl) {
  const browser = await puppeteer.launch({ headless: true });
  const visitedUrls = new Set();
  const toVisit = new Set([startUrl]);
  let processedCount = 0;

  // Worker function that reuses a page
  async function worker(page) {
    while (true) {
      let url;
      // If no URLs to process, wait briefly before checking again
      if (toVisit.size === 0) {
        await new Promise((r) => setTimeout(r, 100));
        if (toVisit.size === 0) break;
      }
      // Get the next URL from the set
      url = toVisit.values().next().value;
      toVisit.delete(url);

      if (visitedUrls.has(url)) continue;
      visitedUrls.add(url);

      try {
        await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
        // Extract all links that start with the same origin
        const links = await page.evaluate(() =>
          Array.from(document.querySelectorAll("a[href]"))
            .map(a => a.href)
            .filter(href => href.startsWith(window.location.origin))
        );
        // Add new links to the toVisit set
        links.forEach(link => {
          if (!visitedUrls.has(link)) {
            toVisit.add(link);
          }
        });
        processedCount++;
        if (processedCount % 5000 === 0) {
          console.log(`Discovered ${processedCount} URLs so far.`);
        }
      } catch (error) {
        console.warn(`⚠️ Failed to load ${url}: ${error.message}`);
      }
    }
  }

  // Create a pool of pages/workers
  const pages = await Promise.all(
    Array.from({ length: CONCURRENCY_LIMIT }, () => browser.newPage())
  );

  // Run all workers concurrently
  await Promise.all(pages.map(page => worker(page)));

  // Clean up
  await Promise.all(pages.map(page => page.close()));
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
