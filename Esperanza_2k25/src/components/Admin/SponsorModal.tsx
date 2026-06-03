"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import imageCompression from "browser-image-compression";
import customSwal from "@/utils/swal";

interface Sponsor {
  _id?: string;
  name: string;
  logoUrl: string;
  website: string;
  description?: string;
}

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
  sponsor?: Sponsor | null;
  onSave: (data: Partial<Sponsor>) => Promise<void>;
}

export default function SponsorModal({
  isOpen,
  onClose,
  sponsor,
  onSave,
}: SponsorModalProps) {
  const [formData, setFormData] = useState<Partial<Sponsor>>({
    name: "",
    logoUrl: "",
    website: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

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
      formData.append("folder", "esperanza2k26/sponsors");

      const response = await fetch("/api/admin/cloudinary", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, logoUrl: data.secure_url }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploadingImage(false);
    }
  };

  useEffect(() => {
    if (isOpen && sponsor) {
      setModalLoading(true);
      setTimeout(() => {
        setFormData({
          name: sponsor.name || "",
          logoUrl: sponsor.logoUrl || "",
          website: sponsor.website || "",
          description: sponsor.description || "",
        });
        setModalLoading(false);
      }, 100);
    } else if (isOpen && !sponsor) {
      setFormData({
        name: "",
        logoUrl: "",
        website: "",
        description: "",
      });
      setModalLoading(false);
    }
  }, [isOpen, sponsor]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.name?.trim()) {
      customSwal.fire("Error", "Please enter a sponsor name", "error");
      return;
    }
    if (!formData.website?.trim()) {
      customSwal.fire("Error", "Please enter a website URL", "error");
      return;
    }
    if (!formData.logoUrl?.trim()) {
      customSwal.fire("Error", "Please upload a logo image", "error");
      return;
    }

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
            {sponsor ? "Edit Sponsor" : "Add Sponsor"}
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
            <div className="animate-pulse text-white text-lg">
              Loading sponsor details...
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Sponsor Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter sponsor name"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="text-white">
                  Website
                </Label>
                <Input
                  id="website"
                  placeholder="https://example.com"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Logo</Label>
                <div className="flex items-start gap-4">
                  {formData.logoUrl && (
                    <div className="w-32 h-32 rounded-xl overflow-hidden border border-gray-700 bg-gray-800">
                      <img
                        src={formData.logoUrl}
                        alt="Sponsor logo"
                        className="w-full h-full object-contain p-2"
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
                      <p className="text-sm text-gray-400 mt-2">
                        Uploading...
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter sponsor description"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[120px]"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
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
                {loading ? "Saving..." : "Save Sponsor"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
