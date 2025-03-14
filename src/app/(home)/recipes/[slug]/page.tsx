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
    // Fetch only necessary fields, excluding `search_vector`
    const rawRecipe = await prisma.recipe.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        ingredients: true,
        instructions: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!rawRecipe) {
      notFound(); // Renders the 404 page
      return null;
    }

    // Manually serialize Date fields
    const recipe: Recipe = {
      id: rawRecipe.id.toString(), // Convert BigInt to string
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
    return null;
  }
}
