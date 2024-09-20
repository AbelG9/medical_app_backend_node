import express from "express";
import morgan from "morgan";
import { patientApi } from "./router/patient.routes.js";
import { specialtyApi } from "./router/specialty.route.js";
import { specialistApi } from "./router/specialist.route.js";
import { appoinmentApi } from "./router/appointment.router.js";
import cors from "cors";

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
console.log(allowedOrigins);

const corsOptions = {
  origin: allowedOrigins,
};

//app.use(cors(corsOptions));
app.use(cors({ origin: "*" }));

const errorHandler = (error, req, res, next) => {
  res.status(400).json({
    message: "Error while requesting the operation",
    content: error.message,
  });
};

app.use(morgan("common"));
const PORT = process.env.PORT;
app.use(express.json());
app.use(errorHandler);

app.use(`/api/v1/patients`, patientApi);
app.use(`/api/v1/specialties`, specialtyApi);
app.use(`/api/v1/specialists`, specialistApi);
app.use(`/api/v1/appointments`, appoinmentApi);

try {
  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
