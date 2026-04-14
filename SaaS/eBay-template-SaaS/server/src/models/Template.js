const mongoose = require("mongoose");

const blockStyleSchema = new mongoose.Schema(
  {
    textColor: { type: String, default: "#111827" },
    backgroundColor: { type: String, default: "#ffffff" },
    fontFamily: { type: String, default: "Arial, sans-serif" },
    fontSize: { type: String, default: "14px" },
    fontWeight: { type: String, default: "400" },
    lineHeight: { type: String, default: "1.5" },
    padding: { type: String, default: "12px" },
    margin: { type: String, default: "0 0 12px 0" },
    borderRadius: { type: String, default: "6px" },
    border: { type: String, default: "1px solid #e5e7eb" },
    borderWidth: { type: String, default: "1px" },
    borderColor: { type: String, default: "#e5e7eb" },
    borderStyle: { type: String, default: "solid" },
    boxShadow: { type: String, default: "none" },
    textAlign: { type: String, default: "left" },
    opacity: { type: String, default: "1" },
    transform: { type: String, default: "none" },
    transition: { type: String, default: "all 0.3s ease" }
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
        "shippingReturns",
        "rating",
        "socialProof",
        "customHTML",
        "divider",
        "testimonial",
        "cta",
        "video"
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
    maxWidth: { type: String, default: "860px" },
    padding: { type: String, default: "18px" },
    margin: { type: String, default: "0 auto" },
    lineHeight: { type: String, default: "1.6" },
    letterSpacing: { type: String, default: "0px" },
    accentColor: { type: String, default: "#d4a853" },
    secondaryColor: { type: String, default: "#1c1016" },
    borderRadius: { type: String, default: "4px" },
    boxShadow: { type: String, default: "0 2px 4px rgba(0,0,0,0.1)" },
    alignment: { type: String, default: "left" }
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
    customVariables: [
      {
        key: { type: String },
        label: { type: String },
        type: { type: String, enum: ["text", "number", "email", "url", "date"], default: "text" },
        placeholder: { type: String },
        required: { type: Boolean, default: false },
        defaultValue: { type: String }
      }
    ],
    handlebarsTemplate: { type: String, default: "" },
    isPrebuilt: { type: Boolean, default: false },
    layoutConfig: {
      columnLayout: { type: String, default: "single" },
      spacing: { type: String, default: "medium" },
      responsive: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);

module.exports = { Template };
