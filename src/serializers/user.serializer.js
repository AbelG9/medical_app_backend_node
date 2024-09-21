import { ROLE_USER } from "@prisma/client";
import Joi from "joi";

export const registerUserSerializer = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[W_]).{6,}$/)),
  role: Joi.string()
    .required()
    .allow(ROLE_USER.ADMIN, ROLE_USER.CLIENT),
});

export const loginSerializer = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
