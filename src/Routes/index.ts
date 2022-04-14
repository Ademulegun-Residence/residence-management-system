import { Application } from "express";

import { houseRouter } from "./houses";
import { residentRouter } from "./residents";

export default (app: Application) => {
  app.use("/api/v1/houses", houseRouter);
  app.use("/api/v1/residents", residentRouter);
};
