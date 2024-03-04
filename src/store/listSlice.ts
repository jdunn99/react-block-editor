import { StateCreator } from "zustand";
import { Editor } from "./editorStore";
import { addBlock } from "./blockSlice";

export type ListType = "ordered" | "unordered";
export type ListData = {
  type: ListType;
  data: string[] | ListData[];
};

export interface ListSlice {
  addListBlock(index: number, data: ListData): void;
  updateListItem(blockIndex: number, listItemIndex: number, data: string): void;
  addListItem(blockIndex: number, listItemIndex: number, data: string): void;
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
      (list.data as ListData).data[listItemIndex] = data;

      return {
        blocks,
      };
    });
  },
  addListItem(blockIndex, listItemIndex, data) {
    return set((state) => {
      const blocks = [...state.blocks];
      const list = blocks[blockIndex];
      (list.data as ListData).data.splice(listItemIndex + 1, 0, data);

      return {
        blocks,
      };
    });
  },
});
