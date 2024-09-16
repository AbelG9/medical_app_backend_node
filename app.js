import express from "express";
import morgan from "morgan";
import { api as routerApi } from "./prisma/router/patient.routes.js";

const app = express();
const port = 3000;

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
  app.listen(port, () => {
    console.log(`Backend working succesfully on`);
    console.log(`http://localhost:${port}/`);
  });
} catch (error) {
  console.log(error);
}