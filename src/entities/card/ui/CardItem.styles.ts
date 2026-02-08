import { SxProps, Theme } from "@mui/material";

export const cardItemStyles: SxProps<Theme> = {
  color: "FieldText",
  textAlign: "center",
  cursor: "grab",
  "&:active": {
    cursor: "grabbing",
  },
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: 3,
  },
  transition: "all 0.2s",
};
