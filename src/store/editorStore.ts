import { createStore } from "zustand";
import { BlockSlice, createBlockSlice } from "./blockSlice";
import { TextSlice, createTextSlice } from "./textSlice";
import { HeadingSlice, createHeadingSlice } from "./headingSlice";
import { EditorSlice } from "./editorSlice";

export type Editor = BlockSlice & EditorSlice & TextSlice & HeadingSlice;

export const createEditorStore = (initProps?: Partial<EditorSlice>) => {
  const DEFAULT_PROPS: EditorSlice = {
    blocks: [
      {
        id: crypto.randomUUID(),
        type: "text",
        data: {
          text: "Test",
        },
      },
    ],
    index: 0,
    mode: "edit",
  };

  return createStore<Editor>()((...a) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    ...createBlockSlice(...a),
    ...createHeadingSlice(...a),
    ...createTextSlice(...a),
  }));
};

export type EditorStore = ReturnType<typeof createEditorStore>;
