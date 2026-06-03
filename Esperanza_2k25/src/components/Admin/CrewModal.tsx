"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import imageCompression from "browser-image-compression";
import customSwal from "@/utils/swal";

interface CrewMember {
  _id?: string;
  name: string;
  department: string;
  year: string;
  avatar: string;
  category: string[];
  lead?: string;
  role?: string;
  socials: { handler: string; link: string }[];
}

interface CrewModalProps {
  isOpen: boolean;
  onClose: () => void;
  member?: CrewMember | null;
  onSave: (data: Partial<CrewMember>) => Promise<void>;
}

export default function CrewModal({ isOpen, onClose, member, onSave }: CrewModalProps) {
  const [formData, setFormData] = useState<Partial<CrewMember>>({
    name: "",
    department: "CSE",
    year: "1st",
    avatar: "",
    category: [],
    lead: "",
    role: "",
    socials: [{ handler: "LinkedIn", link: "" }, { handler: "Instagram", link: "" }],
  });
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const categories = [
    "cultural",
    "technical",
    "management",
    "pr",
    "sponsor",
    "finance",
    "audit",
    "content",
    "decoration",
    "hospitality",
    "security",
    "stage management",
    "videography",
  ];

  useEffect(() => {
    if (isOpen && member) {
      setModalLoading(true);
      setTimeout(() => {
        setFormData({
          name: member.name || "",
          department: member.department || "CSE",
          year: member.year || "1st",
          avatar: member.avatar || "",
          category: member.category || [],
          lead: member.lead || "",
          role: member.role || "",
          socials: member.socials || [{ handler: "LinkedIn", link: "" }, { handler: "Instagram", link: "" }],
        });
        setModalLoading(false);
      }, 100);
    } else if (isOpen && !member) {
      setFormData({
        name: "",
        department: "CSE",
        year: "1st",
        avatar: "",
        category: [],
        lead: "",
        role: "",
        socials: [{ handler: "LinkedIn", link: "" }, { handler: "Instagram", link: "" }],
      });
      setModalLoading(false);
    }
  }, [isOpen, member]);

  if (!isOpen) return null;

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
      formData.append("folder", "esperanza2k26/crew");

      const response = await fetch("/api/admin/cloudinary", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, avatar: data.secure_url }));
        customSwal.fire("Success!", "Photo uploaded successfully", "success");
      } else {
        customSwal.fire("Error!", data.error || "Failed to upload photo", "error");
      }
    } catch (error) {
      console.error(error);
      customSwal.fire("Error!", "Failed to compress/upload photo", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => {
      const currentCategories = prev.category || [];
      const newCategories = currentCategories.includes(category)
        ? currentCategories.filter((c) => c !== category)
        : [...currentCategories, category];
      return { ...prev, category: newCategories };
    });
  };

  const handleSocialChange = (index: number, field: "handler" | "link", value: string) => {
    setFormData((prev) => {
      const newSocials = [...(prev.socials || [])];
      newSocials[index][field] = value;
      return { ...prev, socials: newSocials };
    });
  };

  const handleAddSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...(prev.socials || []), { handler: "", link: "" }],
    }));
  };

  const handleRemoveSocial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socials: (prev.socials || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const normalizedFormData = {
        ...formData,
        socials: (formData.socials || []).map(social => ({
          ...social,
          link: social.link && !social.link.startsWith("http")
            ? `https://${social.link.replace(/^\/+/, "")}`
            : social.link,
        })),
      };
      await onSave(normalizedFormData);
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
            {member ? "Edit Crew Member" : "Add Crew Member"}
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
            <div className="animate-pulse text-white text-lg">Loading crew details...</div>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name" className="text-white">Name</Label>
              <Input
                id="name"
                placeholder="Enter name"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-white">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="year" className="text-white">Year</Label>
              <Select
                value={formData.year}
                onValueChange={(value) => setFormData({ ...formData, year: value })}
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
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-white">Profile Photo</Label>
              <div className="flex items-center gap-4">
                {formData.avatar && (
                  <img
                    src={formData.avatar}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
                  />
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="bg-gray-800 border-gray-700 text-white"
                    disabled={uploadingImage}
                  />
                  {uploadingImage && (
                    <p className="text-sm text-gray-400 mt-2">Uploading and compressing...</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-white">Categories</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      (formData.category || []).includes(category)
                        ? "bg-red-600 text-white"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom category..."
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && customCategory.trim()) {
                      handleCategoryToggle(customCategory.trim());
                      setCustomCategory("");
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (customCategory.trim()) {
                      handleCategoryToggle(customCategory.trim());
                      setCustomCategory("");
                    }
                  }}
                  className="bg-gray-700 hover:bg-gray-600"
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lead" className="text-white">Lead Role (Optional)</Label>
              <Input
                id="lead"
                placeholder="e.g., cultural-head, technical-head"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                value={formData.lead}
                onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-white">Role (Optional)</Label>
              <Input
                id="role"
                placeholder="e.g., ui-ux, web-content-writer, videography"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>

            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center justify-between">
                <Label className="text-white">Social Links</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-gray-800"
                  onClick={handleAddSocial}
                >
                  + Add Social
                </Button>
              </div>
              <div className="space-y-3">
                {(formData.socials || []).map((social, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                      placeholder="Handler (e.g., LinkedIn, Instagram)"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      value={social.handler}
                      onChange={(e) => handleSocialChange(index, "handler", e.target.value)}
                    />
                    <Input
                      placeholder="Link"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 md:col-span-2"
                      value={social.link}
                      onChange={(e) => handleSocialChange(index, "link", e.target.value)}
                    />
                    {(formData.socials || []).length > 2 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="md:col-start-3"
                        onClick={() => handleRemoveSocial(index)}
                      >
                        -
                      </Button>
                    )}
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
              {loading ? "Saving..." : (member ? "Update Member" : "Add Member")}
            </Button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
