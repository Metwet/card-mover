import { useRef, useEffect } from "react";
import { Rect, Text, Group, Transformer } from "react-konva";
import Konva from "konva";
import { CanvasCard as CanvasCardType } from "@/entities/card/model/types";

interface CanvasCardProps {
  card: CanvasCardType;
  onSelect: (id: string, isCtrlPressed?: boolean) => void;
  onDragMove: (id: string, x: number, y: number, deltaX: number, deltaY: number) => void;
  onDragEnd: (id: string, x: number, y: number, deltaX: number, deltaY: number) => void;
  onTransform: (id: string, width: number, height: number) => void;
}

export const CanvasCard = ({
  card,
  onSelect,
  onDragMove,
  onDragEnd,
  onTransform,
}: CanvasCardProps) => {
  const shapeRef = useRef<Konva.Group>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const dragStartPosRef = useRef<{ x: number; y: number } | null>(null);

  const { id, x, y, text, isSelected, width, height, color } = card;

  const handleSelect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    const isCtrlPressed = 'ctrlKey' in e.evt && (e.evt.ctrlKey || e.evt.metaKey);
    onSelect(id, isCtrlPressed);
  };

  const handleDragStart = () => {
    dragStartPosRef.current = { x, y };
  };

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    if (!dragStartPosRef.current) return;
    const newX = e.target.x();
    const newY = e.target.y();
    const deltaX = newX - dragStartPosRef.current.x;
    const deltaY = newY - dragStartPosRef.current.y;
    onDragMove(id, newX, newY, deltaX, deltaY);
  };

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const newX = e.target.x();
    const newY = e.target.y();
    const deltaX = dragStartPosRef.current ? newX - dragStartPosRef.current.x : 0;
    const deltaY = dragStartPosRef.current ? newY - dragStartPosRef.current.y : 0;
    onDragEnd(id, newX, newY, deltaX, deltaY);
    dragStartPosRef.current = null;
  };

  const handleTransformEnd = () => {
    if (shapeRef.current) {
      const node = shapeRef.current;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      node.scaleX(1);
      node.scaleY(1);

      onTransform(
        id,
        Math.max(5, width * scaleX),
        Math.max(5, height * scaleY),
      );
    }
  };

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, width, height]);

  return (
    <>
      <Group
        ref={shapeRef}
        x={x}
        y={y}
        draggable
        onClick={handleSelect}
        onTap={handleSelect}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      >
        <Rect
          width={width}
          height={height}
          fill={color}
          shadowBlur={isSelected ? 10 : 5}
          shadowColor="black"
          shadowOpacity={0.3}
          cornerRadius={8}
          stroke={isSelected ? "#1976d2" : undefined}
          strokeWidth={isSelected ? 3 : 0}
        />
        <Text
          text={text}
          width={width}
          height={height}
          align="center"
          verticalAlign="middle"
          fontSize={18}
          fontFamily="Montserrat, Arial, sans-serif"
          fontStyle="600"
          fill="#000"
          padding={10}
        />
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          borderStroke="#1976d2"
          borderStrokeWidth={2}
          anchorStroke="#1976d2"
          anchorFill="#fff"
          anchorSize={8}
        />
      )}
    </>
  );
};
