import { HeadingActions, HeadingBlock } from "./blocks/heading";
import { AddTextBlock, TextBlock, UpdateTextBlock } from "./blocks/text";

export enum ActionType {
  ADD_TEXT_BLOCK,
  UPDATE_TEXT_BLOCK,
  ADD_HEADING_BLOCK,
  UPDATE_HEADING_BLOCK,
  CLEAR_EDITOR,
}

interface ClearEditorAction {
  type: ActionType.CLEAR_EDITOR;
}

export type EditorAction =
  | AddTextBlock
  | ClearEditorAction
  | UpdateTextBlock
  | HeadingActions;

// export class Editor {
//   blocks: Block<never>[];
//   index: number;

//   constructor() {
//     this.index = 0;
//     this.blocks = [];
//   }

//   clear() {
//     this.blocks = [];
//   }

//   delete(index: number) {
//     if (index >= 0 && index < this.blocks.length) {
//       this.blocks.splice(index, 1);
//     }
//   }

//   move(currentIndex: number, newIndex: number) {
//     if (
//       currentIndex >= 0 &&
//       currentIndex < this.blocks.length &&
//       newIndex >= 0 &&
//       newIndex < this.blocks.length
//     ) {
//       const blockToMove = this.blocks[currentIndex];
//       this.blocks.splice(currentIndex, 1);
//       this.blocks.splice(newIndex, 0, blockToMove);
//     }
//   }

//   getBlocksCount(): number {
//     return this.blocks.length;
//   }

//   dumpState(): void {
//     console.log(JSON.stringify(this.blocks));
//   }

//   insert(newBlock: Block<any>) {
//     const currentIndex = this.index;
//     if (currentIndex >= 0) {
//       this.blocks.splice(currentIndex + 1, 0, newBlock);
//     } else {
//       this.blocks.push(newBlock);
//     }
//   }
// }
export interface Editor {
  index: number;
  blocks: EditorBlockType[];
}

export const INITIAL_EDITOR_STATE = {
  blocks: [
    new TextBlock({
      text: "",
    }),
  ],
  index: 0,
};

export type EditorBlockType = TextBlock | HeadingBlock;

type HandlerArgs = {
  editor: Editor;
  index: number;
};
type AddBlockArgs = {
  newBlock: EditorBlockType;
} & HandlerArgs;

export const EditorHandler = {
  addBlock({ editor, index, newBlock }: AddBlockArgs) {
    if (index >= 0) {
      editor.blocks.splice(index + 1, 0, newBlock);
    } else {
      editor.blocks.push(newBlock);
    }

    return {
      index: index + 1,
      blocks: editor.blocks,
    };
  },
};
