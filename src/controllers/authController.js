import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { firstName, surName = "", email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      surName,
      email,
      password: passwordHash,
      location: "",
      registeredDate: new Date(),
      oAuthToken: "",
      registrationType: "MANUAL",
    });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, deviceToken } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ error: "User not found." });
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
export const googleOAuthLoginOrRegister = async (req, res) => {
  try {
    const { email, firstName, oAuthToken, deviceToken } = req.body;
    const user = await User.findOne({ email: email });
    let token = "";
    let newUser = {};
    if (
      user?.email === email &&
      user?.oAuthToken &&
      user?.registrationType === "GOOGLE"
    ) {
      user.deviceToken = deviceToken;
      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.status(200).json({ token, user });
    } else {
      newUser = new User({
        firstName: firstName,
        surName: "",
        email: email,
        password: "GOOGLE_OAUTH_REGISTERED",
        location: "",
        registeredDate: new Date(),
        oAuthToken: oAuthToken,
        registrationType: "GOOGLE",
        deviceToken: deviceToken,
      });
      const registeredUser = await newUser.save();
      token = jwt.sign({ id: registeredUser._id }, process.env.JWT_SECRET);
      return res.status(200).json({ token, registeredUser });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
