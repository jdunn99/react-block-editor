import { StateCreator } from "zustand";
import { TextData } from "./textSlice";
import { Editor } from "./editorStore";
import { addBlock, updateBlock } from "./blockSlice";

export type HeadingData = {
  level: number;
} & TextData;

export interface HeadingSlice {
  updateHeadingBlock(index: number, data: HeadingData): void;
  addHeadingBlock(index: number, data: HeadingData): void;
}

export const createHeadingSlice: StateCreator<Editor, [], [], HeadingSlice> = (
  set
) => ({
  addHeadingBlock: (index, data) =>
    set((state) => addBlock(state, data, index, "heading")),

  updateHeadingBlock: (index, data) =>
    set((state) => updateBlock(state, data, index, "heading")),
});
