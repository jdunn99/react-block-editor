import { StateCreator } from "zustand";
import { TextData } from "./textSlice";
import { Editor } from "./editorStore";
import { addBlock, updateBlock } from "./blockSlice";

export type HeadingData = {
  level: number;
} & TextData;

export interface HeadingSlice {
  updateHeadingBlock(index: number, data: Partial<HeadingData>): void;
  addHeadingBlock(index: number, data: HeadingData): void;
  changeHeadingLevel(index: number, level: number): void;
}

export const createHeadingSlice: StateCreator<Editor, [], [], HeadingSlice> = (
  set
) => ({
  addHeadingBlock: (index, data) =>
    set((state) => addBlock(state, data, index, "heading")),

  updateHeadingBlock: (index, data) =>
    set((state) => updateBlock(state, data, index, "heading")),
  changeHeadingLevel: (index, level) =>
    set((state) => {
      const blocks = [...state.blocks];
      (blocks[index].data as HeadingData).level = level;
      return {
        blocks,
      };
    }),
});
