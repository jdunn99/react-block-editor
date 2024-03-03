import { StateCreator } from "zustand";
import { Editor } from "./editorStore";
import { addBlock } from "./blockSlice";

export type TextData = {
  text: string;
};

export interface TextSlice {
  updateTextBlock(index: number, data: TextData): void;
  addTextBlock(index: number, data: TextData): void;
}

export const createTextSlice: StateCreator<Editor, [], [], TextSlice> = (
  set,
  get
) => ({
  addTextBlock: (index, data) =>
    set((state) => addBlock(state, data, index, "text")),

  updateTextBlock(index, data) {
    const block = get().getBlockByIndex(index);
    if (!block || block.type !== "text") {
      return;
    }

    block.data = data;
  },
});
