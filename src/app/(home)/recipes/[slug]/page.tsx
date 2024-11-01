// recipes/[slug]/page.tsx

import RecipePageClient from './RecipePageClient';
import prisma from '../../../../../lib/prisma'; // Adjust the path based on your project structure
import { notFound } from 'next/navigation';


interface Recipe {
  id: string;
  title: string;
  slug: string;
  ingredients: string[];
  instructions: string;
  createdAt: string; // Serialized as ISO string
  updatedAt: string; // Serialized as ISO string
}

interface RecipePageProps {
  params: {
    slug: string;
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = params;

  try {
    const rawRecipe = await prisma.recipe.findUnique({
      where: { slug },
    });

    if (!rawRecipe) {
      notFound(); // Renders the 404 page
    }

    // Manually serialize Date fields
    const recipe: Recipe = {
      id: rawRecipe.id, // Now a String, no need to convert
      title: rawRecipe.title,
      slug: rawRecipe.slug,
      ingredients: rawRecipe.ingredients,
      instructions: rawRecipe.instructions,
      createdAt: rawRecipe.createdAt.toISOString(), // Convert Date to string
      updatedAt: rawRecipe.updatedAt.toISOString(), // Convert Date to string
    };

    return <RecipePageClient recipe={recipe} />;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    notFound(); // Optionally, render a custom error page
  }
}
