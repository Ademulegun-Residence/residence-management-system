import express, { json, urlencoded } from "express";
import "express-async-errors";
import logger from "morgan";
import { NotFoundError, errorHandler } from "@tunedev_tickets/common";

// internal modules
import router from "./Routes";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(logger("dev"));

// register routes
router(app);

app.get("/", (req, res) => {
  res.send("This is ASRA management system!");
});

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const PORT = process.env.PORT || 8880;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
