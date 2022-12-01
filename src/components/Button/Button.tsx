import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader } from "../Loader";
import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: number;
  loading?: boolean;
  theme?: "success" | "plain" | "danger";
  className?: string;
  icon?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  width,
  loading,
  children,
  theme = "primary",
  className = "",
  icon,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[theme]} ${className} ${
        icon ? styles.icon : ""
      }`}
      style={{ width }}
      disabled={loading}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {loading ? <Loader /> : children}
    </button>
  );
};
