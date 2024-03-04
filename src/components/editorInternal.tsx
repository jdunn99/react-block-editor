import { useEditorContext } from "../lib/useEditorContext";
import { EditorBlocks } from "./editorBlocks";

export function EditorInternal() {
  const blocks = useEditorContext((state) => state.blocks);
  const addText = useEditorContext((state) => state.addTextBlock);
  const changeIndex = useEditorContext((state) => state.changeIndex);
  const editorIndex = useEditorContext((state) => state.index);

  return (
    <div>
      <button
        onClick={() =>
          addText(0, {
            text: "Test Block <b>Test</b>",
          })
        }
      >
        Add block
      </button>
      {blocks.map((block, index) => (
        <div key={block.id} onFocus={() => changeIndex(index)}>
          <EditorBlocks
            block={block}
            index={index}
            isLatest={index === editorIndex + 1}
          />
        </div>
      ))}
    </div>
  );
}
