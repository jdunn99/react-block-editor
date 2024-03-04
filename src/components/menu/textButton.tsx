import { useEditorContext } from "@/lib/useEditorContext";
import { BlockMenuProps } from "../blockMenu";

export function AddTextButton({ index }: BlockMenuProps) {
  const addTextBlock = useEditorContext((state) => state.addTextBlock);

  return <li onClick={() => addTextBlock(index, { text: "" })}>Text</li>;
}
