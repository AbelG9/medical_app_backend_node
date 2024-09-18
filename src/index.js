import express from "express";
import morgan from "morgan";
import { api as routerApi } from "./router/patient.routes.js";
import cors from "cors";

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
console.log(allowedOrigins);

const corsOptions = {
  origin: allowedOrigins,
};

app.use(cors(corsOptions));

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

app.use(`/api/v1`, routerApi);

try {
  app.listen(PORT, () => {
    console.log(`Backend working succesfully on`);
    console.log(`http://localhost:${PORT}/`);
  });
} catch (error) {
  console.log(error);
}
