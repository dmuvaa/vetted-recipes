/*
  Warnings:

  - Added the required column `searchVector` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "searchVector" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "idx_recipe_search_vector" ON "Recipe"("searchVector");
