import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;

export const createUser = async (req, res) => {
  try {
    const { name, about, avatar, email, password } = req.body;

    const newUser = new User({
      name,
      about,
      avatar,
      email,
      password
    });

    await newUser.save();

    res.status(201).send({
      message: "Create",
      newUser,
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

export const login = async(req, res) => {
  try{
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(401).send({ message: 'All fields are mandatory.' });
    }

    const user = await User.findOne({email}).select('+password');

    if(!user){
      return res.status(ERROR_BAD_REQUEST).send({ message: "Incorrect email or password." });
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if(!passwordIsCorrect){
      return res.status(ERROR_BAD_REQUEST).send({ message: "Incorrect email or password." });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    )

    return res.status(200).json({
      message: 'Successful login',
      token
     });

  }
  catch (error) {
    return res.status(ERROR_SERVER).send({ message: 'An error occurred while logging in.' });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      message: "OK, when showing users",
      data: users,
    });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(ERROR_BAD_REQUEST).send({ message: err.message });
    }
    return res.status(ERROR_SERVER).send({ message: "An error has ocurred on the server" });
  }
};

export const getUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).orFail(() => {
      const error = new Error("User not found");
      error.statusCode = ERROR_NOT_FOUND;
      throw error;
    });

    res.status(200).json({
      message: "OK, when showing users",
      data: user,
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

export const patchUser = async (req, res) => {
  try {
    const { name, about } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    ).orFail(() => {
      const error = new Error("User not found");
      error.statusCode = ERROR_NOT_FOUND;
      throw error;
    });

    res.status(200).json({
      message: "OK, when showing users",
      data: user,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(ERROR_BAD_REQUEST).send({ message: err.message });
    }

    if (err.statusCode === ERROR_NOT_FOUND) {
      return res.status(ERROR_NOT_FOUND).send({ message: err.message });
    }

    return res.status(ERROR_SERVER).send({ message: "An error has ocurred on the server" });
  }
};

export const patchUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    ).orFail(() => {
      const error = new Error("User not found");
      error.statusCode = ERROR_NOT_FOUND;
      throw error;
    });

    res.status(200).json({
      message: "OK, when showing users",
      data: user,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(ERROR_BAD_REQUEST).send({ message: err.message });
    }

    if (err.statusCode === ERROR_NOT_FOUND) {
      return res.status(ERROR_NOT_FOUND).send({ message: err.message });
    }

    return res.status(ERROR_SERVER).send({ message: "An error has ocurred on the server" });
  }
};


