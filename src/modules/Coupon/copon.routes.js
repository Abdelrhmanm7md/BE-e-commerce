import express from "express";
import {
  addCopon,
  getAllCopon,
  getOneCopon,
  updatedCopon,
  deleteCopon,
} from "./copon.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";

const coponRouter = express.Router();
coponRouter.get("/", getAllCopon);
coponRouter.get("/:id", getOneCopon);
coponRouter.post("/",protectRoutes, addCopon);
coponRouter.put("/:id",protectRoutes, updatedCopon);
coponRouter.delete("/:id", deleteCopon);

export default coponRouter;
