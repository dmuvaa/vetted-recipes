// src/app/(home)/recipes/[slug]/RecipePageClient.tsx

'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  recipe: Recipe;
}

export default function RecipePageClient({ recipe }: RecipePageClientProps) {
  // Split the instructions string into an array of steps
  const instructionSteps = recipe.instructions
    .split('\n')
    .map(step => step.trim())
    .filter(step => step.length > 0);

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Best Recipe For {recipe.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Ingredients Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
              <ul className="list-disc list-inside space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">{ingredient}</li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* Instructions Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
              <ol className="list-decimal list-inside space-y-1 pl-4">
                {instructionSteps.map((step, index) => (
                  <li key={index} className="text-gray-700">{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
