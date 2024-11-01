import prisma from '../../../../lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function RecipesPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = parseInt(searchParams.page || '1', 10);
  const pageSize = 50;
  const skip = (page - 1) * pageSize;

  const [recipes, totalCount] = await Promise.all([
    prisma.recipe.findMany({
      skip,
      take: pageSize,
      orderBy: { title: 'asc' },
    }),
    prisma.recipe.count(),
  ]);

  if (!recipes || recipes.length === 0) {
    return notFound();
  }

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Recipes</h1>
      <ul className="list-disc list-inside mb-4">
        {recipes.map((recipe) => (
          <li key={recipe.slug}>
            <Link href={`/recipes/${recipe.slug}`} className="text-blue-500 hover:underline">
              {recipe.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        {page > 1 && (
          <Link href={`/recipes?page=${page - 1}`} className="px-4 py-2 bg-blue-500 text-white rounded">
            Previous
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/recipes?page=${page + 1}`} className="px-4 py-2 bg-blue-500 text-white rounded">
            Next
          </Link>
        )}
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
