// Importações de Bibliotecas e Frameworks
import { Typography } from "@mui/material";

export function HeadingText({ props }) {
  return (
    <Typography
      variant="h6"
      gutterBottom
      sx={{
        fontSize: "19px",
        fontWeight: "700",
        color: "var(--dark-one)",
      }}
    >
      {props}
    </Typography>
  );
}
