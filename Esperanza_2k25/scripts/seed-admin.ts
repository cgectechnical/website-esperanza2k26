import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

import { connectDB } from "@/utils/db/connect";
import { User } from "@/models/user.model";

const seedAdmin = async () => {
  await connectDB();

  const adminEmail = "admin@esperanza.com";
  const adminPassword = "Admin@123"; // Change this in production!

  const existingAdmin = await User.findOne({ "credentials.email": adminEmail });
  
  if (existingAdmin) {
    if (!existingAdmin.role || existingAdmin.role !== "admin") {
      existingAdmin.role = "admin";
      await existingAdmin.save();
      console.log("Updated admin role to admin!");
    }
    console.log("Admin already exists!");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);
    process.exit(0);
  }

  const admin = new User({
    name: "Admin User",
    year: "4th",
    department: "CSE",
    role: "admin",
    credentials: {
      email: adminEmail,
      password: adminPassword,
      phoneNumber: "9876543210",
    },
  });

  await admin.save();

  console.log("Admin user created successfully!");
  console.log("Email:", adminEmail);
  console.log("Password:", adminPassword);
  process.exit(0);
};

seedAdmin().catch(console.error);
