import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  width?: number | string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, width, error, icon, ...props }, ref) => {
    return (
      <div
        className={`${styles.container} ${error ? styles.error : ""} ${
          icon ? styles.icon : ""
        }`}
      >
        {label && <label htmlFor={label}>{label}</label>}

        <input ref={ref} id={label ?? ""} style={{ width }} {...props} />

        {icon && <span className={styles.icon}>{icon}</span>}
        {error && <span>{error}</span>}
      </div>
    );
  }
);
