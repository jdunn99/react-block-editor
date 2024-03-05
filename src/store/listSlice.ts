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

function getParentAndChild(block: Block, indices: number[]) {
  const child = getListItem(block, indices);
  const childIndex = indices.pop() || 0;
  const parent = getListItem(block, indices);

  return {
    child,
    childIndex,
    parent,
  };
}

export interface ListSlice {
  addListBlock(index: number, data: ListData): void;
  updateListItem(blockIndex: number, listItemIndex: number, data: string): void;
  addListItem(index: number, indices: number[]): void;
  deleteListIem(index: number, indices: number[]): void;
  updateList(index: number, indices: number[], data: string): void;
  indentList(index: number, indices: number[]): void;
  unindentList(index: number, indices: number[]): void;
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

      const { child, parent, childIndex } = getParentAndChild(block, indices);

      if (!child) {
        return state;
      }

      const { children } = child;

      if (parent) {
        if (children && parent.children) {
          parent.children.splice(childIndex, 1, ...children);
        } else {
          parent.children?.splice(childIndex, 1);
        }
      } else {
        if (childIndex === 0 && b.data.length === 1) {
          return {
            blocks: blocks.filter((_, idx) => idx !== index),
            index: Math.max(0, index - 1),
          };
        } else {
          b.data.splice(childIndex, 1);
        }
      }

      return {
        blocks,
      };
    });
  },
  indentList(index, indices) {
    return set((state) => {
      const blocks = [...state.blocks];
      const block = blocks[index];
      const b = block.data as ListData;

      const { child, parent, childIndex } = getParentAndChild(block, indices);
      if (!child) {
        return state;
      }

      if (childIndex !== 0) {
        const sibling = !parent
          ? b.data[childIndex - 1]
          : parent.children![childIndex - 1];

        if (sibling.children) {
          sibling.children.push(child);
        } else {
          sibling.children = [child];
        }

        if (!parent) {
          b.data.splice(childIndex, 1);
        } else {
          parent.children!.splice(childIndex, 1);
        }
      }

      return {
        blocks,
      };
    });
  },
  unindentList(index, indices) {
    return set((state) => {
      const blocks = [...state.blocks];
      const block = blocks[index];
      const b = block.data as ListData;

      // find grandfather node. find all sibling nodes. swap and delete.

      const { child, parent, childIndex } = getParentAndChild(block, indices);
      if (!child) {
        return state;
      }

      const { childIndex: parentIndex, parent: grandfather } =
        getParentAndChild(block, indices);

      if (!child || !parent) {
        return state;
      }

      const siblings = parent.children!.slice(childIndex);

      if (!grandfather) {
        b.data.splice(parentIndex + 1, 0, ...siblings);
        parent.children = parent.children?.slice(0, childIndex);
      } else {
        grandfather.children?.splice(parentIndex + 1, 0, ...siblings);
        parent.children = parent.children?.slice(0, childIndex);
      }

      return {
        blocks,
      };
    });
  },
});
