import { Box, Stack, Typography } from "@mui/material";
import { cardListContainerStyles, cardListTitleStyles } from "./styles";
import { ACCEPTANCE_STAGES, Card, CardItem } from "@/entities/card";

interface CardListProps {
  onCardDragStart: (card: Card) => void;
}

export const CardList = ({ onCardDragStart }: CardListProps) => {
  const cards: Card[] = ACCEPTANCE_STAGES.map((stage, index) => ({
    id: `card-${index}`,
    ...stage,
  }));

  return (
    <Box sx={cardListContainerStyles}>
      <Typography variant="h6" sx={cardListTitleStyles}>
        Карточки
      </Typography>
      <Stack spacing={2}>
        {cards.map((card) => (
          <CardItem key={card.id} card={card} onDragStart={onCardDragStart} />
        ))}
      </Stack>
    </Box>
  );
};
