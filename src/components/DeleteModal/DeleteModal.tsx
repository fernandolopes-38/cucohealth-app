import React from "react";
import { Button } from "../Button";
import styles from "./styles.module.scss";

interface DeleteModalProps {
  text: string;
  onDeleteClick: () => void;
  onCancelClick: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  text,
  onDeleteClick,
  onCancelClick,
}) => {
  return (
    <div className={styles.container}>
      <h3>{text}</h3>

      <div className={styles.buttons__container}>
        <Button theme="plain" onClick={onCancelClick}>
          Cancelar
        </Button>
        <Button theme="danger" onClick={onDeleteClick}>
          Excluir
        </Button>
      </div>
    </div>
  );
};
