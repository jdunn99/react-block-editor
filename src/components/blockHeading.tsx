import React from "react";
import { useEditorContext } from "../lib/useEditorContext";

interface HeadingParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  index: number;
  level: number;
}

export const BlockHeading = React.forwardRef<
  HTMLParagraphElement,
  HeadingParagraphProps
>(({ index, level, ...rest }, ref) => {
  const updateHeadingBlock = useEditorContext(
    (state) => state.updateHeadingBlock
  );

  function onBlur(event: React.FocusEvent<HTMLHeadingElement>) {
    updateHeadingBlock(index, {
      text: event.target.innerHTML,
      level,
    });
  }

  return React.createElement(`h${level}`, {
    onBlur,
    ref,
    contentEditable: true,
    ...rest,
  });
});
