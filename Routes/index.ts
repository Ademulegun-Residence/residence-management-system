import { Application } from "express";

import { houseRouter } from "./houses";

export default (app: Application) => {
  app.use("/api/v1/houses", houseRouter);
};
