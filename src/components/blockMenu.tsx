import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useOutsideClick } from "@/lib/useOutsideClick";
import { AddHeadingButton } from "./menu/headingButton";
import { AddTextButton } from "./menu/textButton";

export interface BlockMenuProps {
  index: number;
}

export function BlockMenu({ index }: BlockMenuProps) {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const ref = useOutsideClick(() => setIsHovered(false));

  function onMouseLeave() {
    if (!ref.current || !ref.current.children) {
      return;
    }

    const [child] = ref.current.children;

    if (!child) {
      return;
    }

    const isOpen = (child.attributes as any)["data-state"].value;
    if (isOpen === "closed") setIsHovered(false);
  }

  function onMouseEnter() {
    setIsHovered(true);
  }

  return (
    <div
      ref={ref}
      className="block-menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isHovered ? (
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent>
            <div className="block-menu-content">
              <AddHeadingButton index={index} />
              <AddTextButton index={index} />
            </div>
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  );
}
