import { Router } from "express";

import {
  createSpecialist,
  getSpecialists,
  getSpecialistById,
  updateSpecialist,
  deleteSpecialist,
  getSpecialistsPaginated,
  getTotalRecords,
} from "../controllers/specialist.controller.js";

import asyncHandler from "express-async-handler";

export const specialistApi = Router();

specialistApi.route("/all").get(asyncHandler(getSpecialists));

specialistApi.route("/totalCount").get(asyncHandler(getTotalRecords));

specialistApi
  .route("/")
  .post(asyncHandler(createSpecialist))
  .get(asyncHandler(getSpecialistsPaginated));

specialistApi
  .route("/:id")
  .get(asyncHandler(getSpecialistById))
  .put(asyncHandler(updateSpecialist))
  .delete(asyncHandler(deleteSpecialist));
