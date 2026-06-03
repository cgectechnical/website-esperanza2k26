"use client";

import { useEffect, useState } from "react";
import { getAllCrew, createCrewMember, deleteCrewMember, updateCrewMember } from "@/actions/admin/crew.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Trash2, Edit3 } from "lucide-react";
import customSwal from "@/utils/swal";
import CrewModal from "@/components/Admin/CrewModal";

interface CrewMember {
  _id: string;
  name: string;
  department: string;
  year: string;
  avatar: string;
  category: string[];
  lead?: string;
  role?: string;
  socials: { handler: string; link: string }[];
  createdAt: Date;
}

export default function CrewPage() {
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<CrewMember | null>(null);

  useEffect(() => {
    const loadCrew = async () => {
      const result = await getAllCrew();
      if (result.success) {
        setCrew(result.crew || []);
      }
      setLoading(false);
    };
    loadCrew();
  }, []);

  const handleSaveMember = async (data: Partial<CrewMember>) => {
    if (editingMember) {
      const res = await updateCrewMember(editingMember._id, data);
      if (res.success) {
        customSwal.fire("Success!", res.message, "success");
        setCrew((prev) =>
          prev.map((m) => (m._id === editingMember._id ? { ...m, ...data } : m))
        );
      } else {
        customSwal.fire("Error!", res.message, "error");
      }
    } else {
      const res = await createCrewMember(data as any);
      if (res.success) {
        customSwal.fire("Success!", res.message, "success");
        setCrew((prev) => [res.member, ...prev]);
      } else {
        customSwal.fire("Error!", res.message, "error");
      }
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    const result = await customSwal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      const res = await deleteCrewMember(memberId);
      if (res.success) {
        customSwal.fire("Deleted!", res.message, "success");
        setCrew((prev) => prev.filter((m) => m._id !== memberId));
      } else {
        customSwal.fire("Error!", res.message, "error");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Crew Management
        </h1>
        <Button 
          size="sm"
          className="sm:h-10 whitespace-nowrap px-3 sm:px-4"
          onClick={() => {
            setEditingMember(null);
            setModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:inline">Add Member</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      <Card className="bg-gray-900/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">All Crew Members</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-gray-800/50 animate-pulse"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-16 w-16 rounded-full bg-gray-700" />
                    <div className="flex-1">
                      <div className="h-4 w-3/4 bg-gray-700 rounded" />
                      <div className="h-3 w-1/2 bg-gray-700 rounded mt-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crew.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No crew members found
                </div>
              ) : (
                crew.map((member) => (
                  <div
                    key={member._id}
                    className="p-6 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          {member.avatar && <AvatarImage src={member.avatar} />}
                          <AvatarFallback className="bg-red-600">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-lg text-white">{member.name}</p>
                          <p className="text-sm text-gray-400">
                            {member.department} • {member.year}
                          </p>
                          {member.lead && (
                            <p className="text-xs text-red-400 font-semibold uppercase">
                              {member.lead}
                            </p>
                          )}
                          {member.role && (
                            <p className="text-xs text-gray-300">{member.role}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingMember(member);
                            setModalOpen(true);
                          }}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteMember(member._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <CrewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        member={editingMember}
        onSave={handleSaveMember}
      />
    </div>
  );
}
