import { PrismaClient } from "@prisma/client";
import { houseData } from "../src/data";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.house.createMany({ data: houseData });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
