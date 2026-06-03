"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, UserRound, MessageSquare, UsersRound, Settings, Home, User } from "lucide-react";
import { getDashboardStats } from "@/actions/admin/dashboard.action";

interface DashboardStats {
  totalUsers: number;
  totalEvents: number;
  totalRegistrations: number;
  totalMessages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalEvents: 0,
    totalRegistrations: 0,
    totalMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "from-blue-600 to-blue-700",
    },
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: Calendar,
      color: "from-green-600 to-green-700",
    },
    {
      title: "Registrations",
      value: stats.totalRegistrations,
      icon: UserRound,
      color: "from-purple-600 to-purple-700",
    },
    {
      title: "Messages",
      value: stats.totalMessages,
      icon: MessageSquare,
      color: "from-orange-600 to-orange-700",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        Dashboard
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <Card
            key={index}
            className="bg-gray-900/80 border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${card.color}`}>
                <card.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">
                {loading ? (
                  <div className="h-9 w-20 bg-gray-800 rounded animate-pulse" />
                ) : (
                  card.value
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all duration-300 py-6 sm:py-8 h-auto">
          <Link href="/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            <Home className="h-6 w-6" />
            <span className="text-lg font-semibold">Go to Home</span>
          </Link>
        </Button>
        <Button asChild className="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 shadow-lg hover:shadow-xl transition-all duration-300 py-6 sm:py-8 h-auto">
          <Link href="/profile" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            <User className="h-6 w-6" />
            <span className="text-lg font-semibold">View Profile</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
