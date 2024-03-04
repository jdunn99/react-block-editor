import { StateCreator } from "zustand";
import { Block } from "./blockSlice";
import { Editor } from "./editorStore";

export type EditorMode = "edit" | "view";

export interface EditorSlice {
  blocks: Block[];
  index: number;
  mode: EditorMode;
  changeIndex(index: number): void;
}

export const createEditorSlice: StateCreator<Editor, [], [], EditorSlice> = (
  set
) => ({
  blocks: [],
  index: 0,
  mode: "edit",
  changeIndex(index) {
    set(() => ({ index }));
  },
});
