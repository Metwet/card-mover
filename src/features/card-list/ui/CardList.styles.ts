import { SxProps, Theme } from '@mui/material';

export const cardListContainerStyles: SxProps<Theme> = {
  width: '25%',
  height: '100vh',
  borderRight: 1,
  borderColor: 'divider',
  p: 2,
  bgcolor: 'background.paper',
  overflow: 'auto',
};

export const cardListTitleStyles: SxProps<Theme> = {
  mb: 2,
};
