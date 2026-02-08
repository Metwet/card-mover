import { Card as CardMUI, CardContent, Typography } from "@mui/material";
import { Card } from "../model/types";
import { cardItemStyles } from "./CardItem.styles";

interface CardItemProps {
  card: Card;
  onDragStart?: (card: Card) => void;
}

export const CardItem = ({ card, onDragStart }: CardItemProps) => {
  const { text, color } = card;

  return (
    <CardMUI
      draggable
      onDragStart={() => onDragStart?.(card)}
      sx={{
        ...cardItemStyles,
        backgroundColor: color,
      }}
    >
      <CardContent>
        <Typography variant="body1" fontSize={18} fontWeight={600}>
          {text}
        </Typography>
      </CardContent>
    </CardMUI>
  );
};
