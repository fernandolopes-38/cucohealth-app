import { forwardRef, InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ ...props }, ref) => {
    return (
      <label className={styles.container}>
        <input type="checkbox" ref={ref} {...props} />
      </label>
    );
  }
);
