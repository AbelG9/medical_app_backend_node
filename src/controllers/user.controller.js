import {
  registerUserSerializer,
  loginSerializer,
} from "../serializers/user.serializer.js";
import bcrypt from "bcrypt";
import { conexion } from "../client.js";
import jsonwebtoken from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { error, value } = registerUserSerializer.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Error creating user",
      content: error.details,
    });
  }

  const passwordHashed = bcrypt.hashSync(value.password, 10);

  const userCreated = await conexion.user.create({
    data: {
      name: value.name,
      email: value.email,
      password: passwordHashed,
      role: value.role,
    },
    select: { name: true, email: true, id: true, role: true },
  });

  return res.status(201).json({
    message: "User created successfully",
    content: userCreated,
  });
};

export const login = async (req, res) => {
  const { error, value } = loginSerializer.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Login fields not valid!",
      content: error.details,
    });
  }

  const userFound = await conexion.user.findUnique({
    where: { email: value.email },
  });

  const verifyPassword = bcrypt.compareSync(value.password, userFound.password);

  if (verifyPassword === false) {
    return res.status(400).json({
      message: "Wrong password!",
    });
  }

  const token = jsonwebtoken.sign(
    { userId: userFound.id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  return res.json({
    content: token,
  });
};

export const profileUser = async (req, res) => {
  console.log(req);
  
  const { password, ...data } = req.user;

  return res.json({
    message: "Profile",
    content: data,
  });
};
