import { wordList } from './assets/wordList';
import { getTopGuesses } from './utils/wordUtils';
import { wordScores } from './utils/wordScoreUtils';
import type { GuessInfo, GuessWithFeedback } from './types/index';

const LIMIT = 15;

const prevGuesses: GuessInfo[] = [
  // { word: 'audio', feedback: [0, 2, 0, 2, 0] },
  // { word: 'cents', feedback: [2, 0, 1, 2, 0] },
  // { word: 'muddy', feedback: [0, 0, 0, 1, 1] },
];

function parseGuesses(guessList: GuessInfo[]): GuessWithFeedback[] {
  const aLowerCode = 'a'.charCodeAt(0);
  const zLowerCode = 'z'.charCodeAt(0);
  const aUpperCode = 'A'.charCodeAt(0);
  const zUpperCode = 'Z'.charCodeAt(0);

  for (const guess of guessList) {
    const { word, feedback } = guess;

    // validate word
    // must be a string and have 5 characters
    if (typeof word !== 'string' || word.length !== 5) {
      throw new Error('Invalid word');
    }

    // each character must be a letter
    for (let i = 0; i < 5; i++) {
      const letterCode = word.charCodeAt(i);
      if (
        (letterCode < aLowerCode || letterCode > zLowerCode) &&
        (letterCode < aUpperCode || letterCode > zUpperCode)
      ) {
        throw new Error('Invalid word');
      }
    }

    // validate feedback array
    // must be an array of numbers
    if (!Array.isArray(feedback) || feedback.length !== 5) {
      throw new Error('Invalid guess array');
    }

    // each num must be 0, 1, or 2
    for (let i = 0; i < 5; i++) {
      if (
        typeof feedback[i] !== 'number' ||
        !(feedback[i] === 0 || feedback[i] === 1 || feedback[i] === 2)
      ) {
        throw new Error('Invalid guess array');
      }
    }
  }

  // parse/convert feedback data to Uint8Array
  return guessList.map(({ word, feedback }) => ({
    word: word.toLowerCase(),
    feedback: new Uint8Array(feedback),
  }));
}

try {
  const guessList: GuessWithFeedback[] = parseGuesses(prevGuesses);

  const start = performance.now();
  const topGuesses = getTopGuesses(wordList, wordScores, guessList, LIMIT);
  console.table(topGuesses);
  const end = performance.now();
  console.log(`getTopGuesses: ${end - start}`);
} catch (e) {
  console.error('Error parsing guess info', e);
}
