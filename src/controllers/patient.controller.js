import { patientSerializer } from "../serializers/patient.serializer.js";
import { conexion } from "../client.js";

export const createPatient = async (req, res) => {
  const { error, value } = patientSerializer.validate(req.body);

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
    return res.status(404).json({
      msg: "No Patients found!",
    });
  }

  return res.status(200).json({
    msg: "List of Patients",
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
    msg: "Patient found",
    data: patientRes,
  });
};

export const updatePatient = async (req, res) => {
  const { id } = req.params;

  const patientRes = await conexion.patient.findUnique({
    where: { id: +id },
  });

  if (!patientRes) {
    return res.status(404).json({
      msg: "No Patient found!",
    });
  }

  const { error, value } = patientSerializer.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Error editing patient",
      content: error.details,
    });
  }

  const editPatient = await conexion.patient.update({
    where: { id: +id },
    data: {
      name: value.name,
      lastname: value.lastname,
      numDocument: value.numDocument,
      email: value.email,
      sexName: value.sexName,
    },
  });

  return res.status(200).json({
    msg: "Patient data updated!",
    data: editPatient,
  });
};

export const deletePatient = async (req, res) => {
  const { id } = req.params;

  const patientRes = await conexion.patient.findUnique({
    where: { id: +id },
  });

  if (!patientRes) {
    return res.status(404).json({
      msg: "No Patient found!",
    });
  }

  const deletedPatient = await conexion.patient.delete({
    where: { id: +id },
  });

  return res.status(200).json({
    msg: "Patient deleted!",
    data: deletedPatient,
  });
};

export const getPatientsPaginated = async (req, res) => {
  const { page = 1, pageSize = 5 } = req.query;
  const skip = (page - 1) * pageSize;

  try {
    const dataPatient = await conexion.patient.findMany({
      skip: parseInt(skip),
      take: parseInt(pageSize),
      orderBy: {
        id: "asc",
      },
    });
    res.json(dataPatient);
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getTotalRecords = async (req, res) => {
  const totalRecords = await conexion.patient.count();
  
  return res.status(200).json({
    count: totalRecords,
  });
}