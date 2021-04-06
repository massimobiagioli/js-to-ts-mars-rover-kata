const { MarsRover } = require("../mars_rover");
let fakeData = [
  {
    id: "0834cddc-177d-4925-8e8c-3537faead897",
    name: "Paul",
    orientation: "north",
    position: {
      x: 1,
      y: 2,
    },
  },
  {
    id: "175747b0-9bc7-4724-a521-cdf7cef6ae3f",
    name: "John",
    orientation: "east",
    position: {
      x: 3,
      y: 1,
    },
  },
];

class MarsRoverRepository {
  async insert(marsRover) {
    fakeData.push(marsRover.toJson());
  }

  async update(marsRover) {}

  async getById(id) {
    const data = fakeData.find((item) => item.id === id);
    if (data === undefined) {
      throw new Error(`MarsRover with id=${id} does not exists!`);
    }
    return MarsRover.create(
      data.id,
      data.name,
      data.position.x,
      data.position.y,
      data.orientation
    );
  }

  async deleteById(id) {
    const data = fakeData.find((item) => item.id === id);
    if (data === undefined) {
      throw new Error(`MarsRover with id=${id} does not exists!`);
    }
    fakeData = fakeData.filter((item) => item.id !== id);
  }
}

module.exports = {
  MarsRoverRepository,
};
