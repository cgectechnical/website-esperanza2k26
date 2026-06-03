import mongoose, { Schema } from "mongoose";

const crewSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
    enum: ["CE", "CSE", "ECE", "EE", "ME"],
  },
  year: {
    type: String,
    required: true,
    enum: ["1st", "2nd", "3rd", "4th"],
  },
  avatar: {
    type: String,
    required: false,
  },
  category: [
    {
      type: String,
      required: false,
    },
  ],
  lead: {
    type: String,
  },
  role: {
    type: String,
  },
  socials: [
    {
      handler: {
        type: String,
        required: false,
      },
      link: {
        type: String,
        required: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Crew = mongoose.models?.Crew || mongoose.model("Crew", crewSchema);
