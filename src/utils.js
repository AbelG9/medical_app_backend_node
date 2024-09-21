import jsowebtoken from "jsonwebtoken";
import { conexion } from "./client.js";
import { ROLE_USER } from "@prisma/client";

export const validateToken = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(403).json({
      message: "A token is required for this operation!",
    });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      message: 'Must be in format: "Bearer YOUR_TOKEN"',
    });
  }

  try {
    const payload = jsowebtoken.verify(token, process.env.JWT_SECRET);
    const userFound = await conexion.user.findUniqueOrThrow({
      where: { id: payload.userId },
    });

    req.user = userFound;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Error verifying token",
      content: error.message,
    });
  }
};

export const validateAdmin = async (req, res, next) => {
  const { role } = req.user;

  if (role === ROLE_USER.ADMIN) {
    next();
  } else {
    return res.status(403).json({
      message: "Not allowed",
    });
  }
};

export const validateClient = async (req, res, next) => {
  const { role } = req.user;

  if (role === ROLE_USER.CLIENT) {
    next();
  } else {
    return res.status(403).json({
      message: "Not allowed",
    });
  }
};
