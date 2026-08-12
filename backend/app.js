import express from "express";
import mongoose from "mongoose";

import {login, createUser, getUserId} from './controllers/usersControllers.js'
import { errorHandler } from "./middlewares/error-handler.js";
import {auth} from "./middlewares/auth.js";
import { requestLogger, errorLogger } from "./middlewares/logger.js";

import 'dotenv/config';

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());

// Conectar con MongoDB
mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar al servidor", error);
    process.exit(1);
  });

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);
app.get('/users/me', getUserId);

app.use(auth);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
