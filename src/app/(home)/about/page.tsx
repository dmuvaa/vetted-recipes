// File: src/app/about/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-orange-600">
              About Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-gray-800">
              <section>
                <p className="text-lg">
                  Welcome to <strong>Vetted Recipes</strong>, where culinary
                  passion meets precision! We’re a dedicated team of food
                  enthusiasts, recipe developers, and flavor explorers who
                  believe that cooking should be a delightful journey, accessible
                  to everyone. Our mission is to provide you with a carefully
                  curated selection of recipes, tested and perfected to ensure
                  that every dish you make brings joy and satisfaction.
                </p>
                <p className="text-lg">
                  Whether you’re a seasoned chef or a beginner in the kitchen,
                  we’re here to guide you, inspire you, and, above all, share in
                  the joy of cooking. At Vetted Recipes, we know that cooking is
                  more than just following steps—it’s an art, a science, and a
                  form of self-expression.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-600">
                  A Step Beyond with Defined Recipe
                </h2>
                <p className="text-lg">
                  In addition to our collection of tried-and-true recipes, we’re
                  thrilled to introduce{" "}
                  <a
                    href="https://definedrecipe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 underline hover:text-orange-700 transition-colors"
                  >
                    DefinedRecipe.com
                  </a>
                  , our sister site, designed to bring even more versatility to
                  your kitchen. Defined Recipe specializes in generating custom
                  recipes tailored to your unique preferences, dietary needs,
                  and available ingredients.
                </p>
                <p className="text-lg">
                  Imagine having a recipe generator that adapts to what you have
                  in your pantry, or one that caters to specific dietary
                  goals—Defined Recipe makes it all possible. It’s the perfect
                  complement to Vetted Recipes, offering personalized guidance
                  for your culinary adventures.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-600">
                  Our Culinary Philosophy
                </h2>
                <p className="text-lg">
                  We believe that cooking is a journey, and every recipe tells a
                  story. Whether it’s a traditional dish passed down through
                  generations or a modern fusion that pushes the boundaries of
                  flavor, we’re passionate about preserving the heart of each
                  recipe while embracing creativity.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-orange-600">
                  Join Us on This Journey
                </h2>
                <p className="text-lg">
                  We invite you to explore, experiment, and create with us. Try
                  out new techniques, discover new flavors, and let your kitchen
                  become a space of joy, discovery, and delicious aromas. Whether
                  you’re preparing a quick weeknight meal or hosting a lavish
                  dinner, we’re here to provide you with the inspiration and
                  confidence to make it unforgettable.
                </p>
                <p className="text-lg font-semibold mt-4">
                  Thank you for being a part of the Vetted Recipes family. We’re
                  excited to see what you’ll cook up next!
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
