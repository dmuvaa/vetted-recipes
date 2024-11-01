"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function convertToLineSeparatedJson(inputPath, outputPath) {
    var rawData = fs_1.default.readFileSync(inputPath, 'utf-8');
    var jsonObject = JSON.parse(rawData);
    var recipesArray = Object.values(jsonObject);
    var outputStream = fs_1.default.createWriteStream(outputPath, { flags: 'w' });
    recipesArray.forEach(function (recipe) {
        outputStream.write(JSON.stringify(recipe) + '\n');
    });
    outputStream.end();
}
convertToLineSeparatedJson('./recipes_test.json', './recipes_test_lines.json');
