export type Score = {
  wpm: number;
  accuracy: number;
  characters: {
    correct: number;
    incorrect: number;
  };
};

export interface Option {
  value: string;
  text: string;
}
