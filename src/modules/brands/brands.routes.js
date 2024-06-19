import express from "express";
import {
  addbrands,
  getAllbrands,
  getOnebrands,
  updatedbrands,
  deletebrands,
} from "./brands.controller.js";
import { validation } from "../../utils/middleWare/validation.js";
import {
  addBrandSchema,
  deletebrandSchema,
  getOnebrandSchema,
  updatedbrandSchema,
} from "./brands.validator.js";
import { uploadSingleFile } from "../../utils/middleWare/fileUploads.js";
const brandRouter = express.Router();
brandRouter.get("/", getAllbrands);
brandRouter.get("/:id", validation(getOnebrandSchema), getOnebrands);
brandRouter.post(
  "/",
  uploadSingleFile("brand", "logo"),
  validation(addBrandSchema),
  addbrands
);
brandRouter.put(
  "/:id",
  uploadSingleFile("brand", "logo"),
  validation(updatedbrandSchema),
  updatedbrands
);
brandRouter.delete("/:id", validation(deletebrandSchema), deletebrands);

export default brandRouter;
