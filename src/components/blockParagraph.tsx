import React from "react";
import { Block } from "../store/blockSlice";
import { useTextBlock } from "../lib/useTextBlock";

interface BlockParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  index: number;
  block: Block;
}

export const BlockParagraph = React.forwardRef<
  HTMLParagraphElement,
  BlockParagraphProps
>(({ block, index, ...rest }, ref) => {
  const { onBlur, onKeyDown } = useTextBlock(block, index);

  return (
    <p
      ref={ref}
      contentEditable
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      dangerouslySetInnerHTML={{ __html: block.data.text }}
      {...rest}
    />
  );
});
