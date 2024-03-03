import { StateCreator } from "zustand";
import { HeadingData } from "./headingSlice";
import { TextData } from "./textSlice";
import { Editor } from "./editorStore";

export type BlockType = "text" | "image" | "list";
export type BlockData = TextData | HeadingData;

export interface Block {
  id: string;
  type: BlockType;
  data: BlockData;
}

export interface BlockSlice {
  getBlocks(): Block[];
  deleteBlock(index: number): void;
  getBlockById(id: string): Block | undefined;
  getBlockByIndex(index: number): Block | undefined;
}

export function addBlock<T>(
  state: Editor,
  data: T,
  index: number,
  type: BlockType
) {
  const blocks = [...state.blocks];
  blocks.splice(index + 1, 0, {
    id: crypto.randomUUID(),
    data: data as BlockData,
    type,
  });

  return {
    blocks,
  };
}

export const createBlockSlice: StateCreator<Editor, [], [], BlockSlice> = (
  set,
  get
) => ({
  deleteBlock(index) {
    return set((state) => ({
      blocks: state.blocks.filter((_, idx) => index !== idx),
      index: Math.max(0, index - 1),
    }));
  },
  getBlockById(id) {
    return get().blocks.find((block) => block.id === id);
  },
  getBlockByIndex(index) {
    if (index > get().blocks.length - 1) return get().blocks[index];
  },
  getBlocks() {
    return get().blocks;
  },
});
