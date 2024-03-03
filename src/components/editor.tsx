import React from "react";
import { EditorContext } from "../lib/editorContext";
import { createEditorStore } from "../store/editorStore";
import { EditorInternal } from "./editorInternal";
import { EditorSlice } from "../store/editorSlice";

export function Editor(props?: Partial<EditorSlice>) {
  const store = React.useRef(createEditorStore(props)).current;

  return (
    <EditorContext.Provider value={store}>
      <EditorInternal />
    </EditorContext.Provider>
  );
}
