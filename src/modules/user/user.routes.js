import express from "express";
import {
  addUsers,
  getAllUsers,
  getOneUsers,
  updatedUsers,
  deleteUsers,
  changePassword
} from "./user.controller.js";
const userRouter = express.Router();
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getOneUsers);
userRouter.post("/", addUsers);
userRouter.put("/:id", updatedUsers);
userRouter.delete("/:id", deleteUsers);
userRouter.patch("/:id", changePassword);

export default userRouter;
