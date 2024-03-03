import "./App.css";
import { Editor } from "./components/editor";

function App() {
  return (
    <>
      <Editor
        blocks={[
          {
            data: { text: "This is a test", level: 1 },
            id: crypto.randomUUID(),
            type: "heading",
          },
        ]}
      />
    </>
  );
}

export default App;
