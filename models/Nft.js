const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const nftSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cardano: {
    type: String,
    required: true,
  },
  usd: {
    type: String,
    required: true,
  },
  asset: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("nft", nftSchema);
