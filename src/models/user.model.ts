import { PrismaClient } from "@prisma/client";
import { ProductInput } from "../types/product";

const prisma = new PrismaClient();

export async function main() {
  return {
    queryProducts: async () => {
      return await prisma.product.findMany();
    },
    createProduct: async (data: ProductInput) => {
      return await prisma.product.create({ data });
    },
    updateProduct: async ({ id, ...rest }: ProductInput & { id: number }) => {
      return await prisma.product.update({ where: { id }, data: rest });
    },
    deleteProduct: async ({ id }: { id: number }) => {
      return await prisma.product.delete({ where: { id } });
    },
  };
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
