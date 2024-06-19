import express from "express";
import * as order from "./order.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";
const orderRoute = express.Router();

// category/:cartegoryId/subCategory

orderRoute.route("/:id").post(protectRoutes, order.createCacheOrder);
orderRoute.route("/checkout/:id").post(protectRoutes, order.onlinePayment);
orderRoute.route("/").get(protectRoutes, order.getOrder);
// .get(protectRoutes, order.getCart);
// cartRouter.route("/:id").delete(protectRoutes,cart.removeCartItem);

// cartRouter.put("/:code",protectRoutes,cart.applyCoupon)
// .get(reviewController.getReviewById).put(protectRoutes, reviewController.updateReview)

export default orderRoute;
