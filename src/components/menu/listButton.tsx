import { useEditorContext } from "@/lib/useEditorContext";
import { BlockMenuProps } from "../blockMenu";

export function AddListButton({ index }: BlockMenuProps) {
  const addListBlock = useEditorContext((state) => state.addListBlock);

  return (
    <li
      onClick={() =>
        addListBlock(index, {
          type: "unordered",
          data: [{ value: "Hi" }],
        })
      }
    >
      List
    </li>
  );
}
