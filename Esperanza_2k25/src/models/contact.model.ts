import mongoose from "mongoose";
import { Schema } from "mongoose";

const contactMessageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ContactMessage =
  mongoose.models?.ContactMessage ||
  mongoose.model("ContactMessage", contactMessageSchema);
