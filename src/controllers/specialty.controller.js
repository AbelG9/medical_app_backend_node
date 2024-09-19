import { specialtySerializer } from "../serializers/specialty.serializer.js";
import { conexion } from "../client.js";

export const createSpecialty = async (req, res) => {
  const { error, value } = specialtySerializer.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Error creating specialty",
      content: error.details,
    });
  }

  const specialtyCreated = await conexion.specialty.create({
    data: {
      name: value.name,
      description: value.description,
      code: value.code,
    },
  });

  return res.status(201).json({
    message: "Specialty created successfully",
    content: specialtyCreated,
  });
};

export const getSpecialties = async (req, res) => {
  const specialtyRes = await conexion.specialty.findMany();

  if (specialtyRes.length == 0) {
    return res.status(200).json({
      msg: "No Specialty found!",
    });
  }

  return res.status(200).json({
    msg: "List of Specialties",
    data: specialtyRes,
  });
};

export const getSpecialtyById = async (req, res) => {
  const { id } = req.params;

  const specialtyRes = await conexion.specialty.findUnique({
    where: { id: +id },
  });

  if (!specialtyRes) {
    return res.status(404).json({
      msg: "No Specialty found!",
    });
  }

  return res.status(200).json({
    msg: "Specialty found",
    data: specialtyRes,
  });
};

export const updateSpecialty = async (req, res) => {
  const { id } = req.params;

  const specialtyRes = await conexion.specialty.findUnique({
    where: { id: +id },
  });

  if (!specialtyRes) {
    return res.status(404).json({
      msg: "No Specialty found!",
    });
  }

  const { error, value } = specialtySerializer.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Error editing specialty",
      content: error.details,
    });
  }

  const editSpecialty = await conexion.specialty.update({
    where: { id: +id },
    data: {
      name: value.name,
      description: value.description,
      code: value.code,
    },
  });

  return res.status(200).json({
    msg: "Specialty data updated!",
    data: editSpecialty,
  });
};

export const deleteSpecialty = async (req, res) => {
  const { id } = req.params;

  const specialtyRes = await conexion.specialty.findUnique({
    where: { id: +id },
  });

  if (!specialtyRes) {
    return res.status(404).json({
      msg: "No Specialty found!",
    });
  }

  const deletedSpecialty = await conexion.specialty.delete({
    where: { id: +id },
  });

  return res.status(200).json({
    msg: "Specialty deleted!",
    data: deletedSpecialty,
  });
};

export const getSpecialtiesPaginated = async (req, res) => {
  const { page = 1, pageSize = 5 } = req.query;
  const skip = (page - 1) * pageSize;

  try {
    const dataSpecialty = await conexion.specialty.findMany({
      skip: parseInt(skip),
      take: parseInt(pageSize),
      orderBy: {
        id: "asc",
      },
    });
    res.json(dataSpecialty);
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getTotalRecords = async (req, res) => {
  const totalRecords = await conexion.specialty.count();

  return res.status(200).json({
    count: totalRecords,
  });
};
