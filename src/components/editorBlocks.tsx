import React from "react";
import { Block } from "../store/blockSlice";
import { BlockHeading } from "./blockHeading";
import { BlockParagraph } from "./blockParagraph";

interface EditorBlockProps {
  index: number;
  block: Block;
  isLatest: boolean;
}

export function EditorBlocks({ block, index, isLatest }: EditorBlockProps) {
  const inputRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  switch (block.type) {
    case "heading":
      return (
        <BlockHeading
          ref={isLatest ? inputRef : undefined}
          index={index}
          block={block}
        />
      );
    case "text":
      return (
        <BlockParagraph
          index={index}
          block={block}
          ref={isLatest ? inputRef : undefined}
        />
      );
    default:
      return null;
  }
}
