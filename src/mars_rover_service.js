const { v4: uuidv4 } = require("uuid");
const { MarsRover } = require("./mars_rover");

class MarsRoverService {
  constructor(marsRoverRepository) {
    this.marsRoverRepository = marsRoverRepository;
  }

  async create(marsRoverDto) {
    try {
      const id = uuidv4();
      const marsRover = MarsRover.create(
        id,
        marsRoverDto.name,
        marsRoverDto.x,
        marsRoverDto.y,
        marsRoverDto.orientation
      );
      await this.marsRoverRepository.insert(marsRover);
      return id;
    } catch (error) {
      throw Error(error);
    }
  }

  async deleteById(id) {
    try {
      await this.marsRoverRepository.deleteById(id);
    } catch (error) {
      throw Error(error);
    }
  }

  async turnRight(id) {
    try {
      let marsRover = await this.marsRoverRepository.getById(id);
      marsRover = marsRover.turnRight();
      await this.marsRoverRepository.update(marsRover);
      return marsRover.orientation;
    } catch (error) {
      throw Error(error);
    }
  }

  async turnLeft(id) {
    try {
      let marsRover = await this.marsRoverRepository.getById(id);
      marsRover = marsRover.turnLeft();
      await this.marsRoverRepository.update(marsRover);
      return marsRover.orientation;
    } catch (error) {
      throw Error(error);
    }
  }

  async moveUp(id) {
    try {
      let marsRover = await this.marsRoverRepository.getById(id);
      marsRover = marsRover.moveUp();
      await this.marsRoverRepository.update(marsRover);
      return marsRover.position;
    } catch (error) {
      throw Error(error);
    }
  }

  async moveDown(id) {
    try {
      let marsRover = await this.marsRoverRepository.getById(id);
      marsRover = marsRover.moveDown();
      await this.marsRoverRepository.update(marsRover);
      return marsRover.position;
    } catch (error) {
      throw Error(error);
    }
  }
}

module.exports = {
  MarsRoverService,
};
