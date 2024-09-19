import Joi from "joi";

export const specialistSerializer = Joi.object({
  name: Joi.string().required(),
  lastname: Joi.string().optional(),
  cmpCode: Joi.number().required(),
  specialtyId: Joi.number().integer().required(),
});
