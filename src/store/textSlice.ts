import { StateCreator } from "zustand";
import { Editor } from "./editorStore";
import { addBlock, updateBlock } from "./blockSlice";

export type TextData = {
  text: string;
};

export interface TextSlice {
  updateTextBlock(index: number, data: TextData): void;
  addTextBlock(index: number, data: TextData): void;
}

export const createTextSlice: StateCreator<Editor, [], [], TextSlice> = (
  set
) => ({
  addTextBlock: (index, data) =>
    set((state) => addBlock(state, data, index, "text")),

  updateTextBlock: (index, data) =>
    set((state) => updateBlock(state, data, index, "text")),
});
