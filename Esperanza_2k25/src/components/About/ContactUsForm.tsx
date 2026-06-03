"use client";
import { contactMessage } from "@/actions/contact.action";
import { useState } from "react";
import customSwal from "@/utils/swal";

import { sedgwick } from "@/utils/fonts";
const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      customSwal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fill all the fields",
      })
      return;
    }
    setErrorMessage("");
    const response = await contactMessage(
      formData.name,
      formData.email,
      formData.message
    );
    customSwal.fire({
      icon: response.success ? "success" : "error",
      title: response.success ? "Success" : "Error",
      text: response.message,
      confirmButtonText: "Okay",
    }).then(() => {
      if (response.success) {
        setFormData({ name: "", email: "", message: "" });
      }
    });
  };
  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <label className={`${sedgwick.className} block text-lg font-medium mb-2`}>Name</label>
        <input
          type="text"
          className="w-full p-3 bg-white/80 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
      <label className={`${sedgwick.className} block text-lg font-medium mb-2`}>Email</label>
        <input
          type="email"
          className="w-full p-3 bg-white/80 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div>
      <label className={`${sedgwick.className} block text-lg font-medium mb-2`}>message</label>
        <textarea
          className="w-full p-3 bg-white/80 border border-gray-700 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 text-black"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          required
        ></textarea>
      </div>
      {errorMessage && <p className="text-red-500 text-lg">{errorMessage}</p>}
      <button
        type="submit"
        className={`${sedgwick.className} w-full cursor-pointer p-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-white text-lg transition-colors duration-300`}
      >
        Submit
      </button>
    </form>
  );
};

export default ContactUsForm;
