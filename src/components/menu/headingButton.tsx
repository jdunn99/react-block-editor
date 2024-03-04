import { useEditorContext } from "@/lib/useEditorContext";
import { BlockMenuProps } from "../blockMenu";

const LEVELS = [1, 2, 3, 4, 5];

export function AddHeadingButton({ index }: BlockMenuProps) {
  const addHeadingBlock = useEditorContext((state) => state.addHeadingBlock);

  return (
    <li
      onClick={() =>
        addHeadingBlock(index, { level: 1, text: Math.random().toString() })
      }
    >
      Heading
    </li>
  );
}

export function UpdateHeadingButtons({ index }: BlockMenuProps) {
  const changeHeadingLevel = useEditorContext(
    (state) => state.changeHeadingLevel
  );

  return LEVELS.map((level) => (
    <li key={level} onClick={() => changeHeadingLevel(index, level)}>
      Heading {level}
    </li>
  ));
}
