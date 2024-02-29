import { Block } from "../block";
import { ActionType } from "../editor";

export type HeadingBlockData = {
  text: string;
  level: number;
};

export interface AddHeadingBlock {
  type: ActionType.ADD_HEADING_BLOCK;
  payload: {
    index: number;
    level: number;
  };
}

export interface UpdateHeadingBlock {
  type: ActionType.UPDATE_HEADING_BLOCK;
  payload: {
    index: number;
    text: string;
    level: number;
  };
}

export type HeadingActions = AddHeadingBlock | UpdateHeadingBlock;

export class HeadingBlock extends Block<HeadingBlockData> {
  constructor(data: HeadingBlockData) {
    super("text", data);
  }

  updateText(newText: string) {
    this.data.text = newText;
  }

  changeLevel(newLevel: number) {
    this.data.level = newLevel;
  }
}
