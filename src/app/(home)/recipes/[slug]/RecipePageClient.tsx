'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Recipe {
  id: string;
  title: string;
  slug: string;
  ingredients: string[];
  instructions: string;
  createdAt: string;
  updatedAt: string;
}

interface RecipePageClientProps {
  recipe?: Recipe; // Make recipe optional to handle undefined case
}

export default function RecipePageClient({ recipe }: RecipePageClientProps) {
  // Ensure recipe and instructions are defined, or use a default value
  const instructionSteps = recipe?.instructions
    ? recipe.instructions
      .split('\n')
      .map(step => step.trim())
      .filter(step => step.length > 0)
    : [];

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Best Recipe For {recipe?.title || "Recipe"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Ingredients Section */}
            {recipe?.ingredients ? (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
                <ul className="list-disc list-inside space-y-1">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-700">{ingredient}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-700">No ingredients available.</p>
            )}

            <Separator />

            {/* Instructions Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
              <ol className="list-decimal list-inside space-y-1 pl-4">
                {instructionSteps.map((step, index) => {
                  // Remove any leading numbering pattern like "1. ", "2. ", etc.
                  const cleanedStep = step.replace(/^\d+\.\s*/, '');
                  return (
                    <li key={index} className="text-gray-700">
                      {cleanedStep}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Link to Defined Recipe */}
      <Card className="w-full max-w-3xl mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform hover:scale-105 transition-transform duration-200">
        <CardContent className="text-center p-6">
          <p className="text-xl font-bold mb-4">Want to Generate a Custom Recipe?</p>
          <a 
            href="https://definedrecipe.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-lg bg-white text-indigo-600 font-semibold py-2 px-4 rounded-full hover:bg-indigo-100 transition duration-200"
          >
            Click Here &rarr; Defined Recipe
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
