import express from "express";
import path from "node:path";
import { db } from "./app/db";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3333;

import { doctorRoutes } from "./routes/doctorRoutes";
import { especializationRoutes } from "./routes/especializationRoutes";
import { clinicRoutes } from "./routes/clinicRoutes";
import { patientRoutes } from "./routes/patientRoutes";
import { historyRoutes } from "./routes/historyRoutes";
import { medicalAppointments } from "./routes/medicalAppointmentsRoutes";

db.sync({ alter: true })
  .then(() => {
    console.log("✅ Sucessfully sincronized!");
    console.log("✅ Connected with Postgres database!");

    //Preventing CORS
    app.use((request, response, next) => {
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.setHeader("Access-Control-Allow-Methods", "*");
      response.setHeader("Access-Control-Allow-Headers", "*");

      next();
    });

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    app.use(express.json());

    app.use(doctorRoutes);
    app.use(especializationRoutes);
    app.use(clinicRoutes);
    app.use(patientRoutes);
    app.use(historyRoutes);
    app.use(medicalAppointments);

    app.listen(port, () => {
      console.log(`✅ Server is running On: http://localhost:${port}`);
    });
  })
  .catch((error: any) =>
    console.error("❌ Failed to connect to the database!", error)
  );
