import { useStore } from "zustand";
import { EditorContext } from "./editorContext";
import React from "react";
import { Editor } from "../store/editorStore";

export function useEditorContext<T>(selector: (state: Editor) => T): T {
  const store = React.useContext(EditorContext);

  if (!store) {
    throw new Error("EditorContent.Provider is not found in the tree");
  }

  return useStore(store, selector);
}
