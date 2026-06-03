import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  uniqueId: {
    type: Number,
    required: true,
    unique: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
  },
  eventDate: {
    type: String,
    required: true,
  },
  eventStartTime: {
    type: String,
  },
  eventEndTime: {
    type: String,
  },
  venue: {
    type: String,
    required: true,
  },
  eventCategory: {
    type: String,
    required: true,
    enum: ["technical", "cultural"],
  },
  ruleBookLink: {
    type: String,
  },
  poster: {
    type: String,
  },
  leads: [
    {
      name: {
        type: String,
        required: true,
      },
      year: String,
      department: String,
      contact : String
    },
  ],
  nonRegisterable : {
    type : Boolean
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Events =
  mongoose.models?.Events || mongoose.model("Events", eventSchema);
