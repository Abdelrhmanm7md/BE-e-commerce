import Joi from "joi";

export const addBrandSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
});
export const getOnebrandSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const updatedbrandSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  id: Joi.string().hex().length(24).required(),
});
export const deletebrandSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
