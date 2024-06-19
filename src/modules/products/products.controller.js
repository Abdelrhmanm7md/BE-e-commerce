import { productModel } from "../../../databases/models/product.model.js";
import slugify from "slugify";
import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";
import deleteOne from "../../utils/handles/refactor.handles.js";
import ApiFeature from "../../utils/apiFeature.js";

const addProduct = catchAsync(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  req.body.imgCover = req.files.imgCover[0].filename;
  req.body.imgCovers = req.files.imgCovers.map((file) => file.filename);
  console.log(req.files, "req.files");

  let results = new productModel(req.body);
  let added = await results.save();
  res.status(201).json({ message: "added", added });
});
const getAllProduct = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(productModel.find(), req.query)
    .pagination()
    .filter()
    .sort()
    .search()
    .fields();

  let results = await ApiFeat.mongooseQuery;
  res.json({ message: "done", page: ApiFeat.page, results });
});
const getOneProduct = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  let results = await productModel.findById(id);
  !results && next(new AppError(`not found `, 404));
  results && res.json({ message: "done", results });
});

const updatedProduct = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  let results = await productModel.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  !results && next(new AppError(`not found `, 404));
  results && res.json({ message: "updatedd", results });
});
const deleteProduct = deleteOne(productModel);

export {
  addProduct,
  getAllProduct,
  getOneProduct,
  updatedProduct,
  deleteProduct,
};
