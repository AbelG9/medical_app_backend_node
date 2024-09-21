import { conexion } from "../src/client.js";
import { ROLE_USER } from "@prisma/client";
import bcrypt from "bcrypt";
import { registerUserSerializer } from "../src/serializers/user.serializer.js";

async function seedUsers() {
  const users = [
    {
      name: "Abel Guevara",
      email: "aguevara@gmail.com",
      password: bcrypt.hashSync("Welcome123Abel!", 10),
      role: ROLE_USER.ADMIN,
    },
    {
      name: "Julio Guevara",
      email: "jguevara@gmail.com",
      password: bcrypt.hashSync("Welcome123Julio!", 10),
      role: ROLE_USER.CLIENT,
    },
    {
      name: "Luis Gonzales",
      email: "lgonzales@gmail.com",
      password: bcrypt.hashSync("Welcome123Luis!", 10),
      role: ROLE_USER.CLIENT,
    },
  ];
  await Promise.all(
    users.map(async (userData) => {
      const { error, value } = registerUserSerializer.validate(userData);

      if (error) {
        console.log("Error creating user");
      }

      await conexion.user.create({
        data: {
          name: value.name,
          email: value.email,
          role: value.role,
          password: value.password,
        },
      });
    })
  );
}

seedUsers()
  .then(() => {
    console.log("Database feeding successfully completed");
  })
  .catch(() => {
    console.log("Error feeding the database");
  })
  .finally(async () => {
    await conexion.$disconnect();
  });
