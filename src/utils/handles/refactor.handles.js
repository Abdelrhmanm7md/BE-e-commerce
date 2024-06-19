import AppError from "../appError.js";
import catchAsync from "../middleWare/catchAsyncError.js";

const deleteOne = (model) => {
  return catchAsync(async (req, res, next) => {
    let { id } = req.params;
    let results = await model.findByIdAndDelete(id);
    !results && next(new AppError(`not found `, 404));
    results && res.json({ message: "deleteddd" });
  });
};

export default deleteOne;
