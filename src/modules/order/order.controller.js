import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";
import { orderModel } from "../../../databases/models/order.model.js";
import { cartModel } from "../../../databases/models/cart.model.js";
import { productModel } from "../../../databases/models/product.model.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51N9sq0FdpscXN88i6ODiMOykcjMCelk6MbCnifHv3ZGoBBAfoCOeunOilTyVvYvC6tbzEfZFIgxXGzm0ZHCWw77B00OxoHFxTx"
);

const createCacheOrder = catchAsync(async (req, res, nex) => {
  // 1 - cart   ....id cart params
  let cart = await cartModel.findById(req.params.id);
  // 2- totalPrice
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  // 3- create order
  let order = new orderModel({
    user: req.user._id,
    cartItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });
  // 4- update sold , quanity
  if (order) {
    let options = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
      },
    }));

    await productModel.bulkWrite(options);
    await order.save();
  } else {
    return next(new AppError("error occur", 409));
  }
  // 5- remove cart
  await cartModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Done", order });
});

const getOrder = catchAsync(async (req, res, next) => {
  let order = await orderModel
    .findOne({ user: req.user._id })
    .populate("cartItems.product");
  res.json({ message: "helloz", order });
});

const getAllOrder = catchAsync(async (req, res, next) => {
  let order = await orderModel.find({ user: req.user._id });
  res.json({ message: "helloz", order });
});

const onlinePayment = catchAsync(async (req, res, next) => {
  let cart = await cartModel.findById(req.params.id);
  // 2- totalPrice
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  console.log(onlinePayment);
  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://route-comm.netlify.app/#/",
    cancel_url: "https://route-comm.netlify.app/#/cart",
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress,
  });

  res.json({ message: "helloz", session });
});

export { createCacheOrder, getOrder, getAllOrder, onlinePayment };
