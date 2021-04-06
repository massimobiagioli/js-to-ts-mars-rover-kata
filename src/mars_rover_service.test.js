const { MarsRoverDto, Orientations, MarsRover } = require("./mars_rover");
const { MarsRoverRepository } = require("./mars_rover_repository");
jest.mock("./mars_rover_repository");
const { MarsRoverService } = require("./mars_rover_service");

describe("A MarsRover Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new MarsRover instance", async () => {
    const marsRoverRepository = new MarsRoverRepository();
    const marsRoverService = new MarsRoverService(marsRoverRepository);
    const marsRoverDto = new MarsRoverDto("Frank", 1, 2, Orientations.NORTH);

    const id = await marsRoverService.create(marsRoverDto);

    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });

  test("should delete a MarsRover instance that exists", async () => {
    const marsRoverRepository = new MarsRoverRepository();
    const marsRoverService = new MarsRoverService(marsRoverRepository);
    const id = "0834cddc-177d-4925-8e8c-3537faead897";

    await marsRoverService.deleteById(id);
  });

  test("should throws error when delete a MarsRover instance that not exists", async () => {
    const marsRoverRepository = new MarsRoverRepository();
    const marsRoverService = new MarsRoverService(marsRoverRepository);
    const id = "bad-uuid";

    await expect(marsRoverService.deleteById(id)).rejects.toThrow(
      "Error: MarsRover with id=bad-uuid does not exists!"
    );
  });

  test("should turn right a MarsRover instance", async () => {
    const marsRoverRepository = new MarsRoverRepository();
    const marsRoverService = new MarsRoverService(marsRoverRepository);
    const id = "175747b0-9bc7-4724-a521-cdf7cef6ae3f";

    const orientation = await marsRoverService.turnRight(id);

    expect(orientation).toBe(Orientations.SOUTH);
  });

  test("should throws error when turn right a MarsRover instance that not exists", async () => {
    const marsRoverRepository = new MarsRoverRepository();
    const marsRoverService = new MarsRoverService(marsRoverRepository);
    const id = "bad-uuid";

    await expect(marsRoverService.turnRight(id)).rejects.toThrow(
      "Error: MarsRover with id=bad-uuid does not exists!"
    );
  });

  test("should turn left a MarsRover instance", async () => {
    const marsRoverRepository = new MarsRoverRepository();
    const marsRoverService = new MarsRoverService(marsRoverRepository);
    const id = "175747b0-9bc7-4724-a521-cdf7cef6ae3f";

    const orientation = await marsRoverService.turnLeft(id);

    expect(orientation).toBe(Orientations.NORTH);
  });

  test("should throws error when turn left a MarsRover instance that not exists", async () => {
    const marsRoverRepository = new MarsRoverRepository();
    const marsRoverService = new MarsRoverService(marsRoverRepository);
    const id = "bad-uuid";

    await expect(marsRoverService.turnLeft(id)).rejects.toThrow(
      "Error: MarsRover with id=bad-uuid does not exists!"
    );
  });

  test("should move up a MarsRover instance", async () => {
    const marsRoverRepository = new MarsRoverRepository();
    const marsRoverService = new MarsRoverService(marsRoverRepository);
    const id = "175747b0-9bc7-4724-a521-cdf7cef6ae3f";

    const { x, y } = await marsRoverService.moveUp(id);

    expect(x).toBe(4);
    expect(y).toBe(1);
  });

  test("should throws error when move up a MarsRover instance that not exists", async () => {
    const marsRoverRepository = new MarsRoverRepository();
    const marsRoverService = new MarsRoverService(marsRoverRepository);
    const id = "bad-uuid";

    await expect(marsRoverService.moveUp(id)).rejects.toThrow(
      "Error: MarsRover with id=bad-uuid does not exists!"
    );
  });

  test("should move down a MarsRover instance", async () => {
    const marsRoverRepository = new MarsRoverRepository();
    const marsRoverService = new MarsRoverService(marsRoverRepository);
    const id = "175747b0-9bc7-4724-a521-cdf7cef6ae3f";

    const { x, y } = await marsRoverService.moveDown(id);

    expect(x).toBe(2);
    expect(y).toBe(1);
  });

  test("should throws error when move down a MarsRover instance that not exists", async () => {
    const marsRoverRepository = new MarsRoverRepository();
    const marsRoverService = new MarsRoverService(marsRoverRepository);
    const id = "bad-uuid";

    await expect(marsRoverService.moveDown(id)).rejects.toThrow(
      "Error: MarsRover with id=bad-uuid does not exists!"
    );
  });
});
