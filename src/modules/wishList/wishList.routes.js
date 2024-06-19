import express from 'express';
const wishListRouter = express.Router();

import * as wishList from './wishList.controller.js'
import { protectRoutes } from '../auth/auth.controller.js';



wishListRouter.patch("/", protectRoutes, wishList.addToWishList);
wishListRouter.get("/", protectRoutes, wishList.getAllWishList);

wishListRouter.delete("/", protectRoutes, wishList.removeFromWishList);


export default wishListRouter;