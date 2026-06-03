"use client";

import { useState, useEffect } from "react";
import { createTeam, joinTeam, removeMemberFromTeam, getTeamByEvent, transferLeadership } from "@/actions/team.action";
import customSwal from "@/utils/swal";
import { Copy, Check, ChevronDown, ChevronUp, UserMinus, Users, User, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TeamManagerProps {
  eventId: string;
  userEmail: string;
  onUpdate?: () => void;
}

type TeamWithPopulatedMembers = any & {
  leader?: { name: string; credentials: { email: string } };
  members?: Array<{ _id: string; name: string; credentials: { email: string } }>;
};

export default function TeamManager({ eventId, userEmail, onUpdate }: TeamManagerProps) {
  const [mode, setMode] = useState<"select" | "create" | "join">("select");
  const [teamName, setTeamName] = useState("");
  const [teamKeyInput, setTeamKeyInput] = useState("");
  const [team, setTeam] = useState<TeamWithPopulatedMembers | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copying, setCopying] = useState(false);

  const handleCreateTeam = async () => {
    if (!teamName.trim()) return;
    setIsLoading(true);
    const result = await createTeam(eventId, teamName);
    setIsLoading(false);
    if (result.success) {
      customSwal.fire("Success!", "Team created successfully!", "success");
      setTeam(result.team);
      setMode("select");
      if (onUpdate) onUpdate();
    } else {
      customSwal.fire("Error!", result.message, "error");
    }
  };

  const handleJoinTeam = async () => {
    if (!teamKeyInput.trim()) return;
    setIsLoading(true);
    const result = await joinTeam(teamKeyInput, eventId);
    setIsLoading(false);
    if (result.success) {
      customSwal.fire("Success!", "Joined team successfully!", "success");
      setTeam(result.team);
      setMode("select");
      if (onUpdate) onUpdate();
    } else {
      customSwal.fire("Error!", result.message, "error");
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!team?._id) return;
    const result = await removeMemberFromTeam(team._id, memberId);
    if (result.success) {
      customSwal.fire("Success!", "Member removed!", "success");
      setTeam(result.team);
    } else {
      customSwal.fire("Error!", result.message, "error");
    }
  };

  const handleTransferLeadership = async (memberId: string, memberName: string) => {
    if (!team?._id) return;
    const result = await customSwal.fire({
      title: "Transfer Leadership?",
      text: `Are you sure you want to transfer leadership to ${memberName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, transfer!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const transferResult = await transferLeadership(team._id, memberId);
      if (transferResult.success) {
        customSwal.fire("Success!", transferResult.message, "success");
        setTeam(transferResult.team);
        if (onUpdate) onUpdate();
      } else {
        customSwal.fire("Error!", transferResult.message, "error");
      }
    }
  };

  const copyTeamKey = async () => {
    if (!team?.teamKey) return;
    try {
      await navigator.clipboard.writeText(team.teamKey);
      setCopying(true);
      setTimeout(() => setCopying(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const loadTeam = async () => {
    const teamData = await getTeamByEvent(eventId);
    setTeam(teamData as TeamWithPopulatedMembers);
  };

  useEffect(() => {
    loadTeam();
  }, [eventId]);

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-6 mt-4 border border-gray-700/50 shadow-lg">
      <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-yellow-400" />
        Team Management
      </h3>

      {team ? (
        <div className="space-y-4">
          <div
            className="flex justify-between items-center cursor-pointer bg-gray-700/40 p-4 rounded-lg hover:bg-gray-700/60 transition-all"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-yellow-400" />
              <div>
                <p className="text-white font-bold text-lg">
                  {team.teamName}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-400 text-sm font-mono">
                    {team.teamKey}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyTeamKey();
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Copy team key"
                  >
                    {copying ? (
                      <Check className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="text-white">
              {isCollapsed ? (
                <ChevronDown className="h-6 w-6" />
              ) : (
                <ChevronUp className="h-6 w-6" />
              )}
            </div>
          </div>

          {!isCollapsed && (
            <div className="space-y-4 bg-gray-700/20 p-4 rounded-lg">
              <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 rounded-lg p-4 border border-yellow-500/30">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-yellow-300 text-sm font-semibold uppercase tracking-wider">
                      Team Leader
                    </p>
                    <p className="text-white font-bold text-lg">
                      {(team as any).leader?.name}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-blue-400" />
                  <p className="text-gray-200 font-semibold">Team Members</p>
                  <span className="text-gray-400 text-sm">
                    ({(team as any).members?.length || 0})
                  </span>
                </div>
                <div className="space-y-2">
                  {Array.isArray((team as any).members) && (team as any).members.length > 0 ? (
                    (team as any).members?.map((member: any, index: number) => {
                      const memberId = member?._id?.toString() || `member-${index}`;
                      const memberName = member?.name || "Unknown Member";
                      return (
                        <div
                          key={memberId}
                          className="flex justify-between items-center bg-gray-700/40 rounded-lg p-3 hover:bg-gray-700/60 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-300" />
                            </div>
                            <p className="text-white font-medium">{memberName}</p>
                          </div>
                          <div className="flex gap-2">
                            {userEmail === (team as any).leader?.credentials?.email && member?._id && (
                              <>
                                <button
                                  onClick={() => handleTransferLeadership(member._id.toString(), memberName)}
                                  className="relative inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-white transition-all duration-200 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 shadow-[0_3px_0_0_#a16207] hover:shadow-[0_1px_0_0_#a16207] hover:translate-y-[1px] active:shadow-none active:translate-y-[3px] rounded-md"
                                >
                                  <Trophy className="h-3 w-3 mr-1" />
                                  Make Leader
                                </button>
                                <button
                                  onClick={() => handleRemoveMember(member._id.toString())}
                                  className="relative inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold text-white transition-all duration-200 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-[0_3px_0_0_#991b1b] hover:shadow-[0_1px_0_0_#991b1b] hover:translate-y-[1px] active:shadow-none active:translate-y-[3px] rounded-md"
                                >
                                  <UserMinus className="h-3 w-3 mr-1" />
                                  Remove
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-400 text-sm italic">
                      No other members yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {mode === "select" ? (
            <div className="flex gap-4">
              <button
                onClick={() => setMode("create")}
                className="flex-1 relative inline-flex items-center justify-center px-6 py-2.5 font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-[0_4px_0_0_#1e40af] hover:shadow-[0_2px_0_0_#1e40af] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] rounded-lg"
              >
                Create Team
              </button>
              <button
                onClick={() => setMode("join")}
                className="flex-1 relative inline-flex items-center justify-center px-6 py-2.5 font-bold text-white transition-all duration-200 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-[0_4px_0_0_#166534] hover:shadow-[0_2px_0_0_#166534] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] rounded-lg"
              >
                Join Team
              </button>
            </div>
          ) : mode === "create" ? (
            <div className="space-y-4">
              <button
                onClick={() => setMode("select")}
                className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
              >
                <ChevronUp className="h-4 w-4 rotate-90" />
                Back
              </button>
              <Input
                type="text"
                placeholder="Enter team name..."
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700/50 text-white border-gray-600 focus:border-blue-500"
              />
              <button
                onClick={handleCreateTeam}
                disabled={isLoading}
                className="w-full relative inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed shadow-[0_4px_0_0_#1e40af] hover:shadow-[0_2px_0_0_#1e40af] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] disabled:shadow-none disabled:translate-y-0 rounded-lg"
              >
                {isLoading ? "Creating Team..." : "Create Team"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setMode("select")}
                className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
              >
                <ChevronUp className="h-4 w-4 rotate-90" />
                Back
              </button>
              <Input
                type="text"
                placeholder="Enter team key (e.g., ABC1-DEF2)"
                value={teamKeyInput}
                onChange={(e) => setTeamKeyInput(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700/50 text-white border-gray-600 focus:border-green-500 uppercase"
              />
              <button
                onClick={handleJoinTeam}
                disabled={isLoading}
                className="w-full relative inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed shadow-[0_4px_0_0_#166534] hover:shadow-[0_2px_0_0_#166534] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] disabled:shadow-none disabled:translate-y-0 rounded-lg"
              >
                {isLoading ? "Joining Team..." : "Join Team"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
