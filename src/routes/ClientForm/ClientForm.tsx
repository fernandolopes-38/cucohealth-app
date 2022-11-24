import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Form/Input";
import styles from "./styles.module.scss";

export const ClientForm: React.FC = () => {
  return (
    <div className={styles.container}>
      <fieldset>
        <div className={styles.row}>
          <Input placeholder="Nome" />
          <Input placeholder="CPF" />
        </div>
        <div className={styles.row}>
          <Input placeholder="Data de Nascimento" />
          <Input placeholder="Telefone" />
        </div>
      </fieldset>

      <footer>
        <Link to="/">
          <Button theme="plain">Cancelar</Button>
        </Link>
        <Button theme="success">Salvar</Button>
      </footer>
    </div>
  );
};
