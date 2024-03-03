import React from "react";
import { EditorStore } from "../store/editorStore";

export const EditorContext = React.createContext<EditorStore | null>(null);
