"use client";

import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole, deleteUser } from "@/actions/admin/users.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Trash2, Loader2 } from "lucide-react";
import customSwal from "@/utils/swal";

interface User {
  _id: string;
  name: string;
  credentials: { email: string; phoneNumber: string };
  role: string;
  profilePhoto: string;
  registeredEvents: any[];
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      const result = await getAllUsers();
      if (result.success) {
        setUsers(result.users || []);
        setFilteredUsers(result.users || []);
      }
      setLoading(false);
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.credentials.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleRoleChange = async (userId: string, role: "user" | "admin") => {
    const result = await updateUserRole(userId, role);
    if (result.success) {
      customSwal.fire("Success!", result.message, "success");
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role } : u))
      );
    } else {
      customSwal.fire("Error!", result.message, "error");
    }
  };

  const handleDeleteUser = async (userId: string) => {
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
      const res = await deleteUser(userId);
      if (res.success) {
        customSwal.fire("Deleted!", res.message, "success");
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      } else {
        customSwal.fire("Error!", res.message, "error");
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        Users
      </h1>

      <Card className="bg-gray-900/80 border-gray-700">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-xl text-white">All Users</CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                className="pl-10 bg-gray-800 border-gray-700 text-white h-9 sm:h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50"
                >
                  <div className="h-12 w-12 rounded-full bg-gray-700 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 bg-gray-700 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-gray-700 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No users found
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <Avatar className="h-12 w-12">
                        {user.profilePhoto && (
                          <AvatarImage src={user.profilePhoto} />
                        )}
                        <AvatarFallback className="bg-red-600">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium text-white truncate">{user.name}</p>
                        <p className="text-sm text-gray-400 truncate">{user.credentials.email}</p>
                        <p className="text-xs text-gray-500">
                          {user.credentials.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t border-gray-700/50 sm:border-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm text-gray-400">Registrations:</span>
                        <span className="text-sm font-medium text-white bg-gray-900 px-2 py-0.5 rounded-md">
                          {user.registeredEvents.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select
                          value={user.role}
                          onValueChange={(value: "user" | "admin") =>
                            handleRoleChange(user._id, value)
                          }
                        >
                          <SelectTrigger className="w-28 sm:w-32 h-9 bg-gray-800 border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => handleDeleteUser(user._id)}
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
    </div>
  );
}
