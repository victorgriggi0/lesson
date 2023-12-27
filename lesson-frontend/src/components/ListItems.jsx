// Importações de Bibliotecas e Frameworks
import * as React from "react";
import { Link } from "react-router-dom";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
} from "@mui/material";
import { Home, People, Workspaces, Bookmark } from "@mui/icons-material";

function ListSubheaderStyled({ props }) {
  return (
    <ListSubheader component="div" inset sx={{ color: "var(--dark-three)" }}>
      {props}
    </ListSubheader>
  );
}

function ListItemTextStyled({ primary }) {
  return (
    <ListItemText
      primary={
        <Typography
          variant="subtitle2"
          sx={{
            color: "var(--dark-three)",
            fontWeight: "400",
            fontSize: "14px",
          }}
        >
          {primary}
        </Typography>
      }
    />
  );
}

function ListItemIconStyled({ tooltipTitle, icon }) {
  return (
    <ListItemIcon>
      <Tooltip title={tooltipTitle}>
        {React.cloneElement(icon, { sx: { color: "var(--dark-three)" } })}
      </Tooltip>
    </ListItemIcon>
  );
}

export const mainListItems = (
  <React.Fragment>
    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIconStyled icon={<Home />} tooltipTitle="Página Inicial" />
        <ListItemTextStyled primary={"Página Inicial"} />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheaderStyled props="Informações" />

    <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIconStyled icon={<People />} tooltipTitle="Usuários" />
        <ListItemTextStyled primary={"Usuários"} />
      </ListItemButton>
    </Link>

    <Link to="/companies" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIconStyled icon={<Workspaces />} tooltipTitle="Empresas" />
        <ListItemTextStyled primary={"Empresas"} />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const tertiaryListItems = (
  <React.Fragment>
    <ListSubheaderStyled props="Base de Dados" />

    <Link to="/roles" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIconStyled icon={<Bookmark />} tooltipTitle="Cargos" />
        <ListItemTextStyled primary={"Cargos"} />
      </ListItemButton>
    </Link>

    <Link to="/conditions" style={{ textDecoration: "none", color: "inherit" }}>
      <ListItemButton>
        <ListItemIconStyled icon={<Bookmark />} tooltipTitle="Condições" />
        <ListItemTextStyled primary={"Condições"} />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
