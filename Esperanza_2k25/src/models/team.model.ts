
import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema({
  teamKey: {
    type: String,
    required: true,
    unique: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Events",
    required: true,
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Team = mongoose.models?.Team || mongoose.model("Team", teamSchema);

