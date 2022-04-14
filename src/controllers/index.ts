import { Request, Response } from "express";
import { StreetName } from "../types";
import prisma from "../db";

const getStreetName = (streetName: string): StreetName => {
  switch (streetName) {
    case "Ademulegun":
      return StreetName.Ademulegun;
    case "Kehinde":
      return StreetName.Kehinde;
    case "Ebenezer":
      return StreetName.Ebenezer;
    case "Oladele":
      return StreetName.Oladele;
    default:
      return StreetName.Ademulegun;
  }
};

export const getAllhouses = async (req: Request, res: Response) => {
  const houses = await prisma.house.findMany();
  res.status(200).json({
    message: "All Houses",
    data: houses,
  });
};

export const createNewHouse = async (req: Request, res: Response) => {
  const { streetName, houseNo } = req.body;
  const newHouse = await prisma.house.create({
    data: {
      streetName: getStreetName(streetName),
      houseNo,
    },
  });
  res.status(201).json({
    message: "House Created",
    data: newHouse,
  });
};

export const findOrCreateNewResident = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;
  const residents = await prisma.resident.findMany({
    where: {
      OR: [{ email }, { phoneNumber }],
    },
  });
  let [resident, ...duplicateResident] = residents;
  if (duplicateResident.length > 0) {
    await prisma.resident.deleteMany({
      where: { AND: duplicateResident.map((dup) => ({ id: dup.id })) },
    });
  }

  if (!resident) {
    resident = await prisma.resident.create({
      data: {
        email,
        phoneNumber,
      },
    });
  }

  res.status(201).json({
    message: "Resident Info",
    data: resident,
  });
};

export const updateResidentInfo = async (req: Request, res: Response) => {
  const { residentId } = req.params;
  const { houseId, name, unitType, residentialStatus } = req.body;
  const resident = await prisma.resident.update({
    where: { id: residentId },
    data: {
      houseId,
      name,
      unitType,
      residentialStatus,
    },
  });
  res.status(201).json({
    message: "Resident Info Updated",
    data: resident,
  });
};
