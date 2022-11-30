import React from "react";
import styles from "./styles.module.scss";
import Logo from "../../assets/Logo.png";
import { Button } from "../Button";
import { Link, useLocation, useParams } from "react-router-dom";

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { id } = useParams();

  const RenderTitle = () => {
    if (pathname === "/") {
      return <h1>Clientes</h1>;
    }
    if (id) {
      return <h1>Editar Cliente</h1>;
    }
    return <h1>Novo Cliente</h1>;
  };

  return (
    <header className={styles.header}>
      <div className={styles.row}>
        <Link to="/">
          <img src={Logo} alt="cuco health logo" />
        </Link>

        {pathname === "/" && (
          <Link to="/client-form">
            <Button type="button">Novo cliente</Button>
          </Link>
        )}
      </div>

      <RenderTitle />
    </header>
  );
};
