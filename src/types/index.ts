// Define types
export type Feedback = Uint8Array;
export type GuessInfo = { word: string; feedback: number[] };
export type GuessWithFeedback = { word: string; feedback: Feedback }; // 1 for green, 2 for yellow, 0 for gray
