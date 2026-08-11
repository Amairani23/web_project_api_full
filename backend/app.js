import express from "express";
import mongoose from "mongoose";

import {login, createUser, getUserId} from './controllers/usersControllers.js'

import 'dotenv/config';


const app = express();
const { PORT = 3000 } = process.env;
const auth = require('./middleware/auth');

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


app.post('/signin', login);
app.post('/signup', createUser);

app.get('/users/me', getUserId);

app.use(auth);

app.use((req, res) => {
  res.status(404).send({
    message: "Recurso solicitado no encontrado",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
