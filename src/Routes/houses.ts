import { Router } from "express";
import { getAllhouses, createNewHouse } from "../controllers";
import { validateNewHouse } from "../validator";

const router = Router();

router.get("/", getAllhouses).post("/", validateNewHouse, createNewHouse);

export { router as houseRouter };
