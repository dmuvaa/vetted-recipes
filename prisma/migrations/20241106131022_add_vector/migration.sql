/*
  Warnings:

  - The primary key for the `Recipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `searchVector` on the `Recipe` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "idx_recipe_search_vector";

-- DropIndex
DROP INDEX "idx_recipe_title";

-- AlterTable
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_pkey",
DROP COLUMN "searchVector",
ADD COLUMN     "search_vector" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Recipe_id_seq";
