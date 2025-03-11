const fs = require("fs");
const path = require("path");

const BASE_URL = "https://www.vettedrecipes.com";
const MAX_URLS_PER_SITEMAP = 5000;

// Mock function - Replace with actual API/database fetch
async function getAllRecipeUrls() {
  // Replace this with real URLs fetched from your database
  return [...Array(111000)].map((_, i) => `/recipe-${i + 1}`);
}

async function generateSitemaps() {
  const urls = await getAllRecipeUrls();
  const totalSitemaps = Math.ceil(urls.length / MAX_URLS_PER_SITEMAP);
  const sitemapIndex = [];

  for (let i = 0; i < totalSitemaps; i++) {
    const start = i * MAX_URLS_PER_SITEMAP;
    const end = start + MAX_URLS_PER_SITEMAP;
    const sitemapUrls = urls.slice(start, end);

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (url) => `
    <url>
        <loc>${BASE_URL}${url}</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`
  )
  .join("")}
</urlset>`;

    const sitemapFilename = `sitemap-${i + 1}.xml`;
    fs.writeFileSync(path.join("public", sitemapFilename), sitemapContent);
    sitemapIndex.push(`<sitemap><loc>${BASE_URL}/${sitemapFilename}</loc></sitemap>`);
  }

  // Generate sitemap index
  const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndex.join("\n")}
</sitemapindex>`;

  fs.writeFileSync(path.join("public", "sitemap.xml"), sitemapIndexContent);
}

generateSitemaps().then(() => console.log("Sitemaps generated!"));

