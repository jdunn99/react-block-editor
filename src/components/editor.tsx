import React from "react";
import { INITIAL_EDITOR_STATE } from "../lib/editor";
import { EditorContext, editorReducer } from "../lib/useEditor";
import App from "../App";

export function Editor() {
  const [editor, dispatch] = React.useReducer(
    editorReducer,
    INITIAL_EDITOR_STATE
  );

  return (
    <EditorContext.Provider value={{ editor, dispatch }}>
      <App />
    </EditorContext.Provider>
  );
}
