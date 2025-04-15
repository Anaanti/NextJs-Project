import { PrismaClient } from "../../prisma/node_modules/.prisma/client"; // Adjust the path if needed
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_namCOZUfA18N@ep-cold-breeze-a8gva5jf-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
      }
    }
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;