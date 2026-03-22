import express from "express";
import { routes } from "@/infrastructure/http/routes";
import { AppDataSource } from "@/infrastructure/persistence/typeorm/data-source";

export const app = express();

app.use(express.json());
app.use(routes);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado");

    app.use(routes);

  })
  .catch((error) => console.log(error));