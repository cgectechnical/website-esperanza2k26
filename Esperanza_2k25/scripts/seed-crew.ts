import "dotenv/config";
import { connectDB } from "@/utils/db/connect";
import { Crew } from "@/models/crew.model";

const seedCrew = async () => {
  try {
    await connectDB();

    const existingCrew = await Crew.countDocuments();
    if (existingCrew > 0) {
      console.log("Crew already seeded!");
      process.exit(0);
    }

    console.log("Seeding crew members...");
    // Note: You'll need to upload the images to Cloudinary first and replace the avatar URLs!
    const crewToSeed = [
      {
        name: "SOUMADWIP PAUL",
        department: "ME",
        year: "4th",
        avatar: "", // Replace with Cloudinary URL
        category: ["management"],
        lead: "president",
        socials: [
          {
            handler: "LinkedIn",
            link: "https://www.linkedin.com/in/soumadwippaul?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          },
          {
            handler: "Instagram",
            link: "https://www.instagram.com/soumadwippaul?utm_source=qr&igsh=MTU4ZG5ibnA5czg5Zw==",
          },
        ],
      },
    ];

    // Uncomment to actually seed
    // await Crew.insertMany(crewToSeed);
    console.log("Crew seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding crew:", error);
    process.exit(1);
  }
};

seedCrew();
