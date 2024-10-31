/**
 * Utility functions to convert words to a number representation for faster processing
 */

// Constants for the conversion process
const WORD_LENGTH = 5;
const BITS_PER_LETTER = 5;
const LETTER_MASK = 0x1f; // Binary: 11111
const BASE_CHAR_CODE = 97; // 'a'.charCodeAt(0), hardcoded for performance

/**
 * Converts a 5-letter word to a number using optimized bitwise operations
 */
function convertWordToNum(word: string): number {
  let num = 0;

  for (let i = 0; i < WORD_LENGTH; i++) {
    const letterCode = word.charCodeAt(i) - BASE_CHAR_CODE;
    num |= letterCode << (i * BITS_PER_LETTER);
  }

  return num;
}

/**
 * Converts a number back to a 5-letter word using optimized string building
 */
function convertNumToWord(num: number): string {
  // Preallocate array for better performance than string concatenation
  const chars: string[] = new Array(WORD_LENGTH);

  for (let i = 0; i < WORD_LENGTH; i++) {
    chars[i] = String.fromCharCode(
      ((num >> (i * BITS_PER_LETTER)) & LETTER_MASK) + BASE_CHAR_CODE,
    );
  }

  return chars.join('');
}

/**
 * Get a character in number format by index
 * @param word
 * @param i
 * @returns
 */
function getChar(word: number, i: number): number {
  return (word >> (i * BITS_PER_LETTER)) & LETTER_MASK;
}

/**
 * Convert a list of words in string[] format to optimized Uint32Array format
 * @param words
 * @returns
 */
function convertWordListToNumArray(words: string[]): Uint32Array {
  const len = words.length;
  const output = new Uint32Array(len);

  for (let i = 0; i < len; i++) {
    output[i] = convertWordToNum(words[i]);
  }

  return output;
}

/**
 * Convert a list of words in optimized Uint32Array format to string[] format
 * @param words
 * @returns
 */
function convertNumArrayToStrings(words: Uint32Array): string[] {
  const output: string[] = [];

  for (let i = 0; i < words.length; i++) {
    output.push(convertNumToWord(words[i]));
  }

  return output;
}

export {
  convertWordToNum,
  convertNumToWord,
  getChar,
  convertWordListToNumArray,
  convertNumArrayToStrings,
};
