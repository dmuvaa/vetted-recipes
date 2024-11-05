// cleanupDuplicatedInstructions.js

const fs = require('fs');
const path = require('path');

/**
 * Function to detect duplicated instructions.
 * If duplication is found, it retains only the second occurrence.
 * Assumes that the entire instructions string is duplicated.
 *
 * @param {string} instructions - The instructions text.
 * @returns {string} - The cleaned instructions.
 */
function cleanInstructions(instructions) {
  // Normalize line endings
  const normalized = instructions.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Split instructions into lines
  const lines = normalized.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  const totalLines = lines.length;

  // Check if the number of lines is even
  if (totalLines % 2 !== 0) {
    // Odd number of lines; unlikely to have exact duplication
    return instructions; // Return original
  }

  const half = totalLines / 2;
  const firstHalf = lines.slice(0, half).join('\n');
  const secondHalf = lines.slice(half).join('\n');

  if (firstHalf === secondHalf) {
    // Duplication detected; return the second half
    return secondHalf;
  }

  // No duplication detected; return original
  return instructions;
}

/**
 * Main function to process the JSON file.
 */
function processRecipes() {
  const inputFilePath = path.join(__dirname, 'recipes_epi_cleaned.json');
  const outputFilePath = path.join(__dirname, 'recipes_epi_cleaned_final.json');

  console.log('Reading the duplicated JSON file...');

  // Read the JSON file
  let data;
  try {
    const fileContent = fs.readFileSync(inputFilePath, 'utf8');
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading or parsing the JSON file:', error);
    process.exit(1);
  }

  console.log('Processing recipes to clean duplicated instructions...');

  let duplicateCount = 0;

  // Iterate over each recipe
  for (const [id, recipe] of Object.entries(data)) {
    if (recipe.instructions && typeof recipe.instructions === 'string') {
      const cleanedInstructions = cleanInstructions(recipe.instructions);
      if (cleanedInstructions !== recipe.instructions) {
        // Duplication was found and cleaned
        data[id].instructions = cleanedInstructions;
        duplicateCount += 1;
      }
    }
  }

  console.log(`Found and cleaned ${duplicateCount} recipes with duplicated instructions.`);

  // Write the cleaned data to a new JSON file
  try {
    fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Cleaned data has been written to ${outputFilePath}`);
  } catch (error) {
    console.error('Error writing the cleaned JSON file:', error);
    process.exit(1);
  }
}

// Execute the main function
processRecipes();
