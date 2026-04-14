const mongoose = require("mongoose");

const blockStyleSchema = new mongoose.Schema(
  {
    textColor: { type: String, default: "#111827" },
    backgroundColor: { type: String, default: "#ffffff" },
    fontFamily: { type: String, default: "Arial, sans-serif" },
    fontSize: { type: String, default: "14px" },
    padding: { type: String, default: "12px" },
    margin: { type: String, default: "0 0 12px 0" },
    borderRadius: { type: String, default: "6px" },
    border: { type: String, default: "1px solid #e5e7eb" }
  },
  { _id: false }
);

const blockSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "title",
        "imageGallery",
        "description",
        "specsTable",
        "shippingReturns"
      ],
      required: true
    },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    style: { type: blockStyleSchema, default: () => ({}) }
  },
  { _id: false }
);

const globalStyleSchema = new mongoose.Schema(
  {
    fontFamily: { type: String, default: "Arial, sans-serif" },
    textColor: { type: String, default: "#111827" },
    backgroundColor: { type: String, default: "#ffffff" },
    maxWidth: { type: String, default: "860px" }
  },
  { _id: false }
);

const templateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true
    },
    slug: { type: String, unique: true, sparse: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, default: "General" },
    description: { type: String, default: "" },
    blocks: { type: [blockSchema], default: [] },
    globalStyles: { type: globalStyleSchema, default: () => ({}) },
    handlebarsTemplate: { type: String, default: "" },
    isPrebuilt: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);

module.exports = { Template };
