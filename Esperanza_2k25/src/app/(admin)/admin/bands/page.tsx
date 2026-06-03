"use client";

import { useEffect, useState } from "react";
import {
  getAllBands,
  deleteBand,
  updateBand,
  createBand,
} from "@/actions/admin/bands.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit3 } from "lucide-react";
import customSwal from "@/utils/swal";
import BandModal from "@/components/Admin/BandModal";

interface Band {
  _id: string;
  title: string;
  imageUrl: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function BandsPage() {
  const [bands, setBands] = useState<Band[]>([]);
  const [filteredBands, setFilteredBands] = useState<Band[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBand, setEditingBand] = useState<Band | null>(null);

  useEffect(() => {
    const loadBands = async () => {
      const result = await getAllBands();
      if (result.success) {
        const allBands = result.bands || [];
        setBands(allBands);
        setFilteredBands(allBands);
      }
      setLoading(false);
    };
    loadBands();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBands(bands);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredBands(
        bands.filter((b) => b.title.toLowerCase().includes(query)),
      );
    }
  }, [searchQuery, bands]);

  const handleDeleteBand = async (bandId: string) => {
    const result = await customSwal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      const res = await deleteBand(bandId);
      if (res.success) {
        customSwal.fire("Deleted!", res.message, "success");
        setBands((prev) => prev.filter((b) => b._id !== bandId));
      } else {
        customSwal.fire("Error!", res.message, "error");
      }
    }
  };

  const handleSaveBand = async (data: Partial<Band>) => {
    if (editingBand) {
      const res = await updateBand(editingBand._id, data);
      if (res.success) {
        customSwal.fire("Success!", res.message, "success");
        setBands((prev) =>
          prev.map((b) => (b._id === editingBand._id ? { ...b, ...data } : b)),
        );
      } else {
        customSwal.fire("Error!", res.message, "error");
      }
    } else {
      const res = await createBand(data as any);
      if (res.success) {
        customSwal.fire("Success!", res.message, "success");
        setBands((prev) => [res.band, ...prev]);
      } else {
        customSwal.fire("Error!", res.message, "error");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Bands Management
        </h1>
        <div className="flex flex-row items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search bands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 flex-1 sm:w-64 h-9 sm:h-10"
          />
          <Button
            size="sm"
            className="sm:h-10 whitespace-nowrap px-3 sm:px-4"
            onClick={() => {
              setEditingBand(null);
              setModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Add Band</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      <Card className="bg-gray-900/80 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">All Bands</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-gray-800/50 animate-pulse"
                >
                  <div className="h-6 w-2/3 bg-gray-700 rounded mb-3" />
                  <div className="h-4 w-1/2 bg-gray-700 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBands.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No bands found
                </div>
              ) : (
                filteredBands.map((band) => (
                  <div
                    key={band._id}
                    className="p-6 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 flex-1 w-full">
                        {band.imageUrl && (
                          <div className="w-full sm:w-32 h-48 sm:h-24 rounded-xl overflow-hidden border border-gray-700 bg-gray-800 flex-shrink-0">
                            <img
                              src={band.imageUrl}
                              alt={band.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {band.title}
                          </h3>
                          {band.description && (
                            <p className="text-sm text-gray-400 leading-relaxed">
                              {band.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-start bg-gray-900/50 p-1 rounded-lg sm:bg-transparent sm:p-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-gray-700 text-gray-400 hover:text-white"
                          onClick={() => {
                            setEditingBand(band);
                            setModalOpen(true);
                          }}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="hover:bg-red-600"
                          onClick={() => handleDeleteBand(band._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <BandModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        band={editingBand}
        onSave={handleSaveBand}
      />
    </div>
  );
}
