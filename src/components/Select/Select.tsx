import { MouseEvent, useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { Option } from "../../types";
import styles from "./styles.module.scss";

interface SelectElementProps {
  options: Option[];
  width?: number | string;
  backgroundColor?: string;
  onChange: (option: number | string) => void;
}

export const Select: React.FC<SelectElementProps> = ({
  options = [],
  width,
  backgroundColor,
  onChange,
}) => {
  const setFirstOption = (): Option => {
    if (options.length) {
      return options[0];
    }
    return { value: "", label: "No options" };
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>(
    setFirstOption()
  );

  const selectRef = useRef<HTMLButtonElement>(null);

  useOutsideClick({
    ref: selectRef,
    callback: () => setIsOpen(false),
  });

  const handleOptionClick = (option: Option) => () => {
    setIsOpen(false);
    setSelectedOption(option);
    onChange(option.value);
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${styles.container} ${isOpen ? styles.open : ""}`}
      style={{ width, backgroundColor }}
    >
      <button
        ref={selectRef}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onMouseDown={handleButtonClick}
      >
        <p>{selectedOption?.label}</p>

        <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
          <path
            d="M3 5L6 8L9 5"
            stroke="#252728"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={`${styles.content} ${isOpen ? styles.open : ""}`}>
        {options.map((option) => (
          <div
            key={option.value}
            className={styles.option}
            onClick={handleOptionClick(option)}
          >
            <p>{option.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
