import { Router } from "express";

import { createPatient } from "../src/controllers/patient.controller.js";

import asyncHandler from "express-async-handler";

export const api = Router();

api.route("/patients").post(asyncHandler(createPatient));
