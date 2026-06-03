export interface Event {
  _id?: string;
  uniqueId?: number;
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  venue: string;
  eventCategory: "technical" | "cultural";
  ruleBookLink: string;
  poster: string;
  leads: {
    name: string;
    year: "1st" | "2nd" | "3rd" | "4th";
    department: "CSE" | "ECE" | "EE" | "ME" | "CE";
    contact: string;
  }[];
  nonRegisterable? : boolean
  participants: any[];
}
