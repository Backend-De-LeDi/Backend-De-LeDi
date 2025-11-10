export interface Memory {
  idSession: string;
  messages: {
    type: "human" | "ai";
    content: string;
  }[];
}
