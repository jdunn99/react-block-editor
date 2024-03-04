import { useEditorContext } from "../lib/useEditorContext";
import { EditorBlocks } from "./editorBlocks";
import { InsertMenu } from "./insertMenu";
import { EditMenu } from "./editMenu";

export function EditorInternal() {
  const blocks = useEditorContext((state) => state.blocks);
  const changeIndex = useEditorContext((state) => state.changeIndex);
  const editorIndex = useEditorContext((state) => state.index);

  return (
    <div>
      {JSON.stringify(blocks)}
      {blocks.map((block, index) => (
        <div
          key={block.id}
          onMouseEnter={() => changeIndex(index)}
          onFocus={() => changeIndex(index)}
          className="editor-block"
        >
          {editorIndex === index ? (
            <div className="editor-block-buttons">
              <InsertMenu index={index} />
              <EditMenu index={index} type={block.type} />
            </div>
          ) : (
            <div className="editor-block-buttons" />
          )}
          <div className="editor-block-content">
            <EditorBlocks
              block={block}
              index={index}
              isLatest={index === editorIndex + 1}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
