const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const BASE_URL = "https://www.vettedrecipes.com";
const MAX_URLS_PER_SITEMAP = 8000;
const CONCURRENCY_LIMIT = 50; // Adjust based on your network capacity

async function crawlSite(startUrl) {
  console.log("🔍 Starting to Discover pages");
  console.log(`Starting with base URL: ${startUrl}`);

  // Initialize with the starting URL marked as visited
  const visitedUrls = new Set([startUrl]);
  const toVisit = [startUrl];
  let discoveredCount = 1; // already have startUrl

  // Function to process a single URL: fetch and extract links
  async function processUrl(url) {
    console.log(`\n[PROCESSING] URL: ${url}`);
    try {
      const { data: html } = await axios.get(url, { timeout: 30000 });
      console.log(`[SUCCESS] Fetched URL: ${url}`);
      const $ = cheerio.load(html);

      const newLinks = [];
      $("a[href]").each((i, el) => {
        let link = $(el).attr("href");
        if (!link) return;

        // If link is relative, resolve it to an absolute URL
        if (link.startsWith("/")) {
          link = new URL(link, BASE_URL).href;
        }
        // Only process links that start with the BASE_URL
        if (link.startsWith(BASE_URL) && !visitedUrls.has(link)) {
          visitedUrls.add(link);
          toVisit.push(link);
          discoveredCount++;
          newLinks.push(link);
          console.log(`[DISCOVERED] New page: ${link}`);
          if (discoveredCount % 5000 === 0) {
            console.log(`*** Total pages discovered so far: ${discoveredCount} ***`);
          }
        }
      });
      console.log(`[EXTRACTED] ${newLinks.length} new links from: ${url}`);
    } catch (error) {
      console.warn(`[ERROR] Failed to load ${url}: ${error.message}`);
    }
  }

  // Process URLs concurrently using a batching mechanism
  while (toVisit.length > 0) {
    const batch = toVisit.splice(0, CONCURRENCY_LIMIT);
    console.log(`\n[QUEUE] Processing a batch of ${batch.length} URLs. Remaining in queue: ${toVisit.length}`);
    await Promise.all(batch.map(url => processUrl(url)));
    console.log(`[BATCH COMPLETE] Total pages discovered so far: ${discoveredCount}`);
  }

  console.log(`\n✅ Crawled ${visitedUrls.size} pages.`);
  return Array.from(visitedUrls);
}

async function generateSitemaps(urls) {
  console.log("\n📝 Starting sitemap generation...");
  const sitemapFiles = [];
  const totalSitemaps = Math.ceil(urls.length / MAX_URLS_PER_SITEMAP);

  for (let i = 0; i < totalSitemaps; i++) {
    console.log(`\n[GENERATING] Sitemap ${i + 1} of ${totalSitemaps}`);
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
    console.log(`[WRITTEN] Sitemap file created: ${sitemapFilename}`);
    sitemapFiles.push(`${BASE_URL}/${sitemapFilename}`);
  }

  // Generate sitemap index
  const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles.map(file => `<sitemap><loc>${file}</loc></sitemap>`).join("\n")}
</sitemapindex>`;

  fs.writeFileSync(path.join("public", "sitemap.xml"), sitemapIndexContent);
  console.log("[WRITTEN] Sitemap index file created: sitemap.xml");
  console.log("✅ Sitemaps generated successfully!");
}

async function main() {
  console.log("🚀 Starting main crawl process");
  const allUrls = await crawlSite(BASE_URL);
  console.log(`\n[SUMMARY] Total URLs discovered: ${allUrls.length}`);
  await generateSitemaps(allUrls);
  console.log("\n🚀 Process completed");
}

main();
