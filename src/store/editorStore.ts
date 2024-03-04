import { createStore } from "zustand";
import { BlockSlice, createBlockSlice } from "./blockSlice";
import { TextSlice, createTextSlice } from "./textSlice";
import { HeadingSlice, createHeadingSlice } from "./headingSlice";
import { EditorSlice, createEditorSlice } from "./editorSlice";
import { ListSlice, createListSlice } from "./listSlice";

export type Editor = BlockSlice &
  EditorSlice &
  TextSlice &
  HeadingSlice &
  ListSlice;

export const createEditorStore = (initProps?: Partial<EditorSlice>) => {
  const DEFAULT_PROPS: Omit<EditorSlice, "changeIndex"> = {
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
    ...createEditorSlice(...a),
    ...DEFAULT_PROPS,
    ...initProps,
    ...createBlockSlice(...a),
    ...createHeadingSlice(...a),
    ...createTextSlice(...a),
    ...createListSlice(...a),
  }));
};

export type EditorStore = ReturnType<typeof createEditorStore>;
