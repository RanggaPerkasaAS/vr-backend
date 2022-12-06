const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

//model nft
const Nft = require("../models/Nft");

//get nft
app.get("/", (req, res) => {
  Nft.find().then((Nft) => {
    res.json({ nft: Nft });
  });
});

//post nft
app.post("/postNft", async (req, res) => {
  try {
    const asset = req.files?.asset;
    const uploadFile = path.join(__dirname, "../public/img/");
    const nft = new Nft({
      author: req.body.author,
      title: req.body.title,
      owner: req.body.owner,
      description: req.body.description,
      cardano: req.body.cardano,
      usd: req.body.usd,
      asset: asset !== undefined ? asset.name.replaceAll(" ", "") : "",
    });
    const savedNft = await nft.save();
    if (asset) {
      await asset.mv(uploadFile + savedNft.asset);
      const protocol = req.headers["x-forwarded-proto"];
      if (protocol) {
        savedNft.asset = `${protocol}://${req.headers.host}/${savedNft.asset}`;
      } else {
        savedNft.asset = `${req.headers.host}/${savedNft.asset}`;
      }
    }
    res.status(200).json(savedNft);
  } catch (error) {
    res.status(500).json({ errorMassage: error.message });
  }
});

module.exports = app;
