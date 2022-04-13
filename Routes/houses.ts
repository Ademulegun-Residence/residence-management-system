import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Hello World",
  });
});

export { router as houseRouter };
