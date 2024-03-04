import React from "react";
import { useTextBlock } from "../lib/useTextBlock";
import { Block } from "../store/blockSlice";
import { HeadingData } from "../store/headingSlice";

interface HeadingParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  block: Block;
  index: number;
}

export const BlockHeading = React.forwardRef<
  HTMLParagraphElement,
  HeadingParagraphProps
>(({ block, index, ...rest }, ref) => {
  const { onBlur, onKeyDown } = useTextBlock(block, index);

  return React.createElement(`h${(block.data as HeadingData).level}`, {
    onBlur,
    ref,
    onKeyDown,
    contentEditable: true,
    autoFocus: true,
    dangerouslySetInnerHTML: {
      __html: (block.data as HeadingData).text,
    },
    ...rest,
  });
});
