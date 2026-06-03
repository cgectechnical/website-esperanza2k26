import { hash } from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    enum: ["1st", "2nd", "3rd", "4th"],
  },
  department: {
    type: String,
    enum: ["CE", "CSE", "ECE", "EE", "ME"],
  },
  rollNumber: {
    type: String,
  },
  bio: {
    type: String,
    default: "",
  },
  profilePhoto: {
    type: String,
    default: "",
  },
  credentials: {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
  },
  resetPasswordOTP: {
    type: String,
  },
  resetPasswordOTPExpires: {
    type: Date,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  registeredEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Events",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("credentials.password")) {
    return next();
  }
  try {
    if (this.credentials?.password) {
      this.credentials.password = await hash(this.credentials.password, 10);
    }
    next();
  } catch (err: any) {
    next(err);
  }
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
