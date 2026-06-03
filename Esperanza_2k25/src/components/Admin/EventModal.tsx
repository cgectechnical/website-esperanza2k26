"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import imageCompression from "browser-image-compression";

interface Event {
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
  leads: any[];
  participants: any[];
  nonRegisterable?: boolean;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: Event | null;
  onSave: (data: Partial<Event>) => Promise<void>;
}

export default function EventModal({ isOpen, onClose, event, onSave }: EventModalProps) {
  const [formData, setFormData] = useState<Partial<Event>>({
    eventName: "",
    eventDescription: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    venue: "",
    eventCategory: "technical",
    ruleBookLink: "",
    poster: "",
    nonRegisterable: false,
    leads: [],
  });
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      const formData = new FormData();
      formData.append("file", compressedFile);
      formData.append("folder", "esperanza2k26/events");

      const response = await fetch("/api/admin/cloudinary", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, poster: data.secure_url }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDoc(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "esperanza2k26/rulebooks");

      const response = await fetch("/api/admin/cloudinary", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, ruleBookLink: data.secure_url }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploadingDoc(false);
    }
  };

  useEffect(() => {
    if (isOpen && event) {
      setModalLoading(true);
      setTimeout(() => {
        setFormData({
          eventName: event.eventName || "",
          eventDescription: event.eventDescription || "",
          eventDate: event.eventDate || "",
          eventStartTime: event.eventStartTime || "",
          eventEndTime: event.eventEndTime || "",
          venue: event.venue || "",
          eventCategory: event.eventCategory || "technical",
          ruleBookLink: event.ruleBookLink || "",
          poster: event.poster || "",
          nonRegisterable: event.nonRegisterable || false,
          leads: event.leads || [],
        });
        setModalLoading(false);
      }, 100);
    } else if (isOpen && !event) {
      setFormData({
        eventName: "",
        eventDescription: "",
        eventDate: "",
        eventStartTime: "",
        eventEndTime: "",
        venue: "",
        eventCategory: "technical",
        ruleBookLink: "",
        poster: "",
        nonRegisterable: false,
        leads: [],
      });
      setModalLoading(false);
    }
  }, [isOpen, event]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto p-2 sm:p-4">
      <div className="relative w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl my-4 sm:my-8">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {event ? "Edit Event" : "Add Event"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>

        {modalLoading ? (
          <div className="p-8 flex items-center justify-center">
            <div className="animate-pulse text-white text-lg">Loading event details...</div>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="eventName" className="text-white">Event Name</Label>
              <Input
                id="eventName"
                placeholder="Enter event name"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="eventDescription" className="text-white">Description</Label>
              <Textarea
                id="eventDescription"
                placeholder="Enter event description"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[120px]"
                value={formData.eventDescription}
                onChange={(e) => setFormData({ ...formData, eventDescription: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDate" className="text-white">Date</Label>
              <Input
                id="eventDate"
                type="date"
                className="bg-gray-800 border-gray-700 text-white"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventStartTime" className="text-white">Start Time</Label>
              <Input
                id="eventStartTime"
                type="time"
                className="bg-gray-800 border-gray-700 text-white"
                value={formData.eventStartTime}
                onChange={(e) => setFormData({ ...formData, eventStartTime: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventEndTime" className="text-white">End Time</Label>
              <Input
                id="eventEndTime"
                type="time"
                className="bg-gray-800 border-gray-700 text-white"
                value={formData.eventEndTime}
                onChange={(e) => setFormData({ ...formData, eventEndTime: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="venue" className="text-white">Venue</Label>
              <Input
                id="venue"
                placeholder="Enter venue"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-white">Event Poster</Label>
              <div className="flex items-start gap-4">
                {formData.poster && (
                  <div className="w-32 h-32 rounded-xl overflow-hidden border border-gray-700 bg-gray-800">
                    <img
                      src={formData.poster}
                      alt="Event poster"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:border-0 file:text-white file:mr-4"
                  />
                  {uploadingImage && (
                    <p className="text-sm text-gray-400 mt-2">Uploading...</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventCategory" className="text-white">Category</Label>
              <Select
                value={formData.eventCategory}
                onValueChange={(value: "technical" | "cultural") =>
                  setFormData({ ...formData, eventCategory: value })
                }
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-white">Rule Book</Label>
              <div className="flex items-start gap-4">
                {formData.ruleBookLink && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700">
                    <span className="text-gray-300 text-sm truncate max-w-[200px]">
                      {formData.ruleBookLink}
                    </span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setFormData({ ...formData, ruleBookLink: "" })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleDocUpload}
                    disabled={uploadingDoc}
                    className="bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:border-0 file:text-white file:mr-4"
                  />
                  {uploadingDoc && (
                    <p className="text-sm text-gray-400 mt-2">Uploading rulebook...</p>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Or enter a link directly:
              </div>
              <Input
                placeholder="Enter rule book URL"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                value={formData.ruleBookLink}
                onChange={(e) => setFormData({ ...formData, ruleBookLink: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-2 md:col-span-2">
              <input
                type="checkbox"
                id="nonRegisterable"
                checked={formData.nonRegisterable}
                onChange={(e) => setFormData({ ...formData, nonRegisterable: e.target.checked })}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-red-600 focus:ring-red-600"
              />
              <Label htmlFor="nonRegisterable" className="text-white cursor-pointer">
                Non-Registerable
              </Label>
            </div>

            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center justify-between">
                <Label className="text-white">Event Leads</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-gray-800"
                  onClick={() => {
                    const currentLeads = formData.leads || [];
                    setFormData({
                      ...formData,
                      leads: [...currentLeads, { name: "", year: "1st", department: "CSE", contact: "" }],
                    });
                  }}
                >
                  + Add Lead
                </Button>
              </div>
              <div className="space-y-3">
                {(formData.leads || []).map((lead, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 rounded-xl bg-gray-800/50">
                    <Input
                      placeholder="Lead Name"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      value={lead.name || ""}
                      onChange={(e) => {
                        const newLeads = [...(formData.leads || [])];
                        newLeads[index].name = e.target.value;
                        setFormData({ ...formData, leads: newLeads });
                      }}
                    />
                    <Select
                      value={lead.year || "1st"}
                      onValueChange={(value) => {
                        const newLeads = [...(formData.leads || [])];
                        newLeads[index].year = value;
                        setFormData({ ...formData, leads: newLeads });
                      }}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="1st">1st Year</SelectItem>
                        <SelectItem value="2nd">2nd Year</SelectItem>
                        <SelectItem value="3rd">3rd Year</SelectItem>
                        <SelectItem value="4th">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={lead.department || "CSE"}
                      onValueChange={(value) => {
                        const newLeads = [...(formData.leads || [])];
                        newLeads[index].department = value;
                        setFormData({ ...formData, leads: newLeads });
                      }}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="CSE">CSE</SelectItem>
                        <SelectItem value="ECE">ECE</SelectItem>
                        <SelectItem value="EE">EE</SelectItem>
                        <SelectItem value="ME">ME</SelectItem>
                        <SelectItem value="CE">CE</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Contact"
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                        value={lead.contact || ""}
                        onChange={(e) => {
                          const newLeads = [...(formData.leads || [])];
                          newLeads[index].contact = e.target.value;
                          setFormData({ ...formData, leads: newLeads });
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          const newLeads = (formData.leads || []).filter((_, i) => i !== index);
                          setFormData({ ...formData, leads: newLeads });
                        }}
                      >
                        -
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Event"}
            </Button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
