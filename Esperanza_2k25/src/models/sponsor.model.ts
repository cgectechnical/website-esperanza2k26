import mongoose, { Document, Schema } from "mongoose";

export interface ISponsor extends Document {
  name: string;
  logoUrl: string;
  website: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SponsorSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    website: {
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

const Sponsor =
  (mongoose.models.Sponsor as mongoose.Model<ISponsor>) ||
  mongoose.model<ISponsor>("Sponsor", SponsorSchema);

export default Sponsor;
