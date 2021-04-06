const { MarsRover } = require("./mars_rover");
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_CONNECTION_STRING;

class MarsRoverRepository {
  async connect() {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.client.connect();
  }

  async disconnect() {
    this.client.close();
  }

  getCollection() {
    const database = this.client.db();
    return database.collection("mars_rover");
  }

  findDocumentById(id) {
    return this.getCollection().findOne({ id });
  }

  deleteDocumentById(id) {
    return this.getCollection().deleteOne({ id });
  }

  transformDataForUpdate(marsRoverJsonData) {
    return {
      $set: {
        name: marsRoverJsonData.name,
        position: marsRoverJsonData.position,
        orientation: marsRoverJsonData.orientation,
      },
    };
  }

  async insert(marsRover) {
    try {
      await this.connect();
      await this.getCollection().insertOne(marsRover.toJson());
    } finally {
      await this.disconnect();
    }
  }

  async update(marsRover) {
    try {
      await this.connect();
      await this.getCollection().updateOne(
        { id: marsRover.id },
        this.transformDataForUpdate(marsRover.toJson())
      );
    } finally {
      await this.disconnect();
    }
  }

  async getById(id) {
    let marsRover = null;
    try {
      await this.connect();
      const data = await this.findDocumentById(id);
      if (data === null) {
        throw new Error(`MarsRover with id=${id} does not exists!`);
      }
      marsRover = MarsRover.create(
        data.id,
        data.name,
        data.position.x,
        data.position.y,
        data.orientation
      );
    } finally {
      await this.disconnect();
    }
    return marsRover;
  }

  async deleteById(id) {
    try {
      await this.connect();
      const data = await this.findDocumentById(id);
      if (data === null) {
        throw new Error(`MarsRover with id=${id} does not exists!`);
      }
      await this.deleteDocumentById(id);
    } finally {
      await this.disconnect();
    }
  }
}

module.exports = {
  MarsRoverRepository,
};
