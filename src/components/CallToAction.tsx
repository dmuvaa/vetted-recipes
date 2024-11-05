// File: app/components/CallToAction.tsx

import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-6">Unleash Your Culinary Creativity</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Why settle for ordinary recipes when you can craft your own? With our custom recipe generator, you have the power to create dishes tailored to your tastes, ingredients, and dietary needs. Start your culinary journey with us today!
        </p>
        <Link href="https://definedrecipe.com" target="_blank">
          <Button className="bg-white text-orange-600 hover:bg-orange-100 font-semibold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
            Visit Defined Recipe
          </Button>
        </Link>
      </div>
    </section>
  );
}

