import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Editor } from "./components/editor.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>
);
