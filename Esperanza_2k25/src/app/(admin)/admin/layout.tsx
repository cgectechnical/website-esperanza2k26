"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  MessageSquare,
  UsersRound,
  Menu,
  X,
  Hexagon,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import RadialBgRed from "@/assets/background/RadialBgRed.png";
import LogOutButton from "@/components/Profile/LogOutButton";
import { sedgwick } from "@/utils/fonts";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Crew",
    href: "/admin/crew",
    icon: UsersRound,
  },
  {
    title: "Events",
    href: "/admin/events",
    icon: Calendar,
  },
  {
    title: "Participants",
    href: "/admin/participants",
    icon: ClipboardList,
  },
  {
    title: "Sponsors",
    href: "/admin/sponsors",
    icon: Users,
  },
  {
    title: "Bands",
    href: "/admin/bands",
    icon: Calendar,
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const isAuthorized = session?.user?.role === "admin";

  return (
    <div className="h-screen bg-black text-white relative overflow-hidden">
      <Image
        src={RadialBgRed}
        alt="Background"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 z-0 pointer-events-none"
      />

      <div className={`relative z-10 flex h-screen ${!isAuthorized ? "blur-sm pointer-events-none" : ""}`}>
        <aside
          className={`fixed inset-y-0 left-0 z-50 bg-gray-900/95 border-r border-gray-700 backdrop-blur-sm transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? "w-16" : "w-56"
          } ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
          style={{ touchAction: "manipulation" }}
        >
          <div className="flex h-14 items-center justify-between px-3 border-b border-gray-700">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2">
                <Hexagon className="h-5 w-5 text-red-500" />
                <span className="text-lg font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  Esperanza Admin
                </span>
              </div>
            )}
            {sidebarCollapsed && (
              <Hexagon className="h-5 w-5 text-red-500 mx-auto" />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="p-2 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-600/30 text-red-400"
                      : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                  } ${sidebarCollapsed ? "justify-center" : ""}`}
                >
                  <item.icon className="h-4 w-4" />
                  {!sidebarCollapsed && item.title}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-700">
            {session ? (
              <>
                {!sidebarCollapsed && (
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-8 w-8">
                      {session?.user?.image && (
                        <AvatarImage src={session?.user?.image} />
                      )}
                      <AvatarFallback className="bg-red-600">
                        {session?.user?.name?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">
                        {session?.user?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                )}
                {sidebarCollapsed && (
                  <div className="flex flex-col items-center gap-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-red-600">
                        {session?.user?.name?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {!sidebarCollapsed && (
                    <div className="flex-1">
                      <LogOutButton />
                    </div>
                  )}
                  {sidebarCollapsed && (
                    <div className="flex-1 flex justify-center">
                      <LogOutButton />
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hidden lg:flex h-8"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  >
                    {sidebarCollapsed ? (
                      <ChevronRight className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronLeft className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Link href="/admin/login" className={`text-white flex items-center hover:text-red-400 cursor-pointer ${sedgwick.className}`}>
                  <LogIn className="mr-2 h-4 w-4" />
                  {!sidebarCollapsed && <span>Log In</span>}
                </Link>
                {!sidebarCollapsed && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hidden lg:flex h-8"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  >
                    {sidebarCollapsed ? (
                      <ChevronRight className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronLeft className="h-3.5 w-3.5" />
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </aside>

        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-56"} h-full`}
        >
          <header className="h-14 border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm flex items-center justify-between px-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex-1" />
          </header>

          <main className="flex-1 p-3 pb-16 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>

      {!isAuthorized && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 text-center max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
            <p className="text-gray-400 mb-6">You need to be logged in as an administrator to access this section.</p>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link href="/admin/login">Go to Login</Link>
            </Button>
          </div>
        </div>
      )}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {sidebarOpen && (
        <aside className="fixed inset-y-0 left-0 z-[60] bg-gray-900/95 border-r border-gray-700 backdrop-blur-sm w-56">
          <div className="flex h-14 items-center justify-between px-3 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Hexagon className="h-5 w-5 text-red-500" />
              <span className="text-lg font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Esperanza Admin
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="p-2 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-600/30 text-red-400"
                      : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-700">
            {session ? (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8">
                    {session?.user?.image && (
                      <AvatarImage src={session?.user?.image} />
                    )}
                    <AvatarFallback className="bg-red-600">
                      {session?.user?.name?.charAt(0) || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>
                <LogOutButton />
              </>
            ) : (
              <Link href="/admin/login" className={`text-white flex items-center justify-center hover:text-red-400 cursor-pointer ${sedgwick.className}`}>
                <LogIn className="mr-2 h-4 w-4" />
                <span>Log In</span>
              </Link>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}
