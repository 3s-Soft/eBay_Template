const mongoose = require("mongoose");

const brandSettingsSchema = new mongoose.Schema(
  {
    logoUrl: { type: String, default: "" },
    primaryColor: { type: String, default: "#0f172a" },
    secondaryColor: { type: String, default: "#334155" },
    fontFamily: { type: String, default: "Arial, sans-serif" }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: { type: String, required: true },
    brandSettings: { type: brandSettingsSchema, default: () => ({}) }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
