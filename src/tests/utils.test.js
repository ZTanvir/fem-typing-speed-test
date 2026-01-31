import { describe, expect, it } from "vitest";
import helperFunction from "../utils/helperFunctions";

describe("Shuffle helper function", () => {
  it("Return empty array when pass empty array as input", () => {
    const arr = [];
    expect(helperFunction.shuffle([])).toEqual([]);
  });

  it("Don't change the original array", () => {
    const arr = [1, 2, 3, 4, 5];
    const shuffleArr = helperFunction.shuffle(arr);
    expect(arr).toEqual(arr);
  });

  it("Shuffle [1,1,1] return [1,1,1]", () => {
    const arr = [1, 1, 1];
    expect(helperFunction.shuffle(arr)).toEqual([1, 1, 1]);
  });

  it("Return empty array when argument is not passed", () => {
    expect(helperFunction.shuffle()).toEqual([]);
  });
});
