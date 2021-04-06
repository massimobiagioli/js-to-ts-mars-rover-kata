const express = require("express");
const router = express.Router();
const { MarsRoverRepository } = require("./mars_rover_repository");
const { MarsRoverService } = require("./mars_rover_service");
const { MarsRoverDto } = require("./mars_rover");
const marsRoverRepository = new MarsRoverRepository();
const marsRoverService = new MarsRoverService(marsRoverRepository);

router.post("/create", (req, res) => {
  const marsRoverDto = new MarsRoverDto(
    req.body.name,
    req.body.x,
    req.body.y,
    req.body.orientation
  );
  marsRoverService
    .create(marsRoverDto)
    .then((id) => res.send(id))
    .catch((error) => res.status(500).send(error.message));
});

router.delete("/delete", (req, res) => {
  marsRoverService
    .deleteById(req.body.id)
    .then(() => res.send())
    .catch((error) => res.status(500).send(error.message));
});

router.post("/turnRight", async (req, res) => {
  marsRoverService
    .turnRight(req.body.id)
    .then((orientation) => res.send(orientation))
    .catch((error) => res.status(500).send(error.message));
});

router.post("/turnLeft", async (req, res) => {
  marsRoverService
    .turnLeft(req.body.id)
    .then((orientation) => res.send(orientation))
    .catch((error) => res.status(500).send(error.message));
});

router.post("/moveUp", async (req, res) => {
  marsRoverService
    .moveUp(req.body.id)
    .then((position) => res.send(position))
    .catch((error) => res.status(500).send(error.message));
});

router.post("/moveDown", async (req, res) => {
  marsRoverService
    .moveDown(req.body.id)
    .then((position) => res.send(position))
    .catch((error) => res.status(500).send(error.message));
});

module.exports = router;
