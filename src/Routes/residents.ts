import { Router } from "express";
import { findOrCreateNewResident, updateResidentInfo } from "../controllers";
import {
  validateFindOrCreateResident,
  validateUpdateResident,
  shoutIfResidentIdDoesNotExist,
  shoutIfHouseIdDoesNotExist,
} from "../validator";

const router = Router();

router.post("/check", validateFindOrCreateResident, findOrCreateNewResident);
router.patch(
  "/:residentId",
  validateUpdateResident,
  shoutIfResidentIdDoesNotExist,
  shoutIfHouseIdDoesNotExist,
  updateResidentInfo
);

export { router as residentRouter };
