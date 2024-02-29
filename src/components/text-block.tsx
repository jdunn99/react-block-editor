import React from "react";
import { BlockData } from "../lib/block";
import { useEditor } from "../lib/useEditor";
import { EditorBlockProps } from "./block";
import { ActionType } from "../lib/editor";

export function TextBlock<T extends BlockData>({
  block,
  index,
}: EditorBlockProps<T>) {
  const { dispatch } = useEditor();

  function handleInput(event: React.FocusEvent<HTMLDivElement>) {
    dispatch({
      type: ActionType.UPDATE_TEXT_BLOCK,
      payload: {
        index,
        text: event.target.innerHTML,
      },
    });
  }

  if (block instanceof TextBlock) {
    return (
      <p
        key={block.id}
        onBlur={handleInput}
        contentEditable
        dangerouslySetInnerHTML={{ __html: block.data.text! }}
      />
    );
  } else {
    const tag = "h" + block.data.level;
    return React.createElement(tag, {
      contentEditable: true,
      dangerouslySetInnerHTML: { __html: block.data.text! },
      onBlur: handleInput,
    });
  }
}
