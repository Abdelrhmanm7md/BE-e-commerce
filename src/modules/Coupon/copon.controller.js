import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";
import deleteOne from "../../utils/handles/refactor.handles.js";
import ApiFeature from "../../utils/apiFeature.js";
import { couponModel } from "../../../databases/models/coupon.model.js";
import QrCode from "qrcode";

const addCopon = catchAsync(async (req, res, next) => {
  async (req, res, next) => {

    let results = new couponModel(req.body);
    let added = await results.save();
    res.status(201).json({ message: "added", added });
    }
});
const getAllCopon = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(couponModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();
  let results = await ApiFeat.mongooseQuery;
  res.json({ message: "done", page: ApiFeat.page, results });
});
const getOneCopon = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let results = await couponModel.findById(id);
  !results && next(new AppError(`not found `, 404));
  let url =await QrCode.toDataURL(results.code)
  results && res.json({ message: "done", results ,url});
});

const updatedCopon = catchAsync(async (req, res, next) => {
  let { id } = req.params; // id review 
  let results = await couponModel.findOneAndUpdate({_id:id }, req.body, { new: true });
  !results && next(new AppError("not found Review", 404));
  results && res.json({ message: "Done", results });
});
const deleteCopon = deleteOne(couponModel);

export {
  addCopon,
  getAllCopon,
  getOneCopon,
  updatedCopon,
  deleteCopon,
};
