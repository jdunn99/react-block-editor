import { create } from "zustand";
import { BlockSlice, createBlockSlice } from "./blockSlice";
import { TextSlice, createTextSlice } from "./textSlice";
import { HeadingSlice, createHeadingSlice } from "./headingSlice";
import { EditorSlice, createEditorSlice } from "./editorSlice";

export type Editor = BlockSlice & EditorSlice & TextSlice & HeadingSlice;

export const useEditorStore = create<Editor>()((...a) => ({
  ...createEditorSlice(...a),
  ...createBlockSlice(...a),
  ...createHeadingSlice(...a),
  ...createTextSlice(...a),
}));
