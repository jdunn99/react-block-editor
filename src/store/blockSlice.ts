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
  getBlocks(): Block[];
  deleteBlock(index: number): void;
  getBlockById(id: string): Block | undefined;
  getBlockByIndex(index: number): Block | undefined;
  changeBlockOrder(oldIndex: number, newIndex: number): void;
  size(): number;
  changeBlockType(index: number, newType: BlockType): void;
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
  size() {
    return get().blocks.length;
  },
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
    return get().blocks[index];
  },
  getBlocks() {
    return get().blocks;
  },
  changeBlockOrder(oldIndex, newIndex) {
    return set((state) => {
      const blocks = [...state.blocks];
      const temp = blocks[oldIndex];
      blocks[oldIndex] = blocks[newIndex];
      blocks[newIndex] = temp;

      return {
        blocks,
        index: newIndex,
      };
    });
  },
  changeBlockType(index, newType) {
    return set((state) => {
      const blocks = [...state.blocks];
      const block = blocks[index];

      switch (newType) {
        case "heading": {
          if (block.type === "text") {
            block.type = "heading";
            (block.data as HeadingData).level = 1;
          }
          break;
        }
        case "text": {
          if (block.type === "heading") {
            block.type = "text";
            delete (block.data as Partial<HeadingData>).level; // do i even need to do this ? probably not
          }
          break;
        }
        default:
          break;
      }

      return {
        blocks,
      };
    });
  },
});
