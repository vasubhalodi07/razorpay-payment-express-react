const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

app.use(express.json());
app.use(cors());

dotenv.config({ path: ".env" });

const routes = require("./routes");
app.use("/api/payment/", routes);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server Running!" });
});

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
