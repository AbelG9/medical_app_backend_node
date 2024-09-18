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

export const api = Router();

api.route("/allPatients").get(asyncHandler(getPatients));

api.route("/patients/totalCount").get(asyncHandler(getTotalRecords));

api
  .route("/patients")
  .post(asyncHandler(createPatient))
  .get(asyncHandler(getPatientsPaginated));

api
  .route("/patients/:id")
  .get(asyncHandler(getPatientById))
  .put(asyncHandler(updatePatient))
  .delete(asyncHandler(deletePatient));