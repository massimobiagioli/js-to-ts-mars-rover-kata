require("dotenv").config({ path: `.env.test` });

const { MongoClient } = require("mongodb");
const express = require("express");
const routes = require("./routes");
const request = require("supertest");
const app = express();
const router = express.Router();

router.use("/", routes);

app.use(express.json());
app.use(router);

const initData = [
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

async function initTestDB() {
  const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();

  const database = client.db();
  const collection = database.collection("mars_rover");
  await collection.drop();

  await Promise.all(
    initData.map(async (item) => {
      await collection.insertOne(item);
    })
  );

  await client.close();
}

describe("Test Server Routes", () => {
  beforeEach(async () => {
    await initTestDB();
  });

  test("POST /create - success", async (done) => {
    request(app)
      .post("/create")
      .send({
        name: "Jack",
        x: 1,
        y: -24,
        orientation: "north",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /text/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("DELETE /delete - success", async (done) => {
    request(app)
      .delete("/delete")
      .send({
        id: "175747b0-9bc7-4724-a521-cdf7cef6ae3f",
      })
      .set("Accept", "application/json")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("DELETE /delete - error", async (done) => {
    request(app)
      .delete("/delete")
      .send({
        id: "175747b0-9bc7-4724-a521-cdf7cef6ae4q",
      })
      .set("Accept", "application/json")
      .expect(500)
      .expect(
        "Error: MarsRover with id=175747b0-9bc7-4724-a521-cdf7cef6ae4q does not exists!"
      )
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("POST /turnRight - success", async (done) => {
    request(app)
      .post("/turnRight")
      .send({
        id: "175747b0-9bc7-4724-a521-cdf7cef6ae3f",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /text/)
      .expect(200)
      .expect("south")
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("POST /turnRight - error", async (done) => {
    request(app)
      .post("/turnRight")
      .send({
        id: "175747b0-9bc7-4724-a521-cdf7cef6ae4q",
      })
      .set("Accept", "application/json")
      .expect(500)
      .expect(
        "Error: MarsRover with id=175747b0-9bc7-4724-a521-cdf7cef6ae4q does not exists!"
      )
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("POST /turnLeft - success", async (done) => {
    request(app)
      .post("/turnLeft")
      .send({
        id: "175747b0-9bc7-4724-a521-cdf7cef6ae3f",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /text/)
      .expect(200)
      .expect("north")
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("POST /turnLeft - error", async (done) => {
    request(app)
      .post("/turnLeft")
      .send({
        id: "175747b0-9bc7-4724-a521-cdf7cef6ae4q",
      })
      .set("Accept", "application/json")
      .expect(500)
      .expect(
        "Error: MarsRover with id=175747b0-9bc7-4724-a521-cdf7cef6ae4q does not exists!"
      )
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("POST /moveUp - success", async (done) => {
    request(app)
      .post("/moveUp")
      .send({
        id: "175747b0-9bc7-4724-a521-cdf7cef6ae3f",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({
        x: 4,
        y: 1,
      })
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("POST /moveUp - error", async (done) => {
    request(app)
      .post("/moveUp")
      .send({
        id: "175747b0-9bc7-4724-a521-cdf7cef6ae4q",
      })
      .set("Accept", "application/json")
      .expect(500)
      .expect(
        "Error: MarsRover with id=175747b0-9bc7-4724-a521-cdf7cef6ae4q does not exists!"
      )
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("POST /moveDown - success", async (done) => {
    request(app)
      .post("/moveDown")
      .send({
        id: "175747b0-9bc7-4724-a521-cdf7cef6ae3f",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({
        x: 2,
        y: 1,
      })
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("POST /moveDown - error", async (done) => {
    request(app)
      .post("/moveDown")
      .send({
        id: "175747b0-9bc7-4724-a521-cdf7cef6ae4q",
      })
      .set("Accept", "application/json")
      .expect(500)
      .expect(
        "Error: MarsRover with id=175747b0-9bc7-4724-a521-cdf7cef6ae4q does not exists!"
      )
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
