"use client";

import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "@/actions/admin/settings.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import customSwal from "@/utils/swal";

export default function SettingsPage() {
  const [registrationEnabled, setRegistrationEnabled] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const result = await getSettings();
      if (result.success) {
        setRegistrationEnabled(result.registrationEnabled ?? false);
      }
      setLoading(false);
    };
    loadSettings();
  }, []);

  const handleToggleRegistrations = async () => {
    const result = await updateSettings({
      registrationEnabled: !registrationEnabled,
    });
    if (result.success) {
      customSwal.fire("Success!", result.message, "success");
      setRegistrationEnabled(result.registrationEnabled ?? false);
    } else {
      customSwal.fire("Error!", result.message, "error");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        Settings
      </h1>

      <Card className="bg-gray-900/80 border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-white">General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <div className="h-6 w-2/3 bg-gray-700 rounded animate-pulse" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-medium text-white">Allow Registrations</h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Toggle this to enable or disable event registrations for all users
                  </p>
                </div>
                <Switch
                  checked={registrationEnabled}
                  onCheckedChange={handleToggleRegistrations}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
