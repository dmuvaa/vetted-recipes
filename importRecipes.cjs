// importRecipes.cjs
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word characters
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text

async function processFile(filePath) {
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    let recipesObject;
    try {
      recipesObject = JSON.parse(rawData);
    } catch (parseError) {
      console.error(`Error parsing JSON from file ${filePath}: ${parseError.message}`);
      return;
    }
    const recipesArray = Object.values(recipesObject);

    const batchSize = 1000;
    let recipesBatch = [];

    for (const recipe of recipesArray) {
      // Validate recipe object structure before adding to batch
      if (typeof recipe === 'object' && recipe.title && recipe.ingredients && recipe.instructions) {
        recipesBatch.push(recipe);
      } else {
        console.error(`Skipping incomplete or malformed recipe: ${JSON.stringify(recipe)}`);
      }

      // Insert batch when we reach the batch size
      if (recipesBatch.length >= batchSize) {
        await insertRecipesBatch(recipesBatch);
        recipesBatch = [];
      }
    }

    // Insert any remaining recipes
    if (recipesBatch.length > 0) {
      await insertRecipesBatch(recipesBatch);
    }

    console.log(`Finished processing file: ${filePath}`);
  } catch (error) {
    console.error(`Error processing file ${filePath}: ${error.message}`);
  }
}

async function insertRecipesBatch(recipesBatch) {
  try {
    const recipesWithSlugs = recipesBatch.map(recipe => {
      const { picture_link, ...rest } = recipe; // Remove picture_link field
      return {
        ...rest,
        slug: slugify(recipe.title),
      };
    });

    await prisma.recipe.createMany({
      data: recipesWithSlugs,
      skipDuplicates: true, // Skip if the recipe already exists (optional)
    });
  } catch (error) {
    console.error('Error inserting batch:', error.message);
  }
}

async function main() {
  const files = ['./recipes_ar_array.json'];

  for (const filePath of files) {
    console.log(`Processing file: ${filePath}`);
    await processFile(filePath);
  }

  await prisma.$disconnect();
  console.log('All files processed.');
}

main().catch((error) => {
  console.error('Error:', error);
  prisma.$disconnect().finally(() => {
    process.exit(1);
  });
});
