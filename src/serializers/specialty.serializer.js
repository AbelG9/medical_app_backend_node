import Joi from "joi";

export const specialtySerializer = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  code: Joi.string().optional(),
});
