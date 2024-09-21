import { Router } from "express";

import {
  registerUser,
  login,
  profileUser,
} from "../controllers/user.controller.js";
import { validateToken } from "../utils.js";

import asyncHandler from "express-async-handler";

export const userApi = Router();

userApi.route("/register").post(asyncHandler(registerUser));

userApi.route("/login").post(asyncHandler(login));

userApi
  .route("/profile")
  .get(asyncHandler(validateToken), asyncHandler(profileUser));
