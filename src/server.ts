import express, { json } from "express";
import router from "./routes/router.js";
import dotenv from "dotenv"

dotenv.config();

const app = express();
app.use(json());
app.use(router);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server is running in port: ${process.env.SERVER_PORT}`)
);
