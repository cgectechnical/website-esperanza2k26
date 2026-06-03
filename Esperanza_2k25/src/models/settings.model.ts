
import mongoose, { Schema } from "mongoose";

const settingsSchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Schema.Types.Mixed,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Settings = mongoose.models?.Settings || mongoose.model("Settings", settingsSchema);

