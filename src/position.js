const X_LIMIT = 5;
const Y_LIMIT = 5;

class Position {
  constructor(x, y) {
    this.x = this.safePosition(x, X_LIMIT);
    this.y = this.safePosition(y, Y_LIMIT);
  }

  static create(x, y) {
    return new Position(x, y);
  }

  safePosition(position, limit) {
    if (position < 0) {
      return 0;
    }
    if (position > limit) {
      return limit;
    }
    return position;
  }

  moveX(offset) {
    return Position.create(this.x + offset, this.y);
  }

  moveY(offset) {
    return Position.create(this.x, this.y + offset);
  }

  toJson() {
    return {
      x: this.x,
      y: this.y,
    };
  }
}

module.exports = {
  Position,
};
