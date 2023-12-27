// Importações de Componentes
import Logo from "./images/logo.png"; /* 512 x 512 px */

function LoginLogoComponent() {
  return (
    <img
      src={Logo}
      alt="Logo do Vale do Pacu"
      style={{
        margin: "15px",
        width: "100px",
        objectFit: "cover",
      }}
    />
  );
}

export { LoginLogoComponent };
