import mongoose from "mongoose";
const reportSchema = new mongoose.Schema({
  whatHappened: {
    type: string,
    enum: [
      "Harassment",
      "Theft",
      "Assult",
      "Stalking",
      "Poorlighting",
      "Others",
    ],
    required: true,
  },
  firstName: { type: string, required: false },
  lastName: { type: string, required: false },
  phone: { type: Number, required: false },
  email: { type: string, required: false },
  risk: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
  },

  describe: {
    type: string,
    required: false,
  },

  location: {
    type: string,
    required: true,
    enum: ["Point"],
    default: "Point",
    coodinates: { type: [Number], required: true },
  },
  createdAt: { type: Date, default: Date.now },
});
reportSchema.index({ location: "2dsphere" });
export const Report = mongoose.model("Report", reportSchema);
