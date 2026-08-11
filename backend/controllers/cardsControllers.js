import Card from "../models/card.js";

const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;

export const postCard = async (req, res) => {
  try {
    const { name, link } = req.body;

    const newCard = new Card({
      name,
      link,
      owner: req.user._id,
    });

    await newCard.save();

    res.status(201).send({
      message: "Created",
      newCard,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(ERROR_BAD_REQUEST).send({ message: error.message });
    }

    if (error.statusCode === ERROR_NOT_FOUND) {
      return res.status(ERROR_NOT_FOUND).send({ message: error.message });
    }

    return res.status(ERROR_SERVER).send({ message: "An error has ocurred on the server" });
  }
};

export const getCard = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.status(200).json({
      message: "OK, when showing cards",
      data: cards,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(ERROR_BAD_REQUEST).send({ message: err.message });
    }

    return res.status(ERROR_SERVER).send({ message: "An error has ocurred on the server" });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findByIdAndDelete(cardId).orFail(() => {
      const error = new Error("Card not found");
      error.statusCode = ERROR_NOT_FOUND;
      throw error;
    });

    res.status(200).json({
      message: "Card removed successfully",
      data: card,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(ERROR_BAD_REQUEST).send({ message: err.message });
    }

    if (err.statusCode === ERROR_NOT_FOUND) {
      return res.status(ERROR_NOT_FOUND).send({ message: err.message });
    }

    return res.status(ERROR_SERVER).send({ message: "An error has ocurred on the server" });
  }
};

export const likeCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } }, // agrega _id al array si aún no está ahí
      { new: true },
    ).orFail(() => {
      const error = new Error("Card not found");
      error.statusCode = ERROR_NOT_FOUND;
      throw error;
    });

    res.status(200).json({
      message: "Like added successfully",
      data: card,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(ERROR_BAD_REQUEST).send({ message: err.message });
    }

    if (err.statusCode === ERROR_NOT_FOUND) {
      return res.status(ERROR_NOT_FOUND).send({ message: err.message });
    }

    return res.status(ERROR_SERVER).send({ message: "An error has ocurred on the server" });
  }
};

export const dislikeCard = async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } }, // elimina _id del array
      { new: true },
    ).orFail(() => {
      const error = new Error("Card not found");
      error.statusCode = ERROR_NOT_FOUND;
      throw error;
    });

    res.status(200).json({
      message: "Like successfully removed",
      data: card,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(ERROR_BAD_REQUEST).send({ message: err.message });
    }

    if (err.statusCode === ERROR_NOT_FOUND) {
      return res.status(ERROR_NOT_FOUND).send({ message: err.message });
    }

    return res.status(ERROR_SERVER).send({ message: "An error has ocurred on the server" });
  }
};
