// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
// which can lead to warnings or issues due to hot-reloading.
declare global {
  // allow global `var` declarations to prevent multiple Prisma instances
  // during development
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Log useful information
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
