const { Position } = require("./position");

const Orientations = {
  NORTH: "north",
  SOUTH: "south",
  EAST: "east",
  WEST: "west",
};

const ORIENTATION_MAP = {
  north: {
    right: Orientations.EAST,
    left: Orientations.WEST,
    up: {
      xOffset: 0,
      yOffset: 1,
    },
    down: {
      xOffset: 0,
      yOffset: -1,
    },
  },
  east: {
    right: Orientations.SOUTH,
    left: Orientations.NORTH,
    up: {
      xOffset: 1,
      yOffset: 0,
    },
    down: {
      xOffset: -1,
      yOffset: 0,
    },
  },
  south: {
    right: Orientations.WEST,
    left: Orientations.EAST,
    up: {
      xOffset: 0,
      yOffset: -1,
    },
    down: {
      xOffset: 0,
      yOffset: 1,
    },
  },
  west: {
    right: Orientations.NORTH,
    left: Orientations.SOUTH,
    up: {
      xOffset: -1,
      yOffset: 0,
    },
    down: {
      xOffset: 1,
      yOffset: 0,
    },
  },
};

class MarsRover {
  constructor(id, name, x, y, orientation) {
    this.id = id;
    this.name = name;
    this.position = Position.create(x, y);
    this.orientation = orientation;
  }

  static create(id, name, x, y, orientation) {
    return new MarsRover(id, name, x, y, orientation);
  }

  turnRight() {
    return MarsRover.create(
      this.id,
      this.name,
      this.position.x,
      this.position.y,
      ORIENTATION_MAP[this.orientation].right
    );
  }

  turnLeft() {
    return MarsRover.create(
      this.id,
      this.name,
      this.position.x,
      this.position.y,
      ORIENTATION_MAP[this.orientation].left
    );
  }

  move(xOffset, yOffset) {
    const newPosition = this.position.moveX(xOffset).moveY(yOffset);

    return MarsRover.create(
      this.id,
      this.name,
      newPosition.x,
      newPosition.y,
      this.orientation
    );
  }

  moveUp() {
    const { xOffset, yOffset } = ORIENTATION_MAP[this.orientation].up;
    return this.move(xOffset, yOffset);
  }

  moveDown() {
    const { xOffset, yOffset } = ORIENTATION_MAP[this.orientation].down;
    return this.move(xOffset, yOffset);
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      position: this.position.toJson(),
      orientation: this.orientation,
    };
  }
}

class MarsRoverDto {
  constructor(name, x, y, orientation) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.orientation = orientation;
  }
}

module.exports = {
  MarsRover,
  MarsRoverDto,
  Orientations,
};
