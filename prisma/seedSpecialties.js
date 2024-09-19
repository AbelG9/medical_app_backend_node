import { conexion } from "../src/client.js";
import { specialtySerializer } from "../src/serializers/specialty.serializer.js";

async function seedSpecialties() {
  const specialties = [
    {
      name: "Cardiología",
      description:
        "Estudio y tratamiento de enfermedades del corazón y sistema circulatorio.",
      code: "CARD",
    },
    {
      name: "Dermatología",
      description: "Enfermedades de la piel, cabello y uñas.",
      code: "DERM",
    },
    {
      name: "Gastroenterología",
      description:
        "Trastornos del sistema digestivo, como el estómago y los intestinos.",
      code: "GAST",
    },
    {
      name: "Neurología",
      description:
        "Diagnóstico y tratamiento de enfermedades del sistema nervioso.",
      code: "NEUR",
    },
    {
      name: "Pediatría",
      description: "Atención médica de bebés, niños y adolescentes.",
      code: "PED",
    },
    {
      name: "Oncología",
      description: "Estudio y tratamiento del cáncer.",
      code: "ONC",
    },
    {
      name: "Oftalmología",
      description: "Diagnóstico y tratamiento de enfermedades de los ojos.",
      code: "OFT",
    },
    {
      name: "Psiquiatría",
      description: "Diagnóstico y tratamiento de trastornos mentales.",
      code: "PSIQ",
    },
    {
      name: "Ginecología",
      description: "Salud del sistema reproductor femenino.",
      code: "GINE",
    },
    {
      name: "Urología",
      description:
        "Tratamiento de enfermedades del sistema urinario y reproductor masculino.",
      code: "URO",
    },
    {
      name: "Endocrinología",
      description: "Estudio de las glándulas y las hormonas del cuerpo.",
      code: "ENDO",
    },
    {
      name: "Neumología",
      description: "Tratamiento de enfermedades del sistema respiratorio.",
      code: "NEUM",
    },
    {
      name: "Reumatología",
      description: "Tratamiento de enfermedades reumáticas y autoinmunes.",
      code: "REUM",
    },
    {
      name: "Nefrología",
      description: "Estudio y tratamiento de enfermedades renales.",
      code: "NEFR",
    },
    {
      name: "Hematología",
      description: "Estudio de enfermedades de la sangre.",
      code: "HEMA",
    },
    {
      name: "Infectología",
      description: "Diagnóstico y tratamiento de enfermedades infecciosas.",
      code: "INF",
    },
    {
      name: "Otorrinolaringología",
      description: "Tratamiento de enfermedades del oído, nariz y garganta.",
      code: "OTOR",
    },
    {
      name: "Traumatología",
      description:
        "Tratamiento de lesiones y enfermedades del sistema musculoesquelético.",
      code: "TRAU",
    },
    {
      name: "Cirugía General",
      description: "Tratamiento quirúrgico de diversas enfermedades.",
      code: "CIRG",
    },
    {
      name: "Medicina Interna",
      description: "Diagnóstico y tratamiento de enfermedades en adultos.",
      code: "MEDI",
    },
  ];

  await Promise.all(
    specialties.map(async (specialtyData) => {
      const { error, value } = specialtySerializer.validate(specialtyData);

      if (error) {
        return res.status(400).json({
          message: "Error creating specialty",
          content: error.details,
        });
      }

      await conexion.specialty.create({
        data: {
          name: value.name,
          description: value.description,
          code: value.code,
        },
      });
    })
  );
}

seedSpecialties()
  .then(() => {
    console.log("Database feeding successfully completed");
  })
  .catch(() => {
    console.log("Error feeding the database");
  })
  .finally(async () => {
    await conexion.$disconnect();
  });
