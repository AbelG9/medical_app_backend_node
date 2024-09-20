import { appointmentSerializer } from "../serializers/apointment.serializer.js";
import { conexion } from "../client.js";

export const createAppointment = async (req, res) => {
  const { error, value } = appointmentSerializer.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Error creating appointment",
      content: error.details,
    });
  }

  const appointmentCreated = await conexion.appointment.create({
    data: {
      patientId: value.patientId,
      doctorId: value.doctorId,
      officeNumber: value.officeNumber,
      details: value.details,
      startTimeDate: value.startTimeDate,
      endTimeDate: value.endTimeDate,
    },
  });

  return res.status(201).json({
    message: "Appointment created successfully",
    content: appointmentCreated,
  });
};

export const getAppointments = async (req, res) => {
  const appointmentsRes = await conexion.appointment.findMany();

  if (appointmentsRes.length == 0) {
    return res.status(404).json({
      msg: "No Appointments found!",
    });
  }

  return res.status(200).json({
    msg: "List of Appointments",
    data: appointmentsRes,
  });
};

export const getAppointmentById = async (req, res) => {
  const { id } = req.params;

  const appointmentsRes = await conexion.appointment.findUnique({
    where: { id: +id },
  });

  if (!appointmentsRes) {
    return res.status(404).json({
      msg: "No Appointment found!",
    });
  }

  return res.status(200).json({
    msg: "Appointment found",
    data: appointmentsRes,
  });
};

export const updateAppointment = async (req, res) => {
  const { id } = req.params;

  const appointmentsRes = await conexion.appointment.findUnique({
    where: { id: +id },
  });

  if (!appointmentsRes) {
    return res.status(404).json({
      msg: "No Appointment found!",
    });
  }

  const { error, value } = appointmentSerializer.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Error creating appointment",
      content: error.details,
    });
  }

  const editAppointment = await conexion.appointment.update({
    where: { id: +id },
    data: {
      patientId: value.patientId,
      doctorId: value.doctorId,
      officeNumber: value.officeNumber,
      details: value.details,
      startTimeDate: value.startTimeDate,
      endTimeDate: value.endTimeDate,
    },
  });

  return res.status(200).json({
    msg: "Appointment data updated!",
    data: editAppointment,
  });
};

export const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  const appointmentsRes = await conexion.appointment.findUnique({
    where: { id: +id },
  });

  if (!appointmentsRes) {
    return res.status(404).json({
      msg: "No Appointment found!",
    });
  }

  const deletedAppointment = await conexion.appointment.delete({
    where: { id: +id },
  });

  return res.status(200).json({
    msg: "Appointment deleted!",
    data: deletedAppointment,
  });
};

export const getAppointmentsPaginated = async (req, res) => {
  const { page = 1, pageSize = 5 } = req.query;
  const skip = (page - 1) * pageSize;

  try {
    const dataAppointment = await conexion.appointment.findMany({
      skip: parseInt(skip),
      take: parseInt(pageSize),
      orderBy: {
        id: "asc",
      },
    });
    return res.status(200).json(dataAppointment);
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getTotalRecords = async (req, res) => {
  const totalRecords = await conexion.appointment.count();

  return res.status(200).json({
    count: totalRecords,
  });
};

export const getAppointmentsByParams = async (req, res) => {
  const { searchParam = "", value = "" } = req.query;

  try {
    const appointmentsRes = await conexion.appointment.findMany({
      where: {
        [searchParam]: { equals: +value },
      },
      include: {
        patient: true,
        specialist: true,
      },
    });
    return res.status(200).json(appointmentsRes);
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getAppointmentsByDateRange = async (req, res) => {
  const { start, end } = req.query;

  try {
    const appointmentsRes = await conexion.appointment.findMany({
      where: {
        startTimeDate: {
          gte: new Date(start),
          lte: new Date(end),
        },
      },
      include: {
        patient: true,
        specialist: true,
      },
    });
    return res.status(200).json(appointmentsRes);
  } catch (error) {
    console.log(error);
    return;
  }
};
