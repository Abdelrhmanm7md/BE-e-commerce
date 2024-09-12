import express from "express";
import {
  addProduct,
  getAllProduct,
  getOneProduct,
  updatedProduct,
  deleteProduct,
} from "./products.controller.js";
import { uploadMixFile } from "../../utils/middleWare/fileUploads.js";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";
const productRouter = express.Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getOneProduct);
productRouter.post(
  "/",
  // protectRoutes,
  // allowTo("admin", "user"),
  uploadMixFile("product", [
    { name: "imgCover", maxCount: 1 },
    { name: "images", maxCount: 8 },
  ]),
  addProduct
);
productRouter.put("/:id", updatedProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
