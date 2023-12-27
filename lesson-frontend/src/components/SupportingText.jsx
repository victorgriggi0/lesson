// Importações de Bibliotecas e Frameworks
import { Typography } from "@mui/material";

export function SupportingText({ props }) {
  return (
    <Typography
      variant="body2"
      gutterBottom
      sx={{
        fontSize: "13px",
        color: "var(--dark-one)",
      }}
    >
      {props}
    </Typography>
  );
}
