import { Block, BlockData } from "../lib/block";
import { TextBlock } from "./text-block";

export interface EditorBlockProps<T extends BlockData> {
  block: Block<T>;
  index: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function EditorBlock<T extends BlockData>({
  block,
  index,
}: EditorBlockProps<T>) {
  switch (block.type) {
    case "text": {
      return <TextBlock block={block} index={index} />;
    }

    default: {
      return null;
    }
  }
}
