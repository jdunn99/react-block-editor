import React from "react";
import { useEditorContext } from "../lib/useEditorContext";

interface BlockParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  index: number;
}

export const BlockParagraph = React.forwardRef<
  HTMLParagraphElement,
  BlockParagraphProps
>(({ index, ...rest }, ref) => {
  const updateTextBlock = useEditorContext((state) => state.updateTextBlock);

  function onBlur(event: React.FocusEvent<HTMLParagraphElement>) {
    updateTextBlock(index, {
      text: event.target.innerHTML,
    });
  }

  return <p ref={ref} contentEditable onBlur={onBlur} {...rest} />;
});
