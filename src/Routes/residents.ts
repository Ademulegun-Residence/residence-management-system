import { Router } from "express";
import { findOrCreateNewResident, updateResidentInfo } from "../controllers";
import {
  validateFindOrCreateResident,
  validateUpdateResident,
} from "../validator";

const router = Router();

router.post("/check", validateFindOrCreateResident, findOrCreateNewResident);
router.patch("/:residentId", validateUpdateResident, updateResidentInfo);

export { router as residentRouter };
