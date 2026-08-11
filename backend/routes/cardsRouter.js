import express from "express";

import {
  deleteCard,
  dislikeCard,
  getCard,
  likeCard,
  postCard,
} from "../controllers/cardsControllers.js";

const router = express.Router();

// Crear tarjeta
router.post("/cards", postCard);

//Muestra tarjetas
router.get("/cards", getCard);

//Elimina tarjeta
router.delete("/cards/:cardId", deleteCard);

//Like a una tarjeta
router.put("/cards/:cardId/likes", likeCard);

//Dislike a una tarjeta
router.delete("/cards/:cardId/likes", dislikeCard);

export default router;
