import { Router } from "express";

import {
  createSpecialty,
  getSpecialties,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty,
  getSpecialtiesPaginated,
  getTotalRecords,
} from "../controllers/specialty.controller.js";

import asyncHandler from "express-async-handler";

export const specialtyApi = Router();

specialtyApi.route("/all").get(asyncHandler(getSpecialties));

specialtyApi.route("/totalCount").get(asyncHandler(getTotalRecords));

specialtyApi
  .route("/")
  .post(asyncHandler(createSpecialty))
  .get(asyncHandler(getSpecialtiesPaginated));

specialtyApi
  .route("/:id")
  .get(asyncHandler(getSpecialtyById))
  .put(asyncHandler(updateSpecialty))
  .delete(asyncHandler(deleteSpecialty));
