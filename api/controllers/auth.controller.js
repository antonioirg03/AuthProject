import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 12);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  console.log("signin");
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }

    const isValidPassword = bcrypt.compareSync(password, validUser.password);
    if (!isValidPassword) {
      return next(errorHandler(400, "Invalid credentials!"));
    }
    const token = jwt.sign({ userId: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expiryDate,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 1000 * 60 * 60);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      console.log("user not found");
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 12);
      const username =
        req.body.username.split(" ").join("").toLowerCase() +
        Math.floor(Math.random() * 10000).toString();
      const newUser = new User({
        username,
        email: req.body.email,
        password: hashedPassword,
        profilePic: req.body.photoUrl,
      });
      await newUser.save();

      console.log(newUser);

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 1000 * 60 * 60);

      console.log(rest);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Signout success" });
};
