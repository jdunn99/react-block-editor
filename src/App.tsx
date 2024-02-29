import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ActionType } from "./lib/editor";
import { EditorBlock } from "./components/block";
import { useEditor } from "./lib/useEditor";

function App() {
  const { dispatch, editor } = useEditor();

  return (
    <>
      <div>
        <button
          onClick={() =>
            dispatch({
              type: ActionType.ADD_HEADING_BLOCK,
              payload: { index: 0, level: 2 },
            })
          }
        >
          Test
        </button>
        {JSON.stringify(editor)}
        {editor.blocks.map((block, index) => (
          <EditorBlock block={block} index={index} />
          // <p
          //   key={block.id}
          //   onBlur={(e: React.FocusEvent<HTMLDivElement>) =>
          //     dispatch({
          //       type: ActionType.UPDATE_TEXT_BLOCK,
          //       payload: {
          //         index,
          //         text: e.target.innerHTML,
          //       },
          //     })
          //   }
          //   contentEditable
          //   dangerouslySetInnerHTML={{ __html: block.data.text }}
          // />
        ))}
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
