// Optimized O(n) Shuffle
const shuffle = <T>(array: T[]): T[] => {
  if (!array) return [];
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const countCorrectIncorrectKeyPressed = (
  items: string[] = [],
  compareItems: string[] = [],
) => {
  let correctKeyPressed = 0;
  let incorrectKeyPressed = 0;
  for (let index = 0; index < items.length - 1; index++) {
    if (items[index] === compareItems[index]) {
      correctKeyPressed += 1;
    } else {
      incorrectKeyPressed += 1;
    }
  }
  return [correctKeyPressed, incorrectKeyPressed];
};

export default { shuffle, countCorrectIncorrectKeyPressed };
