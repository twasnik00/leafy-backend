import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { firstName, surName, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      surName,
      email,
      password: passwordHash,
      location: "",
      registeredDate: new Date(),
    });
    const result = await newUser.save();
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch)
    //   return res.status(200).json({ error: "Invalid credentials." });

    const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, deviceToken } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ error: "User not found." });
    // user.deviceToken = deviceToken;
    // let updatedUser = { ...user };
    // console.log("user", updatedUser);
    // await User.findByIdAndUpdate(user._id, updatedUser, {
    //   new: true,
    // });
    user.deviceToken = deviceToken;
    await user.save();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(200).json({ error: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
