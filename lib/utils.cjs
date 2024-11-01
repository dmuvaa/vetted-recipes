// lib/utils.cjs
const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function processFile(filePath) {
  const fileStream = createReadStream(filePath);
  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const batchSize = 1000;
  const recipesBatch = [];
  let lineNumber = 0;

  for await (const line of rl) {
    lineNumber++;
    try {
      const recipe = JSON.parse(line.trim());

      if (typeof recipe === 'object' && recipe.title && recipe.ingredients && recipe.instructions) {
        recipesBatch.push(recipe);
      } else {
        console.error(`Skipping incomplete or malformed recipe at line ${lineNumber}: ${line}`);
      }

      // Insert batch when we reach the batch size
      if (recipesBatch.length >= batchSize) {
        await insertRecipesBatch(recipesBatch);
        recipesBatch.length = 0;
      }
    } catch (error) {
      console.error(`Error parsing JSON at line ${lineNumber}: ${error.message}`);
    }
  }

  // Insert any remaining recipes
  if (recipesBatch.length > 0) {
    await insertRecipesBatch(recipesBatch);
  }

  console.log(`Finished processing file: ${filePath}`);
}

async function insertRecipesBatch(recipesBatch) {
  try {
    await prisma.recipe.createMany({
      data: recipesBatch,
      skipDuplicates: true, // Skip if the recipe already exists (optional)
    });
  } catch (error) {
    console.error('Error inserting batch:', error.message);
  }
}

module.exports = {
  processFile
};
