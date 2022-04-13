import { Router } from "express";
import { getAllhouses } from "../controllers";

const router = Router();

router.get("/", getAllhouses);

export { router as houseRouter };
