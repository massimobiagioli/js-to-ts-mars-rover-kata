require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const router = express.Router();
const routes = require("./routes");

router.use("/", routes);

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
