import React from "react";
import styles from "./styles.module.scss";
import Logo from "../../assets/Logo.png";
import { Button } from "../Button";
import { Link } from "react-router-dom";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className={styles.header}>
      <div className={styles.row}>
        <Link to="/">
          <img src={Logo} alt="cuco health logo" />
        </Link>

        <Link to="/client-form">
          <Button type="button">Novo cliente</Button>
        </Link>
      </div>

      <h1>Clientes</h1>
    </header>
  );
};
