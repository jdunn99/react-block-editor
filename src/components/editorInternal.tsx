import { HeadingData } from "../store/headingSlice";
import { BlockParagraph } from "./blockParagraph";
import { BlockHeading } from "./blockHeading";
import { useEditorContext } from "../lib/useEditorContext";

export function EditorInternal() {
  const blocks = useEditorContext((state) => state.blocks);
  const addText = useEditorContext((state) => state.addTextBlock);

  return (
    <div>
      <button
        onClick={() =>
          addText(0, {
            text: "Test Block",
          })
        }
      >
        Add block
      </button>
      {JSON.stringify(blocks)}
      {blocks.map(({ data, id, type }, index) =>
        type === "heading" ? (
          <BlockHeading
            index={index}
            level={(data as HeadingData).level}
            dangerouslySetInnerHTML={{ __html: data.text }}
          />
        ) : (
          <BlockParagraph
            index={index}
            key={id}
            dangerouslySetInnerHTML={{ __html: data.text }}
          />
        )
      )}
    </div>
  );
}
