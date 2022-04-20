import { Router } from "express";
import {
  findOrCreateNewResident,
  updateResidentInfo,
  createDependant,
} from "../controllers";
import {
  validateFindOrCreateResident,
  validateUpdateResident,
  shoutIfResidentIdDoesNotExist,
  shoutIfHouseIdDoesNotExist,
  validateCreateDependant,
} from "../validator";

const router = Router();

router.post("/", validateFindOrCreateResident, findOrCreateNewResident);
router.patch(
  "/:residentId",
  validateUpdateResident,
  shoutIfResidentIdDoesNotExist,
  shoutIfHouseIdDoesNotExist,
  updateResidentInfo
);
router.post(
  "/:residentId/dependants",
  validateCreateDependant,
  shoutIfResidentIdDoesNotExist,
  createDependant
);

export { router as residentRouter };
