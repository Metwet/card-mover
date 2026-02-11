"use client";

import { useState, useRef } from "react";
import { Box } from "@mui/material";
import { dashboardContainerStyles } from "./styles";
import { CardCanvas } from "@/features/card-canvas";
import { CardList } from "@/features/card-list";
import { Card, CanvasCard } from "@/entities/card";

export const Dashboard = () => {
  const [canvasCards, setCanvasCards] = useState<CanvasCard[]>([]);
  const draggedCardRef = useRef<Card | null>(null);

  const handleCardDragStart = (card: Card) => {
    draggedCardRef.current = card;
  };

  const handleCardDrop = (x: number, y: number) => {
    if (draggedCardRef.current) {
      const newCard: CanvasCard = {
        ...draggedCardRef.current,
        id: `canvas-${Date.now()}-${Math.random()}`,
        x,
        y,
        width: 150,
        height: 80,
        isSelected: false,
      };
      setCanvasCards((prev) => [...prev, newCard]);
      draggedCardRef.current = null;
    }
  };

  const handleCardUpdate = (id: string, updates: Partial<CanvasCard>) => {
    setCanvasCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...updates } : card)),
    );
  };

  return (
    <Box sx={dashboardContainerStyles}>
      <CardList onCardDragStart={handleCardDragStart} />
      <CardCanvas
        cards={canvasCards}
        onCardDrop={handleCardDrop}
        onCardUpdate={handleCardUpdate}
      />
    </Box>
  );
};
