import express from "express";
import {
  addsubCategories,
  getAllsubCategories,
  getOnesubCategories,
  updatedsubCategories,
  deletesubCategories,
} from "./subcategories.controller.js";
const subCategoreRouter = express.Router({ mergeParams: true });

subCategoreRouter.get("/", getAllsubCategories);
subCategoreRouter.post("/", addsubCategories);
subCategoreRouter.get("/:id", getOnesubCategories);
subCategoreRouter.put("/:id", updatedsubCategories);
subCategoreRouter.delete("/:id", deletesubCategories);

export default subCategoreRouter;
