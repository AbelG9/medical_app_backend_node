import { Router } from "express";

import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  getPatientsPaginated,
  getTotalRecords,
} from "../controllers/patient.controller.js";

import asyncHandler from "express-async-handler";

export const patientApi = Router();

patientApi.route("/all").get(asyncHandler(getPatients));

patientApi.route("/totalCount").get(asyncHandler(getTotalRecords));

patientApi
  .route("/")
  .post(asyncHandler(createPatient))
  .get(asyncHandler(getPatientsPaginated));

  patientApi
  .route("/:id")
  .get(asyncHandler(getPatientById))
  .put(asyncHandler(updatePatient))
  .delete(asyncHandler(deletePatient));