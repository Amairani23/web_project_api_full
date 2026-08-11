import express from "express";

import {
  getUser,
  getUserId,
  patchUser,
  patchUserAvatar,
  postUser,
} from "../controllers/usersControllers.js";

const router = express.Router();

// Crear usuario
router.post("/users", postUser);

//Mostrar usuarios
router.get("/users", getUser);

//Mostrar usuario por Id
router.get("/users/:userId", getUserId);

//Actualizar perfil
router.patch("/users/me", patchUser);

//Actualizar Avatar
router.patch("/users/me/avatar", patchUserAvatar);

export default router;
