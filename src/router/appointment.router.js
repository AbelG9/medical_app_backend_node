import { Router } from "express";

import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAppointmentsPaginated,
  getTotalRecords,
} from "../controllers/appoinment.controller.js";

import asyncHandler from "express-async-handler";

export const appoinmentApi = Router();

appoinmentApi.route("/all").get(asyncHandler(getAppointments));

appoinmentApi.route("/totalCount").get(asyncHandler(getTotalRecords));

appoinmentApi
  .route("/")
  .post(asyncHandler(createAppointment))
  .get(asyncHandler(getAppointmentsPaginated));

appoinmentApi
  .route("/:id")
  .get(asyncHandler(getAppointmentById))
  .put(asyncHandler(updateAppointment))
  .delete(asyncHandler(deleteAppointment));
