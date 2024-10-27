// Define types
export type Feedback = ('g' | 'y' | 'x')[]; // 'g' for green, 'y' for yellow, 'x' for gray
export type GuessWithFeedback = { word: string; feedback: Feedback };
