"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFViewerProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
  totalPages?: number;
}

export default function PDFViewer({ pdfUrl, isOpen, onClose }: PDFViewerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl mx-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 rounded-t-xl">
          <h2 className="text-xl font-bold text-white">Rule Book</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="bg-gray-900 p-4 rounded-b-xl">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-[70vh] rounded-xl border border-gray-700"
              style={{ border: "none" }}
              title="Rule Book"
            />
          ) : (
            <div className="w-full h-[70vh] flex items-center justify-center text-gray-500">
              No PDF URL provided
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
