// importRecipes.js

const fs = require('fs');
const readline = require('readline');
const prisma = require('./lib/prisma'); // Assuming `lib/prisma.ts` is your Prisma client setup
const slugify = require('slugify');

async function processFile(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
      const recipe = JSON.parse(line);

      // Create a slug from the recipe title
      const slug = slugify(recipe.title, {
        lower: true,
        strict: true
      });

      // Insert into the database
      await prisma.recipe.create({
        data: {
          recipeId: recipe.recipeId,
          title: recipe.title,
          slug,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions
        }
      });

      console.log(`Inserted recipe: ${recipe.title}`);
    } catch (error) {
      console.error(`Error processing line: ${line}`);
      console.error(error);
    }
  }
}

async function main() {
  const files = ['./data/recipes1.json', './data/recipes2.json', './data/recipes3.json'];
  
  for (const filePath of files) {
    console.log(`Processing file: ${filePath}`);
    await processFile(filePath);
  }

  console.log('All files processed.');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
