import { Request, Response, NextFunction } from "express";
import { StreetName, UnitType, Gender } from "../types";
import { Status } from "@prisma/client";
import prisma from "../db";
import { NotFoundError, UnprocessableRequest } from "@tunedev_tickets/common";
import Joi from "joi";

const createNewHouseSchema = Joi.object({
  streetName: Joi.string()
    .valid(...Object.keys(StreetName))
    .required()
    .messages({
      "any.required": `Street Name is required as streetname`,
      "any.only": `Street Name must be one of [${Object.keys(StreetName).join(
        ", "
      )}]`,
    }),
  houseNo: Joi.string().required().messages({
    "any.required": `House Number is required as houseNo`,
  }),
});

const findOrCreateResidentSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": `email is required`,
    "string.email": `email must ba a valid email`,
  }),
  phoneNumber: Joi.string().trim().min(10).max(14).required().messages({
    "any.required": `Phone Number is required as phoneNumber`,
    "string.min": `Phone Number must be at least 10 characters`,
    "string.max": `Phone Number must be at most 14 characters`,
  }),
});

const updateResidentSchema = Joi.object({
  houseId: Joi.string().required().messages({
    "any.required": `House ID is required as houseId`,
  }),
  name: Joi.string().required().messages({
    "any.required": `Name is required as name`,
  }),
  unitType: Joi.string()
    .valid(...Object.keys(UnitType))
    .required()
    .messages({
      "any.required": `Unit Type is required as unitType`,
      "any.only": `Unit Type must be one of [${Object.keys(UnitType).join(
        ", "
      )}]`,
    }),
  residentialStatus: Joi.string()
    .valid(...Object.keys(Status))
    .required()
    .messages({
      "any.required": `Residential Status is required as residentialStatus`,
      "any.only": `Residential Status must be one of [${Object.keys(
        Status
      ).join(", ")}]`,
    }),
  gender: Joi.string()
    .lowercase()
    .valid(...Object.keys(Gender))
    .required()
    .messages({
      "any.required": `Gender is required as gender`,
      "any.only": `Gender must be one of [${Object.keys(Gender).join(", ")}]`,
    }),
  dateOfBirth: Joi.string().lowercase().required().messages({
    "any.required": `Date of Birth is required as dateOfBirth`,
  }),
});

const createDependantSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `Name is required as name`,
  }),
  gender: Joi.string()
    .lowercase()
    .valid(...Object.keys(Gender))
    .required()
    .messages({
      "any.required": `Gender is required as gender`,
      "any.only": `Gender must be one of [${Object.keys(Gender).join(", ")}]`,
    }),
  dateOfBirth: Joi.string().lowercase().required().messages({
    "any.required": `Date of Birth is required as dateOfBirth`,
  }),
  email: Joi.string().email().optional().messages({
    "string.email": `email must ba a valid email`,
  }),
  phoneNumber: Joi.string().trim().min(10).max(14).optional().messages({
    "string.min": `Phone Number must be at least 10 characters`,
    "string.max": `Phone Number must be less or equal to 14 characters`,
  }),
});

const validatorFactory = (schema: Joi.Schema) => {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await schema.validateAsync(request.body, {
        allowUnknown: true,
      });
      next();
    } catch (err) {
      console.log(err);
      throw new UnprocessableRequest((err as Error).message);
    }
  };
};

export const validateNewHouse = validatorFactory(createNewHouseSchema);
export const validateFindOrCreateResident = validatorFactory(
  findOrCreateResidentSchema
);
export const validateUpdateResident = validatorFactory(updateResidentSchema);
export const validateCreateDependant = validatorFactory(createDependantSchema);

export const shoutIfHouseIdDoesNotExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { houseId: houseIdFromParam } = req.params;
  const { houseId: houseIdFromBody } = req.body;
  const houseId = houseIdFromParam || houseIdFromBody;

  if (!houseId) {
    throw new UnprocessableRequest("Resident ID is required");
  }

  const house = await prisma.house.findUnique({
    where: {
      id: houseId,
    },
  });
  if (!house) {
    throw new NotFoundError(`House with id ${houseId} does not exist`);
  }
  next();
};
export const shoutIfResidentIdDoesNotExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { residentId: residentIdFromParam } = req.params;
  const { residentId: residentIdFromBody } = req.body;
  const residentId = residentIdFromParam || residentIdFromBody;

  if (!residentId) {
    throw new UnprocessableRequest("Resident ID is required");
  }

  const resident = await prisma.resident.findUnique({
    where: {
      id: residentId,
    },
  });
  if (!resident) {
    throw new NotFoundError(`Resdient with id ${residentId} does not exist`);
  }
  next();
};
