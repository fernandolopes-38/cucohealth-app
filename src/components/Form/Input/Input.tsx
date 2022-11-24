import React, { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  width?: number | string;
}

export const Input: React.FC<InputProps> = ({
  label,
  width,
  error,
  ...props
}) => {
  return (
    <div className={`${styles.container} ${error ? styles.error : ""}`}>
      {label && <label htmlFor={label}>{label}</label>}

      <input id={label ?? ""} style={{ width }} {...props} />

      {error && <span>{error}</span>}
    </div>
  );
};
