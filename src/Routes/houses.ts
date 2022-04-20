import { Router } from "express";
import { getAllhouses, createNewHouse, getAlStreetNames } from "../controllers";
import { validateNewHouse } from "../validator";

const router = Router();

router
  .get("/", getAllhouses)
  .get("/streets", getAlStreetNames)
  .post("/", validateNewHouse, createNewHouse);

export { router as houseRouter };
