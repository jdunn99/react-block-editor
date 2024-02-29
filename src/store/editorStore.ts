import { create } from "zustand";

type BlockType = "text" | "image" | "list";
type BlockData = TextData | HeadingData;

interface Block {
  id: number;
  type: BlockType;
  data: BlockData;
}

type EditorMode = "edit" | "view";

type TextData = {
  text: string;
};

type HeadingData = {
  text: string;
  level: number;
};

interface BlockSlice {
  addBlock(block: Block): void;
  getBlocks(): Block[];
  deleteBlock(index: number): void;
  getBlockById(id: string): Block;
  getBlockByIndex(index: number): Block;
}

interface TextSlice {
  updateTextBlock(index: number, data: TextData): void;
  updateHeadingBlock(index: number, data: HeadingData): void;
}

interface EditorSlice {
  blocks: Block[];
  index: number;
  mode: EditorMode;
}

export type Editor = BlockSlice & EditorSlice & TextSlice;

export const useEditorStore = create<Editor>();
