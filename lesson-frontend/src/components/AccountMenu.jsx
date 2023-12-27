// Importações de Bibliotecas e Frameworks
import * as React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  ListItemText,
} from "@mui/material";
import { Logout, Person } from "@mui/icons-material";

export function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Configurações da Conta">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Person sx={{ color: "var(--light-one)" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        style={{ marginTop: "25px" }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Person fontSize="small" sx={{ color: "var(--dark-three)" }} />
          </ListItemIcon>
          <ListItemText
            primary={"Perfil"}
            sx={{ color: "var(--dark-three)" }}
          />
        </MenuItem>
        <Divider />
        <Link
          onClick={() => {
            sessionStorage.removeItem("token");
          }}
          to="/login"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: "var(--dark-three)" }} />
            </ListItemIcon>
            <ListItemText
              primary={"Sair"}
              sx={{ color: "var(--dark-three)" }}
            />
          </MenuItem>
        </Link>
      </Menu>
    </React.Fragment>
  );
}
