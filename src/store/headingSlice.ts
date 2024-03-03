import { StateCreator } from "zustand";
import { TextData } from "./textSlice";
import { Editor } from "./editorStore";

export type HeadingData = {
  level: number;
} & TextData;

export interface HeadingSlice {
  updateHeadingBlock(index: number, data: HeadingData): void;
  addHeadingBlock(index: number, data: HeadingData): void;
}

export const createHeadingSlice: StateCreator<Editor, [], [], HeadingSlice> = (
  set,
  get
) => ({
  addHeadingBlock(index, data) {
    return set((state) => ({
      blocks: state.blocks.splice(index + 1, 0, {
        id: crypto.randomUUID(),
        data,
        type: "text",
      }),
    }));
  },
  updateHeadingBlock(index, data) {
    const block = get().getBlockByIndex(index);
    if (!block || block.type !== "text") {
      return;
    }

    block.data = data;
  },
});
