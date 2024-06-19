import express from "express";
import {
  addreviews,
  getAllreviews,
  getOnereviews,
  updatedreviews,
  deletereviews,
} from "./review.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";

const reviewRouter = express.Router();
reviewRouter.get("/", getAllreviews);
reviewRouter.get("/:id", getOnereviews);
reviewRouter.post("/",protectRoutes, addreviews);
reviewRouter.put("/:id",protectRoutes, updatedreviews);
reviewRouter.delete("/:id", deletereviews);

export default reviewRouter;
