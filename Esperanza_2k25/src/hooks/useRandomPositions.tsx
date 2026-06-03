"use client";
import { useState, useEffect } from "react";

export function useRandomPositions(count: number) {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const newPositions = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setPositions(newPositions);
  }, [count]);

  return positions;
}
