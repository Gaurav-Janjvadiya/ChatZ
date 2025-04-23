import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPass });
    const token = jwt.sign({ name: user.name }, process.env.SECRET);
    res.json({ token });
  } catch (error) {
    console.log("Registration Error", error);
    res.json({ message: "Sign Failed" });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    const token = jwt.sign({ name: user.name }, process.env.SECRET);
    res.json({ token });
  } catch (error) {
    console.log("Login Error", error);
    res.json({ message: "Login Failed" });
  }
};
