import { userModel } from "../../../databases/models/User.model.js";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";
import deleteOne from "../../utils/handles/refactor.handles.js";
import ApiFeature from "../../utils/apiFeature.js";

const addUsers = catchAsync(async (req, res, next) => {
  let existUser = await userModel.findOne({ email: req.body.email });
  if (existUser) {
    return next(new AppError(`this email already exist`, 409));
  }
  let results = new userModel(req.body);
  let added = await results.save();
  res.status(201).json({ message: "added", added });
});
const getAllUsers = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(userModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();

  let results = await ApiFeat.mongooseQuery;
  res.json({ message: "done", page: ApiFeat.page, results });
});
const getOneUsers = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  let results = await userModel.findById(id);
  !results && next(new AppError(`not found `, 404));
  results && res.json({ message: "done", results });
});

const updatedUsers = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let results = await userModel.findByIdAndUpdate(id, req.body, { new: true });
  !results && next(new AppError(`not found `, 404));
  results && res.json({ message: "updatedd", results });
});
const changePassword = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  req.body.changePasswordAt = Date.now();
  let results = await userModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  !results && next(new AppError(`not found `, 404));
  results && res.json({ message: "updatedd", results });
});
const deleteUsers = deleteOne(userModel);

export {
  addUsers,
  getAllUsers,
  getOneUsers,
  updatedUsers,
  deleteUsers,
  changePassword,
};
