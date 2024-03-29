import React from "react";
import { Block } from "../store/blockSlice";
import { ListData, ListInternalData, ListType } from "@/store/listSlice";
import { useEditorContext } from "@/lib/useEditorContext";

enum ListHotkeys {
  Enter = "Enter",
  Backspace = "Backspace",
  Tab = "Tab",
}

interface ListBlockProps extends React.HTMLAttributes<HTMLParagraphElement> {
  block: Block;
  index: number;
}

interface ListInternalProps {
  data: ListInternalData[];
  type: ListType;
  blockIndex: number;
  indices: number[];
}

function ListInternal({ blockIndex, data, type, indices }: ListInternalProps) {
  const updateList = useEditorContext((state) => state.updateList);
  const addListItem = useEditorContext((state) => state.addListItem);
  const deleteListItem = useEditorContext((state) => state.deleteListIem);
  const indentList = useEditorContext((state) => state.indentList);
  const unindentList = useEditorContext((state) => state.unindentList);

  function onBlur(event: React.FocusEvent<Element>, indices: number[]) {
    updateList(blockIndex, indices, event.target.innerHTML);
  }

  // Calls to updateList are only temporary until I get focus refs working with lists
  // Might be a while for that though so they stay for now
  function onKeyDown(event: React.KeyboardEvent, indices: number[]) {
    const { shiftKey, key, currentTarget } = event;
    switch (key) {
      case ListHotkeys.Enter: {
        event.preventDefault();
        updateList(blockIndex, indices, currentTarget.innerHTML);
        addListItem(blockIndex, indices);
        break;
      }
      case ListHotkeys.Backspace: {
        if (currentTarget.innerHTML === "") deleteListItem(blockIndex, indices);
        break;
      }
      case ListHotkeys.Tab: {
        event.preventDefault();
        updateList(blockIndex, indices, currentTarget.innerHTML);

        if (shiftKey) {
          unindentList(blockIndex, indices);
        } else {
          indentList(blockIndex, indices);
        }
        break;
      }
      default:
        break;
    }
  }

  return React.createElement(
    type === "ordered" ? "ol" : "ul",
    {},
    data.map((item, listIndex) => (
      <li style={{ width: "100%" }} key={crypto.randomUUID()}>
        <span
          style={{ width: "100%" }}
          onBlur={(event) => onBlur(event, indices.concat(listIndex))}
          onKeyDown={(event) => onKeyDown(event, indices.concat(listIndex))}
          contentEditable
          dangerouslySetInnerHTML={{ __html: item.value }}
        />
        {item.children && (
          <ListInternal
            data={item.children}
            type={type}
            key={crypto.randomUUID()}
            blockIndex={blockIndex}
            indices={indices.concat(listIndex)}
          />
        )}
      </li>
    ))
  );
}

export function BlockList({ index, block }: ListBlockProps) {
  const b = block.data as ListData;

  return (
    <ListInternal data={b.data} type={b.type} indices={[]} blockIndex={index} />
  );
}
