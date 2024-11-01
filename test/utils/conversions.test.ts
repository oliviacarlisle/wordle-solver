import {
  convertWordToNum,
  convertNumToWord,
  getChar,
  convertWordListToNumArray,
  convertNumArrayToStrings,
} from '../../src/utils/conversions';

describe('conversions', () => {
  it('should convert words to and from number representation', () => {
    expect(convertNumToWord(convertWordToNum('zebra'))).toBe('zebra');
    expect(convertNumToWord(convertWordToNum('hello'))).toBe('hello');
  });

  it('should retrieve characters by index', () => {
    const zebra = convertWordToNum('zebra');
    expect(getChar(zebra, 0)).toBe(25);
    expect(getChar(zebra, 5)).toBe(0);
  });

  it('should convert a word list to and from number format', () => {
    const initialArray = ['zebra', 'hello'];
    const wordList = convertWordListToNumArray(initialArray);
    expect(wordList[0]).toBe(convertWordToNum('zebra'));
    expect(wordList[1]).toBe(convertWordToNum('hello'));
    const strings = convertNumArrayToStrings(wordList);
    expect(strings).toEqual(initialArray);
  });
});
