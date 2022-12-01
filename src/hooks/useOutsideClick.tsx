import { MutableRefObject, useEffect } from "react";

interface useOutsideClickProps {
  ref: MutableRefObject<any>;
  callback: () => void;
}

export const useOutsideClick = ({ ref, callback }: useOutsideClickProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
