// convertJson.cjs
const fs = require('fs');

function convertToJsonArray(inputPath, outputPath) {
  const rawData = fs.readFileSync(inputPath);
  let jsonObject;

  try {
    jsonObject = JSON.parse(rawData);
  } catch (error) {
    console.error(`Error parsing JSON from ${inputPath}:`, error);
    return;
  }

  const recipesArray = Object.values(jsonObject);
  const outputStream = fs.createWriteStream(outputPath, { flags: 'w' });

  // Start array
  outputStream.write('[\n');

  recipesArray.forEach((recipe, index) => {
    try {
      if (recipe && typeof recipe === 'object') {
        outputStream.write(JSON.stringify(recipe));
        if (index < recipesArray.length - 1) {
          outputStream.write(',\n'); // Add comma for all but the last item
        }
      }
    } catch (error) {
      console.error(`Error writing recipe: ${recipe}`, error);
    }
  });

  // End array
  outputStream.write('\n]\n');
  outputStream.end();
}

// convertToJsonArray('./recipes_test.json', './recipes_test_array.json');
convertToJsonArray('./recipes_fn.json', './recipes_fn_array.json');
