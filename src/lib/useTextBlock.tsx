import React from "react";
import { Block } from "../store/blockSlice";
import { useEditorContext } from "./useEditorContext";
import { HeadingData } from "../store/headingSlice";

enum TextHotkeys {
  Enter = "Enter",
  Backspace = "Backspace",
}

export function useTextBlock(block: Block, index: number) {
  const updateTextBlock = useEditorContext((state) => state.updateTextBlock);
  const updateHeadingBlock = useEditorContext(
    (state) => state.updateHeadingBlock
  );
  const deleteBlock = useEditorContext((state) => state.deleteBlock);
  const addTextBlock = useEditorContext((state) => state.addTextBlock);
  const addHeadingBlock = useEditorContext((state) => state.addHeadingBlock);

  const onBlur = React.useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      const text = event.target.innerHTML;
      if (block.type === "text") {
        updateTextBlock(index, {
          text,
        });
      } else {
        updateHeadingBlock(index, {
          level: (block.data as HeadingData).level,
          text,
        });
      }
    },
    [block.data, block.type, updateHeadingBlock, updateTextBlock, index]
  );

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      const { key, currentTarget } = event;
      console.log(key);
      switch (key) {
        case TextHotkeys.Backspace: {
          if (currentTarget.innerHTML === "" && index !== 0) {
            deleteBlock(index);
          }

          break;
        }
        case TextHotkeys.Enter: {
          console.log(block.type);
          event.preventDefault();
          if (block.type === "text") {
            addTextBlock(index, {
              text: "",
            });
          } else {
            const data = block.data as HeadingData;
            addHeadingBlock(index, {
              level: data.level,
              text: "",
            });
          }
          break;
        }
        default:
          break;
      }
    },
    [addHeadingBlock, addTextBlock, block.data, block.type, deleteBlock, index]
  );

  return { onBlur, onKeyDown };
}
