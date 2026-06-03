
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

import { Events } from "../src/models/events.model";

const seedEvents = async () => {
  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(process.env.MONGO_URI || "", {
      dbName: process.env.DB_NAME,
    });
    console.log("Connected!");

    const existingCount = await Events.countDocuments();
    console.log(`Found ${existingCount} existing events`);

    if (existingCount > 0) {
      const confirm = process.argv.includes("--force");
      if (!confirm) {
        console.log("Events already exist. Use --force to overwrite.");
        process.exit(0);
      }
      console.log("Force flag detected, deleting existing events...");
      await Events.deleteMany({});
    }

  const eventsData = [
      { uniqueId: 101, eventName: "TECH EXHIBITION", eventDescription: "Showcase your technical projects!", eventDate: "2026-06-16", eventStartTime: "10:00", eventEndTime: "17:00", venue: "Tech Block", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 102, eventName: "GRAPHIC DESIGN", eventDescription: "Design competition for creative minds", eventDate: "2026-06-16", eventStartTime: "11:00", eventEndTime: "15:00", venue: "CSE Lab", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 103, eventName: "TECHNO COMMERCIAL", eventDescription: "Present your business ideas", eventDate: "2026-06-17", eventStartTime: "10:00", eventEndTime: "16:00", venue: "Conference Hall", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 104, eventName: "FREE FIRE", eventDescription: "E-sports battle royale", eventDate: "2026-06-17", eventStartTime: "14:00", eventEndTime: "20:00", venue: "Gaming Zone", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 105, eventName: "PES", eventDescription: "Paper presentation competition", eventDate: "2026-06-18", eventStartTime: "09:00", eventEndTime: "13:00", venue: "ECE Dept", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 106, eventName: "AUTOCAD 2D CE", eventDescription: "AutoCAD competition for Civil Engineering", eventDate: "2026-06-16", eventStartTime: "10:00", eventEndTime: "14:00", venue: "CE Lab", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 107, eventName: "BRIDGE MAKING", eventDescription: "Build and test model bridges", eventDate: "2026-06-17", eventStartTime: "11:00", eventEndTime: "16:00", venue: "CE Workshop", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 109, eventName: "FIX THE ERROR", eventDescription: "Debugging competition", eventDate: "2026-06-16", eventStartTime: "13:00", eventEndTime: "16:00", venue: "CSE Lab", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 110, eventName: "CODE A THON", eventDescription: "Coding marathon", eventDate: "2026-06-17", eventStartTime: "10:00", eventEndTime: "18:00", venue: "CSE Lab", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 111, eventName: "HACK O VATION", eventDescription: "Innovation hackathon", eventDate: "2026-06-18", eventStartTime: "09:00", eventEndTime: "21:00", venue: "CSE Dept", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 112, eventName: "AUTOCAD 2D ME", eventDescription: "AutoCAD competition for Mechanical Engineering", eventDate: "2026-06-17", eventStartTime: "10:00", eventEndTime: "14:00", venue: "ME Lab", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 113, eventName: "APTI QUIZ", eventDescription: "Aptitude quiz competition", eventDate: "2026-06-16", eventStartTime: "11:00", eventEndTime: "13:00", venue: "EE Dept", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 114, eventName: "AUTOCAD 3D CE", eventDescription: "3D AutoCAD for Civil Engineering", eventDate: "2026-06-18", eventStartTime: "10:00", eventEndTime: "14:00", venue: "CE Lab", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 115, eventName: "CUBE SOLVING", eventDescription: "Speed cube solving competition", eventDate: "2026-06-16", eventStartTime: "14:00", eventEndTime: "17:00", venue: "Student Activity Center", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 116, eventName: "PHOTOGRAPHY", eventDescription: "Capture the moment contest", eventDate: "2026-06-17", eventStartTime: "All Day", eventEndTime: "All Day", venue: "Campus", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 117, eventName: "ROBO SOCCER", eventDescription: "Robot football match", eventDate: "2026-06-17", eventStartTime: "15:00", eventEndTime: "19:00", venue: "Robotics Lab", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 118, eventName: "CHESS", eventDescription: "Strategy chess tournament", eventDate: "2026-06-18", eventStartTime: "10:00", eventEndTime: "16:00", venue: "Student Activity Center", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 119, eventName: "MATH OLYMPIAD", eventDescription: "Mathematics olympiad", eventDate: "2026-06-16", eventStartTime: "10:00", eventEndTime: "13:00", venue: "ME Dept", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 120, eventName: "CHEMISTRY OLYMPIAD", eventDescription: "Chemistry olympiad", eventDate: "2026-06-17", eventStartTime: "10:00", eventEndTime: "13:00", venue: "Chemistry Lab", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 121, eventName: "PHYSICS OLYMPIAD", eventDescription: "Physics knowledge competition", eventDate: "2026-06-18", eventStartTime: "10:00", eventEndTime: "13:00", venue: "Physics Lab", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 122, eventName: "MODEL MAKING", eventDescription: "Build engineering models", eventDate: "2026-06-17", eventStartTime: "11:00", eventEndTime: "16:00", venue: "ME Workshop", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 123, eventName: "SOLID WORKS", eventDescription: "3D modeling with SolidWorks", eventDate: "2026-06-16", eventStartTime: "10:00", eventEndTime: "15:00", venue: "CAD Lab", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 124, eventName: "PROMPT ENGINEERING", eventDescription: "AI prompt engineering contest", eventDate: "2026-06-18", eventStartTime: "11:00", eventEndTime: "14:00", venue: "CSE Lab", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 125, eventName: "WEB & APP", eventDescription: "Web and app development", eventDate: "2026-06-17", eventStartTime: "10:00", eventEndTime: "20:00", venue: "CSE Lab", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 126, eventName: "LINE FOLLOWING", eventDescription: "Line following robot competition", eventDate: "2026-06-16", eventStartTime: "14:00", eventEndTime: "17:00", venue: "Robotics Lab", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 127, eventName: "VIDEOMAKING & VIDEO EDITING", eventDescription: "Create and edit videos", eventDate: "2026-06-17", eventStartTime: "All Day", eventEndTime: "All Day", venue: "Online", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 128, eventName: "DROID BLITZ", eventDescription: "Robot combat competition", eventDate: "2026-06-18", eventStartTime: "15:00", eventEndTime: "19:00", venue: "Robotics Lab", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 129, eventName: "BGMI", eventDescription: "Battle Grounds Mobile India", eventDate: "2026-06-16", eventStartTime: "16:00", eventEndTime: "22:00", venue: "Gaming Zone", eventCategory: "technical", ruleBookLink: "", leads: [] },
      { uniqueId: 201, eventName: "ART EXHIBITION", eventDescription: "Display your artistic creations", eventDate: "2026-06-19", eventStartTime: "10:00", eventEndTime: "17:00", venue: "Art Gallery", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 202, eventName: "HANDICRAFT", eventDescription: "Handmade craft competition", eventDate: "2026-06-19", eventStartTime: "11:00", eventEndTime: "15:00", venue: "Cultural Block", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 203, eventName: "SARGAM", eventDescription: "Music and singing competition", eventDate: "2026-06-20", eventStartTime: "14:00", eventEndTime: "20:00", venue: "Auditorium", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 204, eventName: "DEBATE COMPETITION", eventDescription: "Debate and discussion contest", eventDate: "2026-06-19", eventStartTime: "10:00", eventEndTime: "14:00", venue: "Conference Hall", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 205, eventName: "CALLIGRAPHY", eventDescription: "Beautiful handwriting competition", eventDate: "2026-06-19", eventStartTime: "11:00", eventEndTime: "13:00", venue: "Cultural Block", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 206, eventName: "FASHION SHOW", eventDescription: "Style and fashion runway", eventDate: "2026-06-20", eventStartTime: "18:00", eventEndTime: "22:00", venue: "Main Ground", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 207, eventName: "SLAM POETRY", eventDescription: "Poetry recitation and slam", eventDate: "2026-06-19", eventStartTime: "16:00", eventEndTime: "19:00", venue: "Auditorium", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 208, eventName: "SANTALI DANCE", eventDescription: "Traditional Santali dance", eventDate: "2026-06-20", eventStartTime: "15:00", eventEndTime: "17:00", venue: "Main Stage", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 209, eventName: "DRAMA", eventDescription: "Theater and drama competition", eventDate: "2026-06-19", eventStartTime: "17:00", eventEndTime: "21:00", venue: "Auditorium", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 210, eventName: "DANCE PERFORMANCES", eventDescription: "Various dance forms showcase", eventDate: "2026-06-20", eventStartTime: "16:00", eventEndTime: "20:00", venue: "Main Stage", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 211, eventName: "RECITATION", eventDescription: "Poem and prose recitation", eventDate: "2026-06-19", eventStartTime: "12:00", eventEndTime: "14:00", venue: "Cultural Block", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 212, eventName: "MELODIES LIVE", eventDescription: "Live music concert", eventDate: "2026-06-20", eventStartTime: "19:00", eventEndTime: "23:00", venue: "Main Stage", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 214, eventName: "WALL MAGAZINE", eventDescription: "Creative wall magazine display", eventDate: "2026-06-19", eventStartTime: "All Day", eventEndTime: "All Day", venue: "Corridors", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 215, eventName: "ACTING", eventDescription: "Acting and mono-acting competition", eventDate: "2026-06-19", eventStartTime: "14:00", eventEndTime: "17:00", venue: "Auditorium", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 216, eventName: "QUIZ", eventDescription: "General knowledge quiz", eventDate: "2026-06-20", eventStartTime: "11:00", eventEndTime: "13:00", venue: "Quiz Hall", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 217, eventName: "ONSPOT WRITING", eventDescription: "On-the-spot creative writing", eventDate: "2026-06-19", eventStartTime: "10:00", eventEndTime: "12:00", venue: "Cultural Block", eventCategory: "cultural", ruleBookLink: "", leads: [] },
      { uniqueId: 219, eventName: "OPEN MIC", eventDescription: "Open mic for performers", eventDate: "2026-06-20", eventStartTime: "13:00", eventEndTime: "15:00", venue: "Main Stage", eventCategory: "cultural", ruleBookLink: "", leads: [] },
    ];

    console.log("Inserting events...");
    const inserted = await Events.insertMany(eventsData);
    console.log(`Successfully inserted ${inserted.length} events!`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedEvents();

