import Joi from "joi";

export const appointmentSerializer = Joi.object({
  patientId: Joi.number().integer().required(),
  doctorId: Joi.number().integer().required(),
  officeNumber: Joi.string().optional(),
  details: Joi.string().optional(),
  startTimeDate: Joi.date().required(),
  endTimeDate: Joi.date().required(),
});
