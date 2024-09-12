import { categoryModel } from "../../../databases/models/category.model.js";
import slugify from "slugify";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";
import deleteOne from "../../utils/handles/refactor.handles.js";
import ApiFeature from "../../utils/apiFeature.js";

const addCategories = catchAsync(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  console.log(req.file);
  
  req.body.image = req.file.filename;
  let results = new categoryModel(req.body);
  let added = await results.save();
  res.status(201).json({ message: "added", added });
});
const getAllCategories = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(categoryModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();

  let results = await ApiFeat.mongooseQuery;
  res.json({ message: "done", page: ApiFeat.page, results });
});
const getOneCategories = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  let results = await categoryModel.findById(id);
  !results && next(new AppError(`not found `, 404));
  results && res.json({ message: "done", results });
});

const updatedCategories = catchAsync(async (req, res, next) => {
  let { name } = req.body;
  let { id } = req.params;

  let results = await categoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  !results && next(new AppError(`not found `, 404));
  results && res.json({ message: "updatedd", results });
});
const deleteCategories = deleteOne(categoryModel);

export {
  addCategories,
  getAllCategories,
  getOneCategories,
  updatedCategories,
  deleteCategories,
};
