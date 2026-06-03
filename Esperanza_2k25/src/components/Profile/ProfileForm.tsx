"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Save, X, Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { sedgwick } from "@/utils/fonts";
import { updateProfile } from "@/actions/profile.action";
import customSwal from "@/utils/swal";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  department: z.string().min(1, "Please select a department"),
  phoneNumber: z
    .string()
    .min(8, "Phone number must be at least 8 characters"),
  rollNumber: z.string().min(8, "Roll number must be at least 8 characters"),
  year: z.string().min(1, "Please select a year"),
  email: z.string().optional(),
});

const ProfileForm = ({
  user,
  onUpdate,
}: {
  user?: {
    name: string;
    rollNumber: string;
    email: string;
    phoneNumber: string;
    department: string;
    year: string;
  };
  onUpdate?: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      department: user?.department || "",
      phoneNumber: user?.phoneNumber || "",
      rollNumber: user?.rollNumber || "",
      year: user?.year || "",
      email: user?.email || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const result = await updateProfile(values);
      
      if (result.success) {
        customSwal.fire("Success!", result.message, "success");
        setIsEditing(false);
        if (onUpdate) onUpdate();
      } else {
        customSwal.fire("Error!", result.message, "error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      customSwal.fire("Error!", "Failed to update profile", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        <div className="flex justify-end mb-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="relative inline-flex items-center justify-center px-6 py-2 font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-[0_4px_0_0_#1e40af] hover:shadow-[0_2px_0_0_#1e40af] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] rounded-lg"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="relative inline-flex items-center justify-center px-6 py-2 font-bold text-white transition-all duration-200 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 shadow-[0_4px_0_0_#374151] hover:shadow-[0_2px_0_0_#374151] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] rounded-lg"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative inline-flex items-center justify-center px-6 py-2 font-bold text-white transition-all duration-200 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-[0_4px_0_0_#166534] hover:shadow-[0_2px_0_0_#166534] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={`${sedgwick.className} text-sm sm:text-base`}>
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter full name"
                  className="bg-gray-800/50 text-sm sm:text-base"
                  {...field}
                  disabled={!isEditing}
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={`${sedgwick.className} text-sm sm:text-base`}>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-gray-800/50 text-sm sm:text-base text-gray-400"
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rollNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={`${sedgwick.className} text-sm sm:text-base`}>
                Roll Number
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter roll number"
                  className="bg-gray-800/50 text-sm sm:text-base"
                  {...field}
                  disabled={!isEditing}
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={`${sedgwick.className} text-sm sm:text-base`}>
                Phone Number
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter phone number"
                  className="bg-gray-800/50 text-sm sm:text-base"
                  {...field}
                  disabled={!isEditing}
                />
              </FormControl>
              <FormMessage className="text-xs sm:text-sm" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${sedgwick.className} text-sm sm:text-base`}>Year</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter year"
                    className="bg-gray-800/50 text-sm sm:text-base"
                    {...field}
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${sedgwick.className} text-sm sm:text-base`}>
                  Department
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter department"
                    className="bg-gray-800/50 text-sm sm:text-base"
                    {...field}
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm" />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
