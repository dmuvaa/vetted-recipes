// File: app/recipes/page.tsx

import prisma from '../../../../lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Define the Recipe interface
interface Recipe {
  id: bigint;
  title: string;
  slug: string;
}

// Define the Props interface
interface RecipesPageProps {
  searchParams: {
    page?: string;
    query?: string;
  };
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const pageSize = 50;
  const skip = (page - 1) * pageSize;
  const query = searchParams.query || '';

  // Fetch recipes based on search query and pagination
  const [recipes, totalCount] = await Promise.all([
    fetchRecipes({ skip, take: pageSize, query }),
    fetchTotalCount({ query }),
  ]);

  if (!recipes || recipes.length === 0) {
    return notFound();
  }

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-extrabold text-center mb-8">Recipes</h1>
      
      {/* Search Bar */}
      <SearchBar initialQuery={query} />

      {/* Recipes List */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {recipes.map((recipe) => (
          <li key={recipe.slug} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <Link href={`/recipes/${recipe.slug}`} className="text-2xl font-semibold text-blue-600 hover:underline">
              {recipe.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <PaginationControls currentPage={page} totalPages={totalPages} query={query} />
    </div>
  );
}

/**
 * Fetch recipes from the database based on search query and pagination.
 */
async function fetchRecipes({
  skip,
  take,
  query,
}: {
  skip: number;
  take: number;
  query: string;
}): Promise<Recipe[]> {
  if (query.trim() === '') {
    // No search query; fetch normally
    return prisma.recipe.findMany({
      skip,
      take,
      orderBy: { title: 'asc' },
      select: { id: true, title: true, slug: true },
    });
  } else {
    // With search query; use raw SQL for full-text search
    const recipes = await prisma.$queryRaw<Recipe[]>`
      SELECT id, title, slug
      FROM "Recipe"
      WHERE search_vector @@ plainto_tsquery('english', ${query})
      ORDER BY ts_rank(search_vector, plainto_tsquery('english', ${query})) DESC
      OFFSET ${skip}
      LIMIT ${take};
    `;
    return recipes;
  }
}

/**
 * Fetch the total count of recipes based on the search query.
 */
async function fetchTotalCount({ query }: { query: string }): Promise<number> {
  if (query.trim() === '') {
    // No search query; count all recipes
    return prisma.recipe.count();
  } else {
    // With search query; count matching recipes
    const result = await prisma.$queryRaw<{ count: string }[]>`
      SELECT COUNT(*) FROM "Recipe"
      WHERE search_vector @@ plainto_tsquery('english', ${query});
    `;
    return parseInt(result[0].count, 10);
  }
}

/**
 * SearchBar Component
 * Renders a search input with a search icon.
 */
function SearchBar({ initialQuery }: { initialQuery: string }) {
  // Since this is a server component, we handle the search via form submission
  return (
    <form action="/recipes" method="get" className="flex justify-center mb-6">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          name="query"
          defaultValue={initialQuery}
          placeholder="Search recipes..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {/* Search Icon SVG */}
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M16 11a5 5 0 11-10 0 5 5 0 0110 0z"
            />
          </svg>
        </div>
      </div>
    </form>
  );
}

/**
 * PaginationControls Component
 * Renders Previous and Next buttons based on the current page and total pages.
 */
function PaginationControls({
  currentPage,
  totalPages,
  query,
}: {
  currentPage: number;
  totalPages: number;
  query: string;
}) {
  // Build the base URL for pagination links
  const buildLink = (page: number) => {
    let link = `/recipes?page=${page}`;
    if (query.trim() !== '') {
      link += `&query=${encodeURIComponent(query.trim())}`;
    }
    return link;
  };

  return (
    <div className="flex justify-between mt-8">
      {currentPage > 1 ? (
        <Link
          href={buildLink(currentPage - 1)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Previous
        </Link>
      ) : (
        <div></div>
      )}

      <span className="text-lg">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={buildLink(currentPage + 1)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Next
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  );
}
