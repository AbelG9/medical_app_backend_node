import { Router } from "express";

import {
  createPatient,
  getPatients,
  getPatientById,
} from "../src/controllers/patient.controller.js";

import asyncHandler from "express-async-handler";

export const api = Router();

api
  .route("/patients")
  .post(asyncHandler(createPatient))
  .get(asyncHandler(getPatients));

api.route("/patients/:id").get(asyncHandler(getPatientById));
