const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { asyncHandler } = require("../utils/asyncHandler");

const createAuthToken = (user) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT secret is not configured");
  }

  return jwt.sign(
    { sub: user._id.toString(), email: user.email },
    jwtSecret,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

const toUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  brandSettings: user.brandSettings
});

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "name, email, and password are required" });
  }

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase(),
    passwordHash
  });

  const token = createAuthToken(user);
  return res.status(201).json({ token, user: toUserResponse(user) });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = createAuthToken(user);
  return res.json({ token, user: toUserResponse(user) });
});

const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({ user: toUserResponse(user) });
});

const updateBranding = asyncHandler(async (req, res) => {
  const { logoUrl, primaryColor, secondaryColor, fontFamily } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.brandSettings = {
    logoUrl: logoUrl ?? user.brandSettings.logoUrl,
    primaryColor: primaryColor ?? user.brandSettings.primaryColor,
    secondaryColor: secondaryColor ?? user.brandSettings.secondaryColor,
    fontFamily: fontFamily ?? user.brandSettings.fontFamily
  };

  await user.save();

  return res.json({ user: toUserResponse(user) });
});

module.exports = {
  signup,
  login,
  me,
  updateBranding
};
