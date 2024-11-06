// File: app/api/recipes/search/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

// Enforce dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = 50;
    const skip = (page - 1) * pageSize;
    const query = searchParams.get('query') || '';

    let recipes: { id: bigint; title: string; slug: string }[] = [];
    let totalCount = 0;

    if (query.trim() === '') {
      // No search query; fetch normally
      [recipes, totalCount] = await Promise.all([
        prisma.recipe.findMany({
          skip,
          take: pageSize,
          orderBy: { title: 'asc' },
          select: { id: true, title: true, slug: true },
        }),
        prisma.recipe.count(),
      ]);
    } else {
      // With search query; use raw SQL for full-text search
      recipes = await prisma.$queryRaw<{ id: bigint; title: string; slug: string }[]>`
        SELECT id, title, slug
        FROM "Recipe"
        WHERE search_vector @@ plainto_tsquery('english', ${query})
        ORDER BY ts_rank(search_vector, plainto_tsquery('english', ${query})) DESC
        OFFSET ${skip}
        LIMIT ${pageSize};
      `;

      totalCount = await prisma.$queryRaw<{ count: string }[]>`
        SELECT COUNT(*) FROM "Recipe"
        WHERE search_vector @@ plainto_tsquery('english', ${query});
      `.then(res => parseInt(res[0].count, 10));
    }

    return NextResponse.json({ recipes, totalCount });
  } catch (error) {
    console.error('Error in /api/recipes/search:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
