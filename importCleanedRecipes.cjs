// importCleanedRecipes.js

const fs = require('fs');
const path = require('path');

/**
 * Cleans duplicated instructions by:
 * 1. Removing any content before the first newline character.
 * 2. Removing exact half duplications.
 * 3. Removing repeated individual steps.
 *
 * @param {string} instructions - The instructions text.
 * @returns {string} - Cleaned instructions.
 */
function cleanInstructions(instructions) {
  if (!instructions || typeof instructions !== 'string') {
    return instructions; // Return as is if instructions are missing or not a string
  }

  // Step 1: Remove content before the first newline
  const firstNewlineIndex = instructions.indexOf('\n');
  let cleaned = instructions;
  if (firstNewlineIndex !== -1) {
    cleaned = instructions.substring(firstNewlineIndex + 1).trim();
  }

  // Normalize line endings and trim whitespace
  cleaned = cleaned.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();

  // Split instructions into individual steps
  const steps = cleaned.split('\n').map(step => step.trim()).filter(step => step.length > 0);

  // Step 2: Remove exact half duplications
  const totalSteps = steps.length;
  if (totalSteps % 2 === 0) {
    const half = totalSteps / 2;
    const firstHalf = steps.slice(0, half).join('\n');
    const secondHalf = steps.slice(half).join('\n');

    if (firstHalf === secondHalf) {
      // Duplication detected; retain only the second half
      cleaned = secondHalf;
    }
  }

  // Step 3: Remove repeated individual steps
  const seenSteps = new Set();
  const uniqueSteps = [];

  for (const step of steps) {
    if (!seenSteps.has(step)) {
      uniqueSteps.push(step);
      seenSteps.add(step);
    }
    // If step is a duplicate, skip it
  }

  // Reconstruct the instructions
  cleaned = uniqueSteps.join('\n');

  return cleaned;
}

/**
 * Processes the recipes JSON file to clean duplicated instructions.
 *
 * @param {string} inputFilePath - Path to the duplicated JSON file.
 * @param {string} outputFilePath - Path to save the cleaned JSON file.
 */
function processRecipes(inputFilePath, outputFilePath) {
  // Check if input file exists
  if (!fs.existsSync(inputFilePath)) {
    console.error(`Error: The file ${inputFilePath} does not exist.`);
    return;
  }

  console.log('Loading data from JSON file...');

  let data;
  try {
    const fileContent = fs.readFileSync(inputFilePath, 'utf-8');
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading or parsing the JSON file: ${error.message}`);
    return;
  }

  console.log('Processing recipes to clean duplicated instructions...');

  let duplicateCount = 0;
  const totalRecipes = Object.keys(data).length;

  for (const [id, recipe] of Object.entries(data)) {
    if (recipe.instructions && typeof recipe.instructions === 'string') {
      const originalInstructions = recipe.instructions;
      const cleanedInstructions = cleanInstructions(originalInstructions);

      if (cleanedInstructions !== originalInstructions) {
        data[id].instructions = cleanedInstructions;
        duplicateCount += 1;
        console.log(`Cleaned Recipe ID: ${id}, Title: "${recipe.title.trim()}"`);
      }
    }
  }

  console.log(`\nFound and cleaned ${duplicateCount} recipes with duplicated instructions out of ${totalRecipes} total recipes.`);

  console.log(`Saving cleaned data to ${outputFilePath}...`);

  try {
    fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Cleanup completed successfully.');
  } catch (error) {
    console.error(`Error writing to output file: ${error.message}`);
  }
}

// Define input and output file paths
const INPUT_FILE = path.join(__dirname, 'recipes_epi_cleaned.json');
const OUTPUT_FILE = path.join(__dirname, 'recipes_epi_cleaned_final.json');

// Execute the cleanup process
processRecipes(INPUT_FILE, OUTPUT_FILE);
