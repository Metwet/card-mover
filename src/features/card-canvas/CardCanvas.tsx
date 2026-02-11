"use client";

import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { KonvaEventObject } from "konva/lib/Node";
import { Layer, Stage } from "react-konva";
import { canvasContainerStyles } from "./styles";
import { CanvasCard } from "./ui/CanvasCard";
import { SelectionBox } from "./ui/SelectionBox";
import type { CanvasCard as CanvasCardType } from "@/entities/card";

interface SelectionRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CardCanvasProps {
  cards: CanvasCardType[];
  onCardDrop: (x: number, y: number) => void;
  onCardUpdate: (id: string, updates: Partial<CanvasCardType>) => void;
}

export const CardCanvas = ({
  cards,
  onCardDrop,
  onCardUpdate,
}: CardCanvasProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectionRect, setSelectionRect] = useState<SelectionRect | null>(
    null,
  );
  const [isSelecting, setIsSelecting] = useState(false);
  const [dragOffsets, setDragOffsets] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const containerRef = useRef<HTMLDivElement>(null);
  const selectionStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      onCardDrop(x, y);
    }
  };

  const handleSelect = (id: string, isCtrlPressed?: boolean) => {
    if (isCtrlPressed) {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
      );
    } else {
      setSelectedIds([id]);
    }
  };

  const handleStageMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedIds([]);
      const pos = e.target.getStage()?.getPointerPosition();
      if (pos) {
        selectionStartRef.current = pos;
        setIsSelecting(true);
      }
    }
  };

  const handleStageMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isSelecting || !selectionStartRef.current) return;

    const pos = e.target.getStage()?.getPointerPosition();
    if (!pos) return;

    const x = Math.min(selectionStartRef.current.x, pos.x);
    const y = Math.min(selectionStartRef.current.y, pos.y);
    const width = Math.abs(pos.x - selectionStartRef.current.x);
    const height = Math.abs(pos.y - selectionStartRef.current.y);

    setSelectionRect({ x, y, width, height });
  };

  const handleStageMouseUp = () => {
    if (!isSelecting || !selectionRect) {
      setIsSelecting(false);
      selectionStartRef.current = null;
      return;
    }

    // Определяем карточки, попадающие в область выделения
    const selected = cards
      .filter((card) => {
        const cardRight = card.x + card.width;
        const cardBottom = card.y + card.height;
        const rectRight = selectionRect.x + selectionRect.width;
        const rectBottom = selectionRect.y + selectionRect.height;

        return (
          card.x < rectRight &&
          cardRight > selectionRect.x &&
          card.y < rectBottom &&
          cardBottom > selectionRect.y
        );
      })
      .map((card) => card.id);

    setSelectedIds(selected);
    setSelectionRect(null);
    setIsSelecting(false);
    selectionStartRef.current = null;
  };

  const handleCardDragMove = (
    id: string,
    x: number,
    y: number,
    deltaX: number,
    deltaY: number,
  ) => {
    // Если карточка выделена вместе с другими, обновляем оффсеты для всех
    if (selectedIds.includes(id) && selectedIds.length > 1) {
      const newOffsets: Record<string, { x: number; y: number }> = {};
      selectedIds.forEach((selectedId) => {
        if (selectedId !== id) {
          const card = cards.find((c) => c.id === selectedId);
          if (card) {
            newOffsets[selectedId] = {
              x: deltaX,
              y: deltaY,
            };
          }
        }
      });
      setDragOffsets(newOffsets);
    }
  };

  const handleCardDragEnd = (
    id: string,
    x: number,
    y: number,
    deltaX: number,
    deltaY: number,
  ) => {
    // Если карточка выделена вместе с другими, двигаем всю группу
    if (selectedIds.includes(id) && selectedIds.length > 1) {
      selectedIds.forEach((selectedId) => {
        if (selectedId !== id) {
          const card = cards.find((c) => c.id === selectedId);
          if (card) {
            onCardUpdate(selectedId, {
              x: card.x + deltaX,
              y: card.y + deltaY,
            });
          }
        }
      });
    }
    onCardUpdate(id, { x, y });
    setDragOffsets({});
  };

  const handleCardTransform = (id: string, width: number, height: number) => {
    onCardUpdate(id, { width, height });
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Box
      ref={containerRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={canvasContainerStyles}
    >
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={handleStageMouseDown}
        onMouseMove={handleStageMouseMove}
        onMouseUp={handleStageMouseUp}
      >
        <Layer>
          {cards.map((card) => {
            const offset = dragOffsets[card.id] || { x: 0, y: 0 };
            return (
              <CanvasCard
                key={card.id}
                card={{
                  ...card,
                  x: card.x + offset.x,
                  y: card.y + offset.y,
                  isSelected: selectedIds.includes(card.id),
                }}
                onSelect={handleSelect}
                onDragMove={handleCardDragMove}
                onDragEnd={handleCardDragEnd}
                onTransform={handleCardTransform}
              />
            );
          })}
          {selectionRect && (
            <SelectionBox
              x={selectionRect.x}
              y={selectionRect.y}
              width={selectionRect.width}
              height={selectionRect.height}
            />
          )}
        </Layer>
      </Stage>
    </Box>
  );
};
