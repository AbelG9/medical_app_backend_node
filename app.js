import express from "express";

const app = express();
const port = 3000;

try {
  app.listen(port, () => {
    console.log(`Backend working succesfully on`);
    console.log(`http://localhost:${port}/`);
  });
} catch (error) {
  console.log(error);
}