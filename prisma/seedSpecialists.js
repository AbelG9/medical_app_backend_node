import { conexion } from "../src/client.js";
import { specialistSerializer } from "../src/serializers/specialist.serializer.js";

async function seedSpecialists() {
  const specialists = [
    {
      name: "Gregory",
      lastname: "House",
      cmpCode: "10987",
      specialtyId: 4,
    },
    {
      name: "Lisa",
      lastname: "Cuddy",
      cmpCode: "10988",
      specialtyId: 3,
    },
    {
      name: "James",
      lastname: "Wilson",
      cmpCode: "10989",
      specialtyId: 2,
    },
    {
      name: "Eric",
      lastname: "Foreman",
      cmpCode: "10990",
      specialtyId: 1,
    },
    {
      name: "Allison",
      lastname: "Cameron",
      cmpCode: "10991",
      specialtyId: 5,
    },
    {
      name: "Robert",
      lastname: "Chase",
      cmpCode: "10992",
      specialtyId: 6,
    },
    {
      name: "Chris",
      lastname: "Taub",
      cmpCode: "10993",
      specialtyId: 7,
    },
    {
      name: "Remy",
      lastname: "Hadley",
      cmpCode: "10994",
      specialtyId: 8,
    },
    {
      name: "Lawrence",
      lastname: "Kutner",
      cmpCode: "10995",
      specialtyId: 9,
    },
    {
      name: "Amber",
      lastname: "Volakis",
      cmpCode: "10996",
      specialtyId: 10,
    },
    {
      name: "Stacy",
      lastname: "Warner",
      cmpCode: "10997",
      specialtyId: 11,
    },
    {
      name: "Edward",
      lastname: "Vogler",
      cmpCode: "10998",
      specialtyId: 12,
    },
    {
      name: "Travis",
      lastname: "Brennan",
      cmpCode: "10999",
      specialtyId: 13,
    },
    {
      name: "Jeffrey",
      lastname: "Cole",
      cmpCode: "11000",
      specialtyId: 14,
    },
    {
      name: "Henry",
      lastname: "Dobson",
      cmpCode: "11001",
      specialtyId: 15,
    },
    {
      name: "Samira",
      lastname: "Terzi",
      cmpCode: "11002",
      specialtyId: 16,
    },
    {
      name: "Jessica",
      lastname: "Adams",
      cmpCode: "11003",
      specialtyId: 17,
    },
    {
      name: "Chi",
      lastname: "Park",
      cmpCode: "11004",
      specialtyId: 18,
    },
    {
      name: "Dominika",
      lastname: "Petrescu",
      cmpCode: "11005",
      specialtyId: 19,
    },
    {
      name: "Martha",
      lastname: "Masters",
      cmpCode: "11006",
      specialtyId: 20,
    },
  ];

  await Promise.all(
    specialists.map(async (specialistData) => {
      const { error, value } = specialistSerializer.validate(specialistData);

      if (error) {
        return res.status(400).json({
          message: "Error creating specialist",
          content: error.details,
        });
      }

      await conexion.specialist.create({
        data: {
          name: value.name,
          lastname: value.lastname,
          cmpCode: value.cmpCode,
          specialtyId: value.specialtyId,
        },
      });
    })
  );
}

seedSpecialists()
  .then(() => {
    console.log("Database feeding successfully completed");
  })
  .catch(() => {
    console.log("Error feeding the database");
  })
  .finally(async () => {
    await conexion.$disconnect();
  });
