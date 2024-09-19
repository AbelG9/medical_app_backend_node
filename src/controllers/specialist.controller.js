import { specialistSerializer } from "../serializers/specialist.serializer.js";
import { conexion } from "../client.js";

export const createSpecialist = async (req, res) => {
  const { error, value } = specialistSerializer.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Error creating specialist",
      content: error.details,
    });
  }

  const specialtyFound = await conexion.specialty.findUnique({
    where: { id: value.specialtyId },
    select: { id: true },
  });

  if (!specialtyFound) {
    return res.status(404).json({
      msg: `No Specialty found with specialty id: ${value.specialtyId} provided`,
    });
  }

  const specialistCreated = await conexion.specialist.create({
    data: {
      name: value.name,
      lastname: value.lastname,
      cmpCode: value.cmpCode,
      specialtyId: specialtyFound.id,
    },
  });

  return res.status(201).json({
    message: "Specialist created successfully",
    content: specialistCreated,
  });
};

export const getSpecialists = async (req, res) => {
  const specialistRes = await conexion.specialist.findMany();

  if (specialistRes.length == 0) {
    return res.status(404).json({
      msg: "No specialists found!",
    });
  }

  return res.status(200).json({
    msg: "List of specialists",
    data: specialistRes,
  });
};

export const getSpecialistById = async (req, res) => {
  const { id } = req.params;

  const specialistRes = await conexion.specialist.findUnique({
    where: { id: +id },
  });

  if (!specialistRes) {
    return res.status(404).json({
      msg: "No Specialist found!",
    });
  }

  return res.status(200).json({
    msg: "Specialist found",
    data: specialistRes,
  });
};

export const updateSpecialist = async (req, res) => {
  const { id } = req.params;

  const specialistRes = await conexion.specialist.findUnique({
    where: { id: +id },
  });

  if (!specialistRes) {
    return res.status(404).json({
      msg: "No Specialist found!",
    });
  }

  const { error, value } = specialistSerializer.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Error creating specialist",
      content: error.details,
    });
  }

  const specialtyFound = await conexion.specialty.findUnique({
    where: { id: value.specialtyId },
    select: { id: true },
  });

  if (!specialtyFound) {
    return res.status(404).json({
      msg: `No Specialty found with specialty id: ${value.specialtyId} provided`,
    });
  }

  const specialistUpdated = await conexion.specialist.update({
    where: { id: +id },
    data: {
      name: value.name,
      lastname: value.lastname,
      cmpCode: value.cmpCode,
      specialtyId: specialtyFound.id,
    },
  });

  return res.status(200).json({
    message: "Specialist data updated!",
    content: specialistUpdated,
  });
};

export const deleteSpecialist = async (req, res) => {
  const { id } = req.params;

  const specialistRes = await conexion.specialist.findUnique({
    where: { id: +id },
  });

  if (!specialistRes) {
    return res.status(404).json({
      msg: "No Specialist found!",
    });
  }

  const deletedSpecialist = await conexion.specialist.delete({
    where: { id: +id },
  });

  return res.status(200).json({
    msg: "Specialist deleted!",
    data: deletedSpecialist,
  });
};

export const getSpecialistsPaginated = async (req, res) => {
  const { page = 1, pageSize = 5 } = req.query;
  const skip = (page - 1) * pageSize;

  try {
    const dataSpecialist = await conexion.specialist.findMany({
      skip: parseInt(skip),
      take: parseInt(pageSize),
      orderBy: {
        id: "asc",
      },
    });
    res.json(dataSpecialist);
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getTotalRecords = async (req, res) => {
  const totalRecords = await conexion.specialist.count();

  return res.status(200).json({
    count: totalRecords,
  });
};