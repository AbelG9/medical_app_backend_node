import { createPatientSerializer } from "../serializers/patient.serializer.js";
import { conexion } from "../../../client.js";

export const createPatient = async (req, res) => {
  const { error, value } = createPatientSerializer.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Error creating patient",
      content: error.details,
    });
  }

  const patientCreated = await conexion.patient.create({
    data: {
      name: value.name,
      lastname: value.lastname,
      numDocument: value.numDocument,
      email: value.email,
      sexName: value.sexName,
    },
  });

  return res.status(201).json({
    message: "Patient created successfully",
    content: patientCreated,
  });
};

export const getPatients = async (req, res) => {
  const patientsRes = await conexion.patient.findMany();

  if (patientsRes.length == 0) {
    return res.status(200).json({
      msg: "No Patients found!",
    });
  }

  return res.status(200).json({
    msg: "List of Patients:",
    data: patientsRes,
  });
};
