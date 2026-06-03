import mongoose, { Document, Schema } from "mongoose";

export interface IBand extends Document {
  title: string;
  imageUrl: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BandSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Band =
  (mongoose.models.Band as mongoose.Model<IBand>) ||
  mongoose.model<IBand>("Band", BandSchema);

export default Band;
