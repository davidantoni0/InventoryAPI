import express from "express";
import type { Application } from "express";
import { productRoutes } from "./routes/ProductRoutes";
import { AppDataSource } from "./data-source";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app: Application = express();

app.use(express.json());
app.use("/api/products", productRoutes);
app.use(errorMiddleware)

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado!");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
    });
  }).catch((error) => console.log("Erro ao conectar no banco: ", error));