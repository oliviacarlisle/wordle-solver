import { wordCounts } from '../assets/wordCounts';

function sigmoidWordScorer(
  wordCounts: [string, number][],
  steepness: number,
  midpoint: number,
): Map<string, number> {
  // Find the maximum count for normalization
  const maxCount = wordCounts.reduce((max, [, count]) => Math.max(count, max), -Infinity);

  // Calculate sigmoid for a normalized value
  const sigmoid = (x: number): number => 1 / (1 + Math.exp(-x));

  // Process each word and store the result in a Map
  const scoredWords = new Map<string, number>();

  for (const [word, count] of wordCounts) {
    // Normalize the count and apply sigmoid
    const normalizedCount = Math.log2(count) / Math.log2(maxCount);
    const score = sigmoid(steepness * (normalizedCount - midpoint)); // Adjust the range for better distribution
    scoredWords.set(word, score);
  }

  return scoredWords;
}

export const wordScores = sigmoidWordScorer(wordCounts, 20, 0.6);
// console.log(scoredWords.size);

// const scores = Array.from(scoredWords.values());
// console.log(scores.length);

// console.log(`Words scored > 0.9: ${scores.filter((s) => s > 0.9).length}`);
// console.log(
//   `Words scored 0.5-0.9: ${scores.filter((s) => s >= 0.5 && s <= 0.9).length}`,
// );
// console.log(
//   `Words scored 0.1-0.5: ${scores.filter((s) => s >= 0.1 && s < 0.5).length}`,
// );
// console.log(`Words scored < 0.1: ${scores.filter((s) => s < 0.1).length}`);
// console.log(`Average score: ${scores.reduce((a, b) => a + b) / scores.length}`);
// console.log('---');

// // Example of how to use the scored words
// console.log(scoredWords.get('which')); // Output: 0.9999999999998232
// console.log(scoredWords.get('their')); // Output: 0.9999999999997028
// console.log(scoredWords.get('house'));
// console.log(scoredWords.get('stint')); // Output: 0.9999999999997028
// console.log(scoredWords.get('halve'));
// console.log(scoredWords.get('grant'));
// console.log(scoredWords.get('corer'));
// console.log(scoredWords.get('gamut'));
// console.log(scoredWords.get('prone'));
// console.log(scoredWords.get('stain'));
// console.log(scoredWords.get('bland'));
// console.log(scoredWords.get('audit'));
// console.log(scoredWords.get('macaw'));
// console.log(scoredWords.get('vibex')); // should be unlikely
// console.log(scoredWords.get('xylem')); // should be unlikely
