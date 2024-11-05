// File: app/api/random-recipes/route.ts

import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '3', 10);

    const recipes = await prisma.$queryRaw`
      SELECT id, title, slug
      FROM "Recipe"
      ORDER BY RANDOM()
      LIMIT ${limit};
    `;

    // Convert BigInt to string to ensure JSON serialization
    const serializedRecipes = recipes.map((recipe) => ({
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
