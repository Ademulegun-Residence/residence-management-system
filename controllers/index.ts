import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllhouses = async (req: Request, res: Response) => {
  const houses = await prisma.house.findMany();
  res.status(200).json({
    message: "All Houses",
    data: houses,
  });
};
