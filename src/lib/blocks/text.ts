import { Block } from "../block";
import { ActionType } from "../editor";

export type TextBlockData = {
  text: string;
};

export interface AddTextBlock {
  type: ActionType.ADD_TEXT_BLOCK;
  payload: {
    index: number;
  };
}

export interface UpdateTextBlock {
  type: ActionType.UPDATE_TEXT_BLOCK;
  payload: {
    index: number;
    text: string;
  };
}

export class TextBlock extends Block<TextBlockData> {
  constructor(data: TextBlockData) {
    super("text", data);
  }

  updateText(newText: string) {
    this.data.text = newText;
  }
}
