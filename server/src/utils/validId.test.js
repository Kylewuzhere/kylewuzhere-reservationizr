const validId = require("./validId");

describe("validId", () => {
  test("should return true if id is valid", () => {
    const mongooseId = "616bd284bae351bc447ace5b";
    const received = validId(mongooseId);

    expect(received).toBe(true);
  });
  test("should return false if id is not valid", () => {
    const invalidId = "n00bh4cks";
    const received = validId(invalidId);

    expect(received).toBe(false);
  });
});
