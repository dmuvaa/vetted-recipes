// src/app/api/recipes/[slug]/route.ts

import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Adjust the path based on your project structure

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  if (typeof slug !== 'string') {
    return NextResponse.json({ message: 'Invalid slug parameter' }, { status: 400 });
  }

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { slug },
    });

    if (!recipe) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }

    // Manually serialize BigInt and Date fields
    const serializedRecipe = {
      ...recipe,
      id: recipe.id.toString(), // Convert BigInt to string
      createdAt: recipe.createdAt.toISOString(), // Convert Date to string
      updatedAt: recipe.updatedAt.toISOString(), // Convert Date to string
    };

    return NextResponse.json(serializedRecipe, { status: 200 });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
