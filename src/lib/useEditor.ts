import React from "react";
import {
  ActionType,
  Editor,
  EditorAction,
  EditorHandler,
  INITIAL_EDITOR_STATE,
} from "./editor";
import { TextBlock } from "./blocks/text";
import { HeadingBlock } from "./blocks/heading";

export function editorReducer(editor: Editor, action: EditorAction) {
  switch (action.type) {
    case ActionType.ADD_TEXT_BLOCK: {
      return EditorHandler.addBlock({
        index: action.payload.index,
        editor,
        newBlock: new TextBlock({
          text: "",
        }),
      });
    }
    case ActionType.ADD_HEADING_BLOCK: {
      return EditorHandler.addBlock({
        index: action.payload.index,
        editor,
        newBlock: new HeadingBlock({
          level: action.payload.level,
          text: "",
        }),
      });
    }
    case ActionType.UPDATE_TEXT_BLOCK: {
      const block = editor.blocks[action.payload.index];
      if (block instanceof TextBlock) {
        block.updateText(action.payload.text);
      }

      return {
        ...editor,
      };
    }
    case ActionType.CLEAR_EDITOR: {
      return INITIAL_EDITOR_STATE;
    }
    default:
      return editor;
  }
}

export const EditorContext = React.createContext<
  | {
      editor: Editor;
      dispatch: React.Dispatch<EditorAction>;
    }
  | undefined
>(undefined);

export function useEditor() {
  const context = React.useContext(EditorContext);

  if (context === undefined) {
    throw new Error("Context must be called within a Provider");
  }

  const { dispatch, editor } = context;
  return { dispatch, editor };
}
