import express from "express";
import subCategoreRouter from "../subcategories/subcategories.routes.js";
import {
  addCategories,
  getAllCategories,
  getOneCategories,
  updatedCategories,
  deleteCategories,
} from "./categories.controller.js";
import { validation } from "../../utils/middleWare/validation.js";
import { addCategorySchema, getOneCategoriesSchema } from "./categories.validator.js";
import { uploadSingleFile } from "../../utils/middleWare/fileUploads.js";
const categoreRouter = express.Router();
categoreRouter.use("/:id/subcategories",validation(addCategorySchema), subCategoreRouter);
categoreRouter.get("/", getAllCategories);
categoreRouter.get("/:id", validation(getOneCategoriesSchema),getOneCategories);
categoreRouter.post("/",uploadSingleFile("category","image"), addCategories);
categoreRouter.put("/:id", updatedCategories);
categoreRouter.delete("/:id", deleteCategories);

export default categoreRouter;
