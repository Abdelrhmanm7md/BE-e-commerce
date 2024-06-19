import { reviewModel } from "../../../databases/models/review.model.js";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";
import deleteOne from "../../utils/handles/refactor.handles.js";
import ApiFeature from "../../utils/apiFeature.js";

const addreviews = catchAsync(async (req, res, next) => {
  req.body.user=req.user._id
  let isReview = await reviewModel.find({user:req.user._id,product:req.body.product});
  if (isReview){
    return next(new AppError(`this product already reviewed`, 409));
  }
  let results = new reviewModel(req.body);
  let added = await results.save();
  res.status(201).json({ message: "added", added });
});
const getAllreviews = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(reviewModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();
  let results = await ApiFeat.mongooseQuery;
  res.json({ message: "done", page: ApiFeat.page, results });
});
const getOnereviews = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let results = await reviewModel.findById(id);
  !results && next(new AppError(`not found `, 404));
  results && res.json({ message: "done", results });
});

const updatedreviews = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  let results = await reviewModel.findOneAndUpdate( {_id:id ,user:req.user._id},req.body, {
    new: true,
  });
  !results && next(new AppError(`not found `, 404));
  results && res.json({ message: "updatedd", results });
});
const deletereviews = deleteOne(reviewModel);

export {
  addreviews,
  getAllreviews,
  getOnereviews,
  updatedreviews,
  deletereviews,
};
