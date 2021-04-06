const { Position } = require("./position");

describe("A Position", () => {
  test("should be created", () => {
    const position = Position.create(1, 2);

    expect(position.x).toBe(1);
    expect(position.y).toBe(2);
  });

  test("should be created with position inside boundaries", () => {
    const position = Position.create(-1, 8);

    expect(position.x).toBe(0);
    expect(position.y).toBe(5);
  });

  test("moveX should change x position", () => {
    const position = Position.create(1, 2).moveX(1);

    expect(position.x).toBe(2);
    expect(position.y).toBe(2);
  });

  test("moveX should not change x position when it is on the edge", () => {
    const position = Position.create(5, 1).moveX(1);

    expect(position.x).toBe(5);
    expect(position.y).toBe(1);
  });

  test("moveY should change y position", () => {
    const position = Position.create(1, 2).moveY(1);

    expect(position.x).toBe(1);
    expect(position.y).toBe(3);
  });

  test("moveY should not change y position when it is on the edge", () => {
    const position = Position.create(1, 0).moveY(-1);

    expect(position.x).toBe(1);
    expect(position.y).toBe(0);
  });

  test("should serialize data to json", () => {
    const position = Position.create(1, 0).moveY(-1);
    const data = position.toJson();
    const expected = {
      x: 1,
      y: 0,
    };

    expect(data).toStrictEqual(expected);
  });
});
