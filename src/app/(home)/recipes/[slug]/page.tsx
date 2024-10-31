import { notFound } from 'next/navigation';
import prisma from '../../../lib/prisma';

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      slug: params.slug
    }
  });

  if (!recipe) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
      <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
      <p className="whitespace-pre-line">{recipe.instructions}</p>
    </div>
  );
}
