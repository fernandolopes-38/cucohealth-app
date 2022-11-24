import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader } from "../Loader";
import styles from "./styles.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  width?: number;
  loading?: boolean;
  theme?: "success" | "plain";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  width,
  loading,
  children,
  theme = "primary",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[theme]} ${className}`}
      style={{ width }}
      disabled={loading}
      {...props}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};
