"use server";

import { auth } from "@/auth";
import { connectDB } from "@/utils/db/connect";
import { Events } from "@/models/events.model";
import { Team } from "@/models/team.model";

export const getEventsWithParticipants = async () => {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await connectDB();
    const events = await Events.find()
      .populate({
        path: "participants",
        select: "name rollNumber credentials.email credentials.phoneNumber year department profilePhoto",
      })
      .sort({ eventName: 1 });

    const teams = await Team.find()
      .populate("leader", "name rollNumber credentials.email credentials.phoneNumber year department profilePhoto")
      .populate("members", "name rollNumber credentials.email credentials.phoneNumber year department profilePhoto");

    const plainEvents = events.map((event: any) => {
      const eventId = event._id.toString();
      const eventTeams = teams.filter((t: any) => t.eventId.toString() === eventId);

      // Create map of user ID to team info for quick lookup
      const userTeamMap = new Map();
      const individualParticipants: any[] = [];

      // First, handle all participants
      event.participants.forEach((p: any) => {
        let foundTeam = null;
        for (const team of eventTeams) {
          // Check if user is leader
          if (team.leader && team.leader._id.toString() === p._id.toString()) {
            userTeamMap.set(p._id.toString(), {
              teamId: team._id.toString(),
              teamName: team.teamName,
              teamKey: team.teamKey,
              role: "Leader"
            });
            foundTeam = team;
            break;
          }
          // Check if user is member
          const member = team.members?.find((m: any) => m._id.toString() === p._id.toString());
          if (member) {
            userTeamMap.set(p._id.toString(), {
              teamId: team._id.toString(),
              teamName: team.teamName,
              teamKey: team.teamKey,
              role: "Member"
            });
            foundTeam = team;
            break;
          }
        }
        if (!foundTeam) {
          individualParticipants.push({
            _id: p._id.toString(),
            name: p.name,
            email: p.credentials?.email,
            phone: p.credentials?.phoneNumber,
            rollNumber: p.rollNumber,
            year: p.year,
            department: p.department,
            profilePhoto: p.profilePhoto,
            team: null,
            role: "Individual"
          });
        }
      });

      // Now group into teams + individuals
      const teamsWithParticipants = eventTeams.map((team: any) => {
        const participants = [];
        if (team.leader) {
          participants.push({
            _id: team.leader._id.toString(),
            name: team.leader.name,
            email: team.leader.credentials?.email,
            phone: team.leader.credentials?.phoneNumber,
            rollNumber: team.leader.rollNumber,
            year: team.leader.year,
            department: team.leader.department,
            profilePhoto: team.leader.profilePhoto,
            role: "Leader"
          });
        }
        if (team.members) {
          team.members.forEach((m: any) => {
            participants.push({
              _id: m._id.toString(),
              name: m.name,
              email: m.credentials?.email,
              phone: m.credentials?.phoneNumber,
              rollNumber: m.rollNumber,
              year: m.year,
              department: m.department,
              profilePhoto: m.profilePhoto,
              role: "Member"
            });
          });
        }
        return {
          teamId: team._id.toString(),
          teamName: team.teamName,
          teamKey: team.teamKey,
          participants
        };
      });

      return {
        _id: eventId,
        eventName: event.eventName,
        eventCategory: event.eventCategory,
        allParticipants: event.participants.map((p: any) => ({
          _id: p._id.toString(),
          name: p.name,
          email: p.credentials?.email,
          phone: p.credentials?.phoneNumber,
          rollNumber: p.rollNumber,
          year: p.year,
          department: p.department,
          profilePhoto: p.profilePhoto,
          team: userTeamMap.get(p._id.toString()) || null
        })),
        teams: teamsWithParticipants,
        individualParticipants
      };
    });

    return { success: true, events: plainEvents };
  } catch (error: any) {
    console.error("Error fetching events with participants:", error);
    return { success: false, message: error.message };
  }
};
