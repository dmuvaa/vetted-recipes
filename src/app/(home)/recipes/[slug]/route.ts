import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        slug: slug
      }
    });

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
