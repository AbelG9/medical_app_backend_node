import Joi from "joi";

export const createPatientSerializer = Joi.object({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  numDocument: Joi.string().required(),
  email: Joi.string().required(),
  sexName: Joi.string().optional(),
});
