export interface BlockData {
  [key: string]: unknown; // You can define specific properties here if needed
}

type BlockType = "text" | "heading";

export class Block<T extends BlockData> {
  id: string;
  type: BlockType;
  data: T;

  constructor(type: BlockType, data: T) {
    this.id = crypto.randomUUID();
    this.type = type;
    this.data = data;
  }
}
