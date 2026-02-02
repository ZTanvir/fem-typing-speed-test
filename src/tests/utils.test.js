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

describe("countCorrectIncorrectKeyPressed helper function", () => {
  it("Return [0,0] for empty array", () => {
    expect(helperFunction.countCorrectIncorrectKeyPressed([], [])).toEqual([
      0, 0,
    ]);
  });

  it("Return [2,0] for [a,b] [a,b]", () => {
    expect(
      helperFunction.countCorrectIncorrectKeyPressed(["a", "b"], ["a", "b"]),
    ).toEqual([2, 0]);
  });

  it("Return [0,2] for [x,y] [a,b]", () => {
    expect(
      helperFunction.countCorrectIncorrectKeyPressed(["x", "y"], ["a", "b"]),
    ).toEqual([0, 2]);
  });

  it("Return [1,1] for [x,y] [x,b]", () => {
    expect(
      helperFunction.countCorrectIncorrectKeyPressed(["x", "y"], ["x", "b"]),
    ).toEqual([1, 1]);
  });
});
