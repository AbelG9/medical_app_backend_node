import { conexion } from "../src/client.js";
import { appointmentSerializer } from "../src/serializers/apointment.serializer.js";

async function seedAppointments() {
  const appointments = [
    {
      patientId: 1,
      doctorId: 5,
      officeNumber: "101",
      details: "Consulta general",
      startTimeDate: "2024-09-20T09:00:00",
      endTimeDate: "2024-09-20T09:30:00",
    },
    {
      patientId: 2,
      doctorId: 3,
      officeNumber: "102",
      details: "Revisión anual",
      startTimeDate: "2024-09-20T09:30:00",
      endTimeDate: "2024-09-20T10:00:00",
    },
    {
      patientId: 3,
      doctorId: 7,
      officeNumber: "103",
      details: "Consulta de seguimiento",
      startTimeDate: "2024-09-20T10:00:00",
      endTimeDate: "2024-09-20T10:30:00",
    },
    {
      patientId: 4,
      doctorId: 1,
      officeNumber: "104",
      details: "Consulta de especialidad",
      startTimeDate: "2024-09-20T10:30:00",
      endTimeDate: "2024-09-20T11:00:00",
    },
    {
      patientId: 5,
      doctorId: 9,
      officeNumber: "105",
      details: "Consulta general",
      startTimeDate: "2024-09-20T11:00:00",
      endTimeDate: "2024-09-20T11:30:00",
    },
    {
      patientId: 6,
      doctorId: 2,
      officeNumber: "106",
      details: "Revisión anual",
      startTimeDate: "2024-09-20T11:30:00",
      endTimeDate: "2024-09-20T12:00:00",
    },
    {
      patientId: 7,
      doctorId: 4,
      officeNumber: "107",
      details: "Consulta de seguimiento",
      startTimeDate: "2024-09-20T12:00:00",
      endTimeDate: "2024-09-20T12:30:00",
    },
    {
      patientId: 8,
      doctorId: 6,
      officeNumber: "108",
      details: "Consulta de especialidad",
      startTimeDate: "2024-09-20T12:30:00",
      endTimeDate: "2024-09-20T13:00:00",
    },
    {
      patientId: 9,
      doctorId: 8,
      officeNumber: "109",
      details: "Consulta general",
      startTimeDate: "2024-09-20T13:00:00",
      endTimeDate: "2024-09-20T13:30:00",
    },
    {
      patientId: 10,
      doctorId: 10,
      officeNumber: "110",
      details: "Revisión anual",
      startTimeDate: "2024-09-20T13:30:00",
      endTimeDate: "2024-09-20T14:00:00",
    },
    {
      patientId: 11,
      doctorId: 11,
      officeNumber: "111",
      details: "Consulta de seguimiento",
      startTimeDate: "2024-09-20T14:00:00",
      endTimeDate: "2024-09-20T14:30:00",
    },
    {
      patientId: 12,
      doctorId: 12,
      officeNumber: "112",
      details: "Consulta de especialidad",
      startTimeDate: "2024-09-20T14:30:00",
      endTimeDate: "2024-09-20T15:00:00",
    },
    {
      patientId: 13,
      doctorId: 13,
      officeNumber: "113",
      details: "Consulta general",
      startTimeDate: "2024-09-20T15:00:00",
      endTimeDate: "2024-09-20T15:30:00",
    },
    {
      patientId: 14,
      doctorId: 14,
      officeNumber: "114",
      details: "Revisión anual",
      startTimeDate: "2024-09-20T15:30:00",
      endTimeDate: "2024-09-20T16:00:00",
    },
    {
      patientId: 15,
      doctorId: 15,
      officeNumber: "115",
      details: "Consulta de seguimiento",
      startTimeDate: "2024-09-20T16:00:00",
      endTimeDate: "2024-09-20T16:30:00",
    },
    {
      patientId: 16,
      doctorId: 16,
      officeNumber: "116",
      details: "Consulta de especialidad",
      startTimeDate: "2024-09-20T16:30:00",
      endTimeDate: "2024-09-20T17:00:00",
    },
    {
      patientId: 17,
      doctorId: 17,
      officeNumber: "117",
      details: "Consulta general",
      startTimeDate: "2024-09-20T17:00:00",
      endTimeDate: "2024-09-20T17:30:00",
    },
    {
      patientId: 18,
      doctorId: 18,
      officeNumber: "118",
      details: "Revisión anual",
      startTimeDate: "2024-09-20T17:30:00",
      endTimeDate: "2024-09-20T18:00:00",
    },
    {
      patientId: 19,
      doctorId: 19,
      officeNumber: "119",
      details: "Consulta de seguimiento",
      startTimeDate: "2024-09-20T18:00:00",
      endTimeDate: "2024-09-20T18:30:00",
    },
    {
      patientId: 20,
      doctorId: 20,
      officeNumber: "120",
      details: "Consulta de especialidad",
      startTimeDate: "2024-09-20T18:30:00",
      endTimeDate: "2024-09-20T19:00:00",
    },
  ];
  await Promise.all(
    appointments.map(async (appointmentData) => {
      const { error, value } = appointmentSerializer.validate(appointmentData);

      if (error) {
        return res.status(400).json({
          message: "Error creating appointment",
          content: error.details,
        });
      }

      await conexion.patient.create({
        data: {
          patientId: value.patientId,
          doctorId: value.doctorId,
          officeNumber: value.officeNumber,
          details: value.details,
          startTimeDate: value.startTimeDate,
          endTimeDate: value.endTimeDate,
        },
      });
    })
  );
}

seedAppointments()
  .then(() => {
    console.log("Database feeding successfully completed");
  })
  .catch(() => {
    console.log("Error feeding the database");
  })
  .finally(async () => {
    await conexion.$disconnect();
  });
