// File: app/api/random-recipes/route.ts

import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// Enforce dynamic rendering
export const dynamic = 'force-dynamic';

// Define the type for a recipe
type Recipe = {
  id: bigint;
  title: string;
  slug: string;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '3', 10);

    const recipes = await prisma.$queryRaw<Recipe[]>`
      SELECT id, title, slug
      FROM "Recipe"
      ORDER BY RANDOM()
      LIMIT ${limit};
    `;

    // Convert BigInt to string to ensure JSON serialization
    const serializedRecipes = recipes.map((recipe: Recipe) => ({
      id: recipe.id.toString(),
      title: recipe.title,
      slug: recipe.slug,
    }));

    return NextResponse.json({ recipes: serializedRecipes });
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    return NextResponse.json({ error: 'Failed to fetch recipes.' }, { status: 500 });
  }
}
