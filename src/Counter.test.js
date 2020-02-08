import React from "react";
import Counter from "./Counter";

describe("Counter", () => {
  describe("increment()", () => {
    test("increment", () => {
      const counter = new Counter(1);
      counter.increment();
      expect(counter.count).toBe(2);
    });
  });
});
