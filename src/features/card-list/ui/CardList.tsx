import { Box, Typography, Stack } from '@mui/material';
import { Card, ACCEPTANCE_STAGES } from '@/entities/card/model/types';
import { CardItem } from '@/entities/card/ui/CardItem';
import { cardListContainerStyles, cardListTitleStyles } from './CardList.styles';

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
