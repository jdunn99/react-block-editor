import { StateCreator } from "zustand";
import { Editor } from "./editorStore";
import { Block, addBlock } from "./blockSlice";

export type ListType = "ordered" | "unordered";
export type ListInternalData = {
  value: string;
  children?: ListInternalData[];
};
export type ListData = {
  type: ListType;
  data: ListInternalData[];
};

// Traverses through array of indices to find the requested list item
function getListItem(
  block: Block,
  indices: number[]
): ListInternalData | undefined {
  let arr = (block.data as ListData).data;
  for (let i = 0; i < indices.length - 1; i++) {
    arr = arr[indices[i]]!.children!;
  }

  return arr[indices[indices.length - 1]];
}

export interface ListSlice {
  addListBlock(index: number, data: ListData): void;
  updateListItem(blockIndex: number, listItemIndex: number, data: string): void;
  addListItem(index: number, indices: number[]): void;
  deleteListIem(index: number, indices: number[]): void;
  updateList(index: number, indices: number[], data: string): void;
}

export const createListSlice: StateCreator<Editor, [], [], ListSlice> = (
  set
) => ({
  addListBlock: (index, data) =>
    set((state) => addBlock(state, data, index, "list")),
  updateListItem(blockIndex, listItemIndex, data) {
    return set((state) => {
      const blocks = [...state.blocks];
      const list = blocks[blockIndex];
      (list.data as ListData).data[listItemIndex].value = data;

      return {
        blocks,
      };
    });
  },
  updateList(index, indices, data) {
    return set((state) => {
      const blocks = [...state.blocks];
      const block = blocks[index];

      const item = getListItem(block, indices);
      item!.value = data;

      return {
        blocks,
      };
    });
  },
  addListItem(index, indices) {
    return set((state) => {
      const blocks = [...state.blocks];
      const block = blocks[index];

      const insertionIndex = indices.pop() || 0;
      const item = getListItem(block, indices);

      if (typeof item === "undefined") {
        (block.data as ListData).data.splice(insertionIndex + 1, 0, {
          value: "",
        });
      } else {
        item.children?.splice(insertionIndex + 1, 0, {
          value: "",
        });
      }

      return {
        blocks,
      };
    });
  },
  deleteListIem(index, indices) {
    return set((state) => {
      const blocks = [...state.blocks];
      const block = blocks[index];
      const b = block.data as ListData;

      const elementToBeDeleted = getListItem(block, indices);

      if (!elementToBeDeleted) {
        return state;
      }

      const { children } = elementToBeDeleted;
      const elementToBeDeletedIndex = indices.pop() || 0;
      const parentElement = getListItem(block, indices);

      if (parentElement) {
        if (children && parentElement.children) {
          parentElement.children.splice(
            elementToBeDeletedIndex,
            1,
            ...children
          );
        }
      } else {
        if (elementToBeDeletedIndex === 0 && b.data.length === 1) {
          return {
            blocks: blocks.filter((_, idx) => idx !== index),
            index: Math.max(0, index - 1),
          };
        } else {
          b.data.splice(elementToBeDeletedIndex, 1);
        }
      }

      return {
        blocks,
      };
    });
  },
});
