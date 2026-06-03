
"use client";

import { useState, useEffect } from "react";
import { uploadProfilePhoto } from "@/actions/profile.action";
import { UserCircle2, Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import customSwal from "@/utils/swal";
import imageCompression from "browser-image-compression";

interface ProfilePhotoUploadProps {
  currentPhoto?: string;
  userEmail: string;
}

export default function ProfilePhotoUpload({
  currentPhoto,
}: ProfilePhotoUploadProps) {
  const [photo, setPhoto] = useState<string | undefined>(currentPhoto);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setPhoto(currentPhoto);
  }, [currentPhoto]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      customSwal.fire("Error!", "Please select an image file", "error");
      return;
    }

    setIsUploading(true);
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const result = await uploadProfilePhoto(base64);
        if (result.success && result.photoUrl) {
          setPhoto(result.photoUrl);
          customSwal.fire("Success!", "Profile photo uploaded!", "success");
        } else {
          customSwal.fire("Error!", result.message, "error");
        }
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      customSwal.fire("Error!", "Failed to upload photo", "error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <style>{`
          @keyframes fireSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes firePulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
          }
          
          .fire-ring-1 {
            animation: fireSpin 3s linear infinite, firePulse 2s ease-in-out infinite;
          }
          
          .fire-ring-2 {
            animation: fireSpin 2s linear infinite reverse, firePulse 1.5s ease-in-out infinite;
          }
          
          .fire-ring-3 {
            animation: fireSpin 4s linear infinite, firePulse 2.5s ease-in-out infinite;
          }
        `}</style>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="fire-ring-1 absolute h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-gradient-to-br from-red-600 via-red-800 to-black opacity-70 blur-xl"></div>
          <div className="fire-ring-2 absolute h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-gradient-to-br from-red-500 via-orange-600 to-black opacity-80 blur-lg"></div>
          <div className="fire-ring-3 absolute h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-red-400 via-red-700 to-black opacity-90 blur-md"></div>
        </div>
        
        <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-red-600">
          {photo ? (
            <Image
              src={photo}
              alt="Profile"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserCircle2 className="h-12 w-12 sm:h-16 sm:w-16 text-red-400" />
          )}
        </div>
        <label className="absolute bottom-0 right-0 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white rounded-full p-2 cursor-pointer shadow-lg">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            disabled={isUploading}
            className="hidden"
          />
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Camera className="h-4 w-4" />
          )}
        </label>
      </div>
      <p className="text-gray-400 text-sm">Click to upload profile photo</p>
    </div>
  );
}

