import React from "react";

export function useMenu() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen(!isOpen);
  }

  return { isOpen, onOpen, onClose, toggle };
}
