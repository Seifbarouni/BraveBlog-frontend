import { useEffect, useRef, useState } from "react";

export const useOutsideAlerter = (initialValue: boolean) => {
  const [isOpen, setOpen] = useState<boolean>(initialValue);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("keydown", handleKeyPress, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [ref]);

  return { ref, isOpen, setOpen };
};
