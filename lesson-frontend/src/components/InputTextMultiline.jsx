// Importações de Bibliotecas e Frameworks
import { TextField } from "@mui/material";

export function InputTextMultiline({
  name,
  label,
  type,
  id,
  value,
  error,
  helperText,
  onChange,
  inputProps,
}) {
  return (
    <TextField
      margin="normal"
      fullWidth
      variant="standard"
      multiline
      maxRows={4}
      sx={{ marginTop: "15px", marginBottom: "15px" }}
      name={name}
      label={label}
      type={type}
      id={id}
      value={value}
      error={error ? true : false}
      helperText={error && helperText}
      onChange={onChange}
      inputProps={inputProps}
    />
  );
}
