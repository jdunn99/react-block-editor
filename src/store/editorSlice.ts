import { StateCreator } from "zustand";
import { Block } from "./blockSlice";
import { Editor } from "./editorStore";

export type EditorMode = "edit" | "view";

export interface EditorSlice {
  blocks: Block[];
  index: number;
  mode: EditorMode;
}

export const createEditorSlice: StateCreator<
  Editor,
  [],
  [],
  EditorSlice
> = () => ({
  blocks: [],
  index: 0,
  mode: "edit",
});
