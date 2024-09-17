import { conexion } from "../src/client.js";
import { patientSerializer } from "../src/serializers/patient.serializer.js";

async function seedPatients() {
  const patients = [
    {
      name: "Juan",
      lastname: "Pérez",
      numDocument: "123456789",
      email: "juan.perez@example.com",
      sexName: "Masculino",
    },
    {
      name: "María",
      lastname: "García",
      numDocument: "987654321",
      email: "maria.garcia@example.com",
      sexName: "Femenino",
    },
    {
      name: "Carlos",
      lastname: "López",
      numDocument: "456789123",
      email: "carlos.lopez@example.com",
      sexName: "Masculino",
    },
    {
      name: "Ana",
      lastname: "Martínez",
      numDocument: "789123456",
      email: "ana.martinez@example.com",
      sexName: "Femenino",
    },
    {
      name: "Luis",
      lastname: "Hernández",
      numDocument: "321654987",
      email: "luis.hernandez@example.com",
      sexName: "Masculino",
    },
    {
      name: "Laura",
      lastname: "Gómez",
      numDocument: "654321987",
      email: "laura.gomez@example.com",
      sexName: "Femenino",
    },
    {
      name: "Pedro",
      lastname: "Ramírez",
      numDocument: "789456123",
      email: "pedro.ramirez@example.com",
      sexName: "Masculino",
    },
    {
      name: "Sofía",
      lastname: "Fernández",
      numDocument: "321789654",
      email: "sofia.fernandez@example.com",
      sexName: "Femenino",
    },
    {
      name: "Miguel",
      lastname: "Torres",
      numDocument: "987123456",
      email: "miguel.torres@example.com",
      sexName: "Masculino",
    },
    {
      name: "Lucía",
      lastname: "Sánchez",
      numDocument: "123654789",
      email: "lucia.sanchez@example.com",
      sexName: "Femenino",
    },
    {
      name: "Javier",
      lastname: "Díaz",
      numDocument: "456123789",
      email: "javier.diaz@example.com",
      sexName: "Masculino",
    },
    {
      name: "Elena",
      lastname: "Ruiz",
      numDocument: "789321456",
      email: "elena.ruiz@example.com",
      sexName: "Femenino",
    },
    {
      name: "Fernando",
      lastname: "Morales",
      numDocument: "654987321",
      email: "fernando.morales@example.com",
      sexName: "Masculino",
    },
    {
      name: "Isabel",
      lastname: "Ortega",
      numDocument: "321456987",
      email: "isabel.ortega@example.com",
      sexName: "Femenino",
    },
    {
      name: "Ricardo",
      lastname: "Castro",
      numDocument: "987654123",
      email: "ricardo.castro@example.com",
      sexName: "Masculino",
    },
    {
      name: "Patricia",
      lastname: "Vargas",
      numDocument: "123789456",
      email: "patricia.vargas@example.com",
      sexName: "Femenino",
    },
    {
      name: "Andrés",
      lastname: "Mendoza",
      numDocument: "456987123",
      email: "andres.mendoza@example.com",
      sexName: "Masculino",
    },
    {
      name: "Gabriela",
      lastname: "Rojas",
      numDocument: "789654321",
      email: "gabriela.rojas@example.com",
      sexName: "Femenino",
    },
    {
      name: "Manuel",
      lastname: "Flores",
      numDocument: "654123789",
      email: "manuel.flores@example.com",
      sexName: "Masculino",
    },
    {
      name: "Carmen",
      lastname: "Jiménez",
      numDocument: "321987654",
      email: "carmen.jimenez@example.com",
      sexName: "Femenino",
    },
  ];

  await Promise.all(
    patients.map(async (patientData) => {
      const { error, value } = patientSerializer.validate(patientData);

      if (error) {
        return res.status(400).json({
          message: "Error creating patient",
          content: error.details,
        });
      }

      await conexion.patient.create({
        data: {
          name: value.name,
          lastname: value.lastname,
          numDocument: value.numDocument,
          email: value.email,
          sexName: value.sexName,
        },
      });
    })
  );
}

seedPatients()
  .then(() => {
    console.log("Database feeding successfully completed");
  })
  .catch(() => {
    console.log("Error feeding the database");
  })
  .finally(async () => {
    await conexion.$disconnect();
  });
