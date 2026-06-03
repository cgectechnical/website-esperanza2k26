import { Credentials } from "./signup.interface";

export interface User {
    _id: string;
    name: string;
    year: "1st" | "2nd" | "3rd" | "4th";
    department: "CSE" | "ECE" | "EE" | "ME" | "CE";
    rollNumber: string;
    bio : string;
    profilePhoto?: string;
    credentials: Credentials;
    isVerified: boolean;
    registeredEvents: any[];
}