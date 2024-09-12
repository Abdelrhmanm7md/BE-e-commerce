import { brandModel } from "../../../databases/models/brand.model.js";
import slugify from "slugify";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";
import deleteOne from "../../utils/handles/refactor.handles.js";
import ApiFeature from "../../utils/apiFeature.js";

const addbrands = catchAsync(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename;
  let results = new brandModel(req.body);
  let added = await results.save();
  res.status(201).json({ message: "added", added });
});
const getAllbrands = catchAsync(async (req, res, next) => {
  let ApiFeat = new brandModel.find()

  let results = await ApiFeat.mongooseQuery;
  res.json({ message: "done", page: ApiFeat.page, results });
});
const getOnebrands = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  let results = await brandModel.findById(id);
  !results && next(new AppError(`not found `, 404));
  results && res.json({ message: "done", results });
});

const updatedbrands = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  req.body.slug = slugify(req.body.name);
  if(req.file) req.body.logo = req.file.filename;

  let results = await brandModel.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );
  !results && next(new AppError(`not found `, 404));
  results && res.json({ message: "updatedd", results });
});
const deletebrands = deleteOne(brandModel);

export { addbrands, getAllbrands, getOnebrands, updatedbrands, deletebrands };
