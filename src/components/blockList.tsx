import React from "react";
import { Block } from "../store/blockSlice";
import { ListData } from "@/store/listSlice";
import { useEditorContext } from "@/lib/useEditorContext";

enum ListHotkeys {
  Enter = "Enter",
  Backspace = "Backspace",
}

interface ListBlockProps extends React.HTMLAttributes<HTMLParagraphElement> {
  block: Block;
  index: number;
}

export function BlockList({ index, block }: ListBlockProps) {
  const updateListItem = useEditorContext((state) => state.updateListItem);
  const addListItem = useEditorContext((state) => state.addListItem);
  const ref = React.useRef<HTMLLIElement>(null);

  function onBlur(event: React.FocusEvent<HTMLLIElement>, listIndex: number) {
    updateListItem(index, listIndex, event.target.innerHTML);
  }

  function onKeydown(event: React.KeyboardEvent, listIndex: number) {
    const { key } = event;
    switch (key) {
      case ListHotkeys.Enter: {
        event.preventDefault();
        addListItem(index, listIndex, "");
        break;
      }
      default:
        break;
    }
  }

  React.useEffect(() => {
    ref.current?.focus();
  }, [ref]);

  return React.createElement(
    (block.data as ListData).type === "ordered" ? "ol" : "ul",
    {},
    (block.data as ListData).data.map((item, listIndex) => (
      <li
        ref={ref}
        onBlur={(event) => onBlur(event, listIndex)}
        contentEditable
        onKeyDown={(event) => onKeydown(event, listIndex)}
        dangerouslySetInnerHTML={{ __html: item }}
        key={listIndex}
      />
    ))
  );
}
