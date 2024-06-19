import Joi from "joi";

export const addCategorySchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
})
export const getOneCategoriesSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
})