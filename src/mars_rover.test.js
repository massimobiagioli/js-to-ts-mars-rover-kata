const { MarsRover, Orientations } = require("./mars_rover");

describe("A MarsRover", () => {
  test("should be created", () => {
    const uuid = "a87e3114-6045-43a7-847e-e1cb66a31aff";
    const marsRover = MarsRover.create(uuid, "Frank", 1, 2, Orientations.NORTH);

    expect(marsRover.id).toBe(uuid);
    expect(marsRover.name).toBe("Frank");
    expect(marsRover.position.x).toBe(1);
    expect(marsRover.position.y).toBe(2);
    expect(marsRover.orientation).toBe(Orientations.NORTH);
  });

  test("turn right should change orientation", () => {
    const uuid = "a87e3114-6045-43a7-847e-e1cb66a31aff";
    const marsRover = MarsRover.create(
      uuid,
      "Frank",
      1,
      2,
      Orientations.NORTH
    ).turnRight();

    expect(marsRover.orientation).toBe(Orientations.EAST);
  });

  test("turn left should change orientation", () => {
    const uuid = "a87e3114-6045-43a7-847e-e1cb66a31aff";
    const marsRover = MarsRover.create(
      uuid,
      "Frank",
      1,
      2,
      Orientations.NORTH
    ).turnLeft();

    expect(marsRover.orientation).toBe(Orientations.WEST);
  });

  test("move up should change position when it is inside boundaries", () => {
    const uuid = "a87e3114-6045-43a7-847e-e1cb66a31aff";
    const marsRover = MarsRover.create(
      uuid,
      "Frank",
      1,
      2,
      Orientations.NORTH
    ).moveUp();

    expect(marsRover.position.x).toBe(1);
    expect(marsRover.position.y).toBe(3);
  });

  test("move up should not change position when it is on the edge", () => {
    const uuid = "a87e3114-6045-43a7-847e-e1cb66a31aff";
    const marsRover = MarsRover.create(
      uuid,
      "Frank",
      1,
      5,
      Orientations.NORTH
    ).moveUp();

    expect(marsRover.position.x).toBe(1);
    expect(marsRover.position.y).toBe(5);
  });

  test("move down should change position when it is inside boundaries", () => {
    const uuid = "a87e3114-6045-43a7-847e-e1cb66a31aff";
    const marsRover = MarsRover.create(
      uuid,
      "Frank",
      4,
      1,
      Orientations.EAST
    ).moveDown();

    expect(marsRover.position.x).toBe(3);
    expect(marsRover.position.y).toBe(1);
  });

  test("move down should not change position when it is on the edge", () => {
    const uuid = "a87e3114-6045-43a7-847e-e1cb66a31aff";
    const marsRover = MarsRover.create(
      uuid,
      "Frank",
      0,
      1,
      Orientations.EAST
    ).moveDown();

    expect(marsRover.position.x).toBe(0);
    expect(marsRover.position.y).toBe(1);
  });

  test("should serialize data to json", () => {
    const uuid = "a87e3114-6045-43a7-847e-e1cb66a31aff";
    const marsRover = MarsRover.create(
      uuid,
      "Frank",
      4,
      1,
      Orientations.EAST
    ).moveDown();
    const data = marsRover.toJson();
    const expected = {
      id: "a87e3114-6045-43a7-847e-e1cb66a31aff",
      name: "Frank",
      orientation: "east",
      position: {
        x: 3,
        y: 1,
      },
    };

    expect(data).toStrictEqual(expected);
  });
});
