import express from "express";
import dotenv from "dotenv";
import dbConnection from "./databases/dbConnection.js";
import morgan from "morgan";
dotenv.config();
import cors from "cors";

import { init } from "./src/modules/index.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded,, form-data
app.use(express.static("uploads"));
const port = 3000;
app.use(cors());
app.use(morgan("dev"));

dbConnection();
init(app);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
process.on("unhandledtRejection", (err) => {
  console.log(err);
});
