import { useOutsideClick } from "@/lib/useOutsideClick";
import React from "react";

interface MenuProps {
  children?: React.ReactNode;
}

interface MenuOpenButtonProps {
  onOpen(): void;
  children?: React.ReactNode;
}

export function MenuOpenButton({ onOpen, children }: MenuOpenButtonProps) {
  return <button onClick={onOpen}>{children}</button>;
}

export function MenuContent({ children }: MenuProps) {
  return <ul className="menu-content">{children}</ul>;
}

export function Menu({
  children,
  onClose,
}: MenuProps & {
  onClose(): void;
}) {
  const ref = useOutsideClick(onClose);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      {children}
    </div>
  );
}
