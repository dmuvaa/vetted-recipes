// // importRecipes.js

// const fs = require('fs');
// const readline = require('readline');
// const prisma = require('./lib/prisma'); // Assuming `lib/prisma.ts` is your Prisma client setup
// const slugify = require('slugify');

// async function processFile(filePath) {
//   const fileStream = fs.createReadStream(filePath);
//   const rl = readline.createInterface({
//     input: fileStream,
//     crlfDelay: Infinity
//   });

//   for await (const line of rl) {
//     try {
//       const recipe = JSON.parse(line);

//       // Create a slug from the recipe title
//       const slug = slugify(recipe.title, {
//         lower: true,
//         strict: true
//       });

//       // Insert into the database
//       await prisma.recipe.create({
//         data: {
//           recipeId: recipe.recipeId,
//           title: recipe.title,
//           slug,
//           ingredients: recipe.ingredients,
//           instructions: recipe.instructions
//         }
//       });

//       console.log(`Inserted recipe: ${recipe.title}`);
//     } catch (error) {
//       console.error(`Error processing line: ${line}`);
//       console.error(error);
//     }
//   }
// }

// async function main() {
//   const files = ['./recipes_ar.json', './recipes_epi.json', './recipes_fn.json'];
  
//   for (const filePath of files) {
//     console.log(`Processing file: ${filePath}`);
//     await processFile(filePath);
//   }

//   console.log('All files processed.');
//   await prisma.$disconnect();
// }

// main().catch((e) => {
//   console.error(e);
//   process.exit(1);
// });


// importRecipes.ts (no type annotations, for testing directly with Node.js)
const fs = require('fs');
const readline = require('readline');
const { PrismaClient } = require('@prisma/client');
const { processFile } = require('./lib/utils');

const prisma = new PrismaClient();

async function main() {
  const files = ['./recipes/recipes_ar.json', './recipes/recipes_epi.json', './recipes/recipes_fn.json'];

  for (const filePath of files) {
    console.log(`Processing file: ${filePath}`);
    try {
      await processFile(filePath, prisma);
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    }
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
