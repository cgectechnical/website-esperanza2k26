
"use server";

import crypto from "crypto";
import { Team } from "@/models/team.model";
import { connectDB } from "@/utils/db/connect";
import { auth } from "@/auth";
import { User } from "@/models/user.model";
import { Events } from "@/models/events.model";

const generateTeamKey = (eventId: string) => {
  const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase();
  const shortEventId = eventId.slice(-4).toUpperCase();
  return `${shortEventId}-${randomPart}`;
};

const serializeDoc = (doc: any) => {
  return JSON.parse(JSON.stringify(doc));
};

export const createTeam = async (eventId: string, teamName: string) => {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, message: "Not authenticated" };
    }

    await connectDB();
    const user = await User.findOne({ "credentials.email": session.user.email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const event = await Events.findById(eventId);
    if (!event) {
      return { success: false, message: "Event not found" };
    }

    const existingTeam = await Team.findOne({
      eventId,
      $or: [{ leader: user._id }, { members: user._id }],
    });
    if (existingTeam) {
      return { success: false, message: "You are already in a team for this event" };
    }

    let teamKey = generateTeamKey(eventId);
    let existingKey = await Team.findOne({ teamKey });
    while (existingKey) {
      teamKey = generateTeamKey(eventId);
      existingKey = await Team.findOne({ teamKey });
    }

    const team = await Team.create({
      teamKey,
      teamName,
      eventId,
      leader: user._id,
      members: [],
    });

    const populatedTeam = await Team.findById(team._id)
      .populate("leader", "name credentials.email")
      .populate("members", "name credentials.email");

    return {
      success: true,
      message: "Team created successfully",
      team: serializeDoc(populatedTeam),
    };
  } catch (error: any) {
    console.error("Error creating team:", error);
    return { success: false, message: "Failed to create team" };
  }
};

export const joinTeam = async (teamKey: string, eventId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, message: "Not authenticated" };
    }

    await connectDB();
    const user = await User.findOne({ "credentials.email": session.user.email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const team = await Team.findOne({ teamKey: teamKey.toUpperCase() });
    if (!team) {
      return { success: false, message: "Invalid team key" };
    }

    if (team.eventId.toString() !== eventId.toString()) {
      return { success: false, message: "This team key is for a different event" };
    }

    if (team.leader.toString() === user._id.toString()) {
      return { success: false, message: "You are the leader of this team" };
    }

    if (team.members.includes(user._id)) {
      return { success: false, message: "You are already in this team" };
    }

    const existingTeamForEvent = await Team.findOne({
      eventId: team.eventId,
      $or: [{ leader: user._id }, { members: user._id }],
    });
    if (existingTeamForEvent) {
      return { success: false, message: "You are already in a team for this event" };
    }

    team.members.push(user._id);
    await team.save();

    const populatedTeam = await Team.findById(team._id)
      .populate("leader", "name credentials.email")
      .populate("members", "name credentials.email");

    return {
      success: true,
      message: "Joined team successfully",
      team: serializeDoc(populatedTeam),
    };
  } catch (error: any) {
    console.error("Error joining team:", error);
    return { success: false, message: "Failed to join team" };
  }
};

export const removeMemberFromTeam = async (teamId: string, memberId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, message: "Not authenticated" };
    }

    await connectDB();
    const user = await User.findOne({ "credentials.email": session.user.email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return { success: false, message: "Team not found" };
    }

    if (team.leader.toString() !== user._id.toString()) {
      return { success: false, message: "Only leader can remove members" };
    }

    team.members = team.members.filter(
      (id: string) => id.toString() !== memberId
    );
    await team.save();

    const populatedTeam = await Team.findById(team._id)
      .populate("leader", "name credentials.email")
      .populate("members", "name credentials.email");

    return {
      success: true,
      message: "Member removed successfully",
      team: serializeDoc(populatedTeam),
    };
  } catch (error: any) {
    console.error("Error removing member:", error);
    return { success: false, message: "Failed to remove member" };
  }
};

export const transferLeadership = async (teamId: string, newLeaderId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, message: "Not authenticated" };
    }

    await connectDB();
    const user = await User.findOne({ "credentials.email": session.user.email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return { success: false, message: "Team not found" };
    }

    if (team.leader.toString() !== user._id.toString()) {
      return { success: false, message: "Only leader can transfer leadership" };
    }

    if (!team.members.some((id: any) => id.toString() === newLeaderId.toString())) {
      return { success: false, message: "New leader must be a team member" };
    }

    const oldLeader = team.leader;
    team.leader = newLeaderId;
    team.members = team.members.filter((id: any) => id.toString() !== newLeaderId.toString());
    team.members.push(oldLeader);

    await team.save();

    const populatedTeam = await Team.findById(team._id)
      .populate("leader", "name credentials.email")
      .populate("members", "name credentials.email");

    return {
      success: true,
      message: "Leadership transferred successfully",
      team: serializeDoc(populatedTeam),
    };
  } catch (error: any) {
    console.error("Error transferring leadership:", error);
    return { success: false, message: "Failed to transfer leadership" };
  }
};

export const getTeamByEvent = async (eventId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return null;
    }

    await connectDB();
    const user = await User.findOne({ "credentials.email": session.user.email });
    if (!user) {
      return null;
    }

    const team = await Team.findOne({
      eventId,
      $or: [{ leader: user._id }, { members: user._id }],
    })
      .populate("leader", "name credentials.email")
      .populate("members", "name credentials.email");

    return team ? serializeDoc(team) : null;
  } catch (error: any) {
    console.error("Error getting team:", error);
    return null;
  }
};
