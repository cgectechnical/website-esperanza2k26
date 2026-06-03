
import { StaticImageData } from "next/image";

export interface Team {
  _id?: string;
  teamKey: string;
  teamName: string;
  eventId: string;
  leader: string;
  members: string[];
  createdAt?: Date;
}

export interface SocialLink {
  handler: string;
  link: string;
}

export interface TeamMember {
  name: string;
  department: string;
  year: string;
  avatar: string | StaticImageData;
  category: string[];
  lead?: string;
  role?: string;
  socials?: SocialLink[];
}

