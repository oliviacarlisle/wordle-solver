import type { Feedback } from '../../src/types/index';
import { generateFeedback } from '../../src/utils/feedbackUtils';

describe('generateFeedback', () => {
  describe('Basic cases', () => {
    it('should return all green for correct guess', () => {
      const feedback: Feedback = ['g', 'g', 'g', 'g', 'g'];
      expect(generateFeedback('world', 'world')).toEqual(feedback);
    });

    it('should return all gray for completely wrong guess', () => {
      const feedback: Feedback = ['x', 'x', 'x', 'x', 'x'];
      expect(generateFeedback('world', 'fiefs')).toEqual(feedback);
    });

    it('should return yellow for letter contained in target', () => {
      const feedback: Feedback = ['x', 'x', 'y', 'x', 'x'];
      expect(generateFeedback('crown', 'hello')).toEqual(feedback);
    });
  });

  describe('Mixed feedback cases', () => {
    it('should handle mix of green, yellow, and gray', () => {
      const feedback: Feedback = ['g', 'g', 'g', 'x', 'y'];
      expect(generateFeedback('world', 'words')).toEqual(feedback);
    });
  });

  describe('Repeated letters in guess', () => {
    it('should generate correct feedback for "hello" and "world"', () => {
      const feedback: Feedback = ['x', 'x', 'x', 'g', 'y'];
      expect(generateFeedback('hello', 'world')).toEqual(feedback);
    });
  });

  describe('Repeated letters in target', () => {
    it('should generate correct feedback for "world" and "hello"', () => {
      const feedback: Feedback = ['x', 'y', 'x', 'g', 'x'];
      expect(generateFeedback('world', 'hello')).toEqual(feedback);
    });
  });

  describe('Repeated letters in both guess and target', () => {
    it('should generate correct feedback for "fiefs" and "fully"', () => {
      const feedback: Feedback = ['g', 'x', 'x', 'x', 'x'];
      expect(generateFeedback('fiefs', 'fully')).toEqual(feedback);
    });

    it('should generate correct feedback for "fluff" and "fully"', () => {
      const feedback: Feedback = ['g', 'y', 'y', 'x', 'x'];
      expect(generateFeedback('fluff', 'fully')).toEqual(feedback);
    });

    it('should generate correct feedback for "halal" and "fully"', () => {
      const feedback: Feedback = ['x', 'x', 'g', 'x', 'y'];
      expect(generateFeedback('halal', 'fully')).toEqual(feedback);
    });

    it('should generate correct feedback for "spill" and "fully"', () => {
      const feedback: Feedback = ['x', 'x', 'x', 'g', 'y'];
      expect(generateFeedback('spill', 'fully')).toEqual(feedback);
    });

    it('should generate correct feedback for "ladle" and "fully"', () => {
      const feedback: Feedback = ['y', 'x', 'x', 'g', 'x'];
      expect(generateFeedback('ladle', 'fully')).toEqual(feedback);
    });

    it('should generate correct feedback for "yawny" and "fully"', () => {
      const feedback: Feedback = ['x', 'x', 'x', 'x', 'g'];
      expect(generateFeedback('yawny', 'fully')).toEqual(feedback);
    });

    it('should generate correct feedback for "yoyos" and "fully"', () => {
      const feedback: Feedback = ['y', 'x', 'x', 'x', 'x'];
      expect(generateFeedback('yoyos', 'fully')).toEqual(feedback);
    });
  });

  describe('Repeated letters (additional tests)', () => {
    it('should generate correct feedback for "speed" and "abide"', () => {
      const feedback: Feedback = ['x', 'x', 'y', 'x', 'y'];
      expect(generateFeedback('speed', 'abide')).toEqual(feedback);
    });

    it('should generate correct feedback for "speed" and "erase"', () => {
      const feedback: Feedback = ['y', 'x', 'y', 'y', 'x'];
      expect(generateFeedback('speed', 'erase')).toEqual(feedback);
    });

    it('should generate correct feedback for "speed" and "steal"', () => {
      const feedback: Feedback = ['g', 'x', 'g', 'x', 'x'];
      expect(generateFeedback('speed', 'steal')).toEqual(feedback);
    });

    it('should generate correct feedback for "speed" and "crepe"', () => {
      const feedback: Feedback = ['x', 'y', 'g', 'y', 'x'];
      expect(generateFeedback('speed', 'crepe')).toEqual(feedback);
    });
  });
});
