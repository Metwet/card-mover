export interface Card {
  id: string;
  text: string;
  color: string;
}

export interface CanvasCard extends Card {
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
}

export const ACCEPTANCE_STAGES: Omit<Card, 'id'>[] = [
  { text: 'Отрицание', color: '#FF6B6B' },
  { text: 'Гнев', color: '#FFA06B' },
  { text: 'Торг', color: '#FFD93D' },
  { text: 'Депрессия', color: '#6BCF7F' },
  { text: 'Принятие', color: '#6B9DFF' },
];
