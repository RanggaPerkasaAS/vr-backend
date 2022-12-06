const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());

const nft = require("./router/nft");
app.use("/nft", nft);
app.use(express.static(path.join(__dirname, "/public/img/")));

mongoose.connect(process.env.DB_URL);
let db = mongoose.connection;

db.on("error", console.error.bind(console, "Database Error"));
db.once("open", () => {
  console.log("Database Connect");
});

app.listen(process.env.PORT, () => {
  console.log(`Server run in PORT ${process.env.PORT}`);
});
