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

  return res.status(200).json({
    msg: "List of Patients:",
    data: patientsRes,
  });
};

export const getPatientById = async (req, res) => {
  const { id } = req.params;

  const patientRes = await conexion.patient.findUnique({
    where: { id: +id },
  });

  if (!patientRes) {
    return res.status(404).json({
      msg: "No Patient found!",
    });
  }

  return res.status(200).json({
    msg: "Patient found:",
    data: patientRes,
  });
};