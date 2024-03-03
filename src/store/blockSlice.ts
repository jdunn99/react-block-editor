import { StateCreator } from "zustand";
import { HeadingData } from "./headingSlice";
import { TextData } from "./textSlice";
import { Editor } from "./editorStore";

export type BlockType = "text" | "heading" | "image" | "list";
export type BlockData = TextData | HeadingData;

export interface Block {
  id: string;
  type: BlockType;
  data: BlockData;
}

export interface BlockSlice {
  // changeBlockTag(): void
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

export function updateBlock<T>(
  state: Editor,
  data: T,
  index: number,
  type: BlockType
) {
  if (index < 0 || index > state.blocks.length - 1) {
    throw new Error("Invalid index range");
  }

  const blocks = [...state.blocks];
  const block = blocks[index];

  if (block.type !== type) {
    throw new Error("Mismatched block type");
  }

  block.data = data as BlockData;

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
