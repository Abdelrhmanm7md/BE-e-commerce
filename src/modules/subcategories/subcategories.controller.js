import { subCategoryModel } from "../../../databases/models/subcategory.model.js";
import slugify from "slugify";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";
import deleteOne from "../../utils/handles/refactor.handles.js";
import ApiFeature from "../../utils/apiFeature.js";

const addsubCategories = catchAsync(async (req, res, next) => {
  let { name, catiegoryId } = req.body;
  let results = new subCategoryModel({
    name,
    slug: slugify(name),
    category: catiegoryId,
  });
  let added = await results.save();
  res.status(201).json({ message: "added", added });
});
const getAllsubCategories = catchAsync(async (req, res, next) => {
  let filters = {};
  if (req.params.id && req.params) {
    filters.category = req.params.id;
  }
  let ApiFeat = new ApiFeature(subCategoryModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();

  let results = await ApiFeat.mongooseQuery;
  res.json({ message: "done", page: ApiFeat.page, results });
});
const getOnesubCategories = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  let results = await subCategoryModel.findById(id);
  !results && next(new AppError(`not found `, 404));
  results && res.json({ message: "done", results });
});

const updatedsubCategories = catchAsync(async (req, res, next) => {
  let { name, catiegoryId } = req.body;
  let { id } = req.params;

  let results = await subCategoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name), category: catiegoryId },
    { new: true }
  );
  !results && next(new AppError(`not found `, 404));
  results && res.json({ message: "updatedd", results });
});
const deletesubCategories = deleteOne(subCategoryModel);

export {
  addsubCategories,
  getAllsubCategories,
  getOnesubCategories,
  updatedsubCategories,
  deletesubCategories,
};
