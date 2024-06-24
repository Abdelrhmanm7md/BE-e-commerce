import AppError from "../utils/appError.js";
import coponRouter from "./Coupon/copon.routes.js";
import authRouter from "./auth/auth.routes.js";
import brandRouter from "./brands/brands.routes.js";
import cartRouter from "./cart/cart.routes.js";
import categoreRouter from "./categories/categories.routes.js";
import orderRoute from "./order/order.routes.js";
import productRouter from "./products/products.routes.js";
import reviewRouter from "./review/review.routes.js";
import subCategoreRouter from "./subcategories/subcategories.routes.js";
import userRouter from "./user/user.routes.js";
import wishListRouter from "./wishList/wishList.routes.js";

export function init(app) {
  app.use("/", (req, res, next) => {
    res.send("hello world");
  });
  app.use("/api/v1/category", categoreRouter);
  app.use("/api/v1/susbcategory", subCategoreRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/review", reviewRouter);
  app.use("/api/v1/wishList", wishListRouter);
  app.use("/api/v1/copon", coponRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/order", orderRoute);
  app.all("*", (req, res, next) => {
    next(new AppError(`not found `, 404));
  });
  app.use((err, req, res, next) => {
    res
      .status(err.statusCode)
      .json({ message: err.message, statusCode: err.statusCode });
  });
}
