const PORT = process.env.PORT || 3000;
const fs = require("fs");
const express = require("express");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const csvToJson = require("csvtojson");
const { Parser } = require("json2csv");

// configuration
const app = express();
require("dotenv").config();
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/client/dist/client"));
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// routes
app.post("/upload", upload.single("invoice"), (req, res) => {
  try {
    //TODO save img file and process through python...

    // res.send({ msg: "ok" });
    // reading csv, converting to json and sends back response
    const filePath = "./public/csv/invoice.csv";
    csv()
      .fromFile(filePath)
      .then((jsonObj) => {
        res.send({
          msg: "Success",
          data: jsonObj,
          invoicePath: req.file.path.slice(7),
        });
      });
  } catch (error) {
    res.send({ msg: "Error", error });
  }
});

app.post("/save", (req, res) => {
  const csvFilePath = "./public/output/invoice.csv";
  const jsonObj = req.body.data;
  if (!jsonObj) return res.send({ msg: "Please provide json." });
  let csvText = new Parser().parse(jsonObj);
  if (fs.existsSync(csvFilePath)) {
    let csvArr = csvText.split("\n");
    csvArr.shift();
    csvText = "\n" + csvArr.join("\n");
  }
  fs.appendFileSync(csvFilePath, csvText);
  res.send({ msg: "successfully created csv" });
});

app.get("/get-data/:index", (req, res) => {
  const index = req.params.index;
  if (!index) return res.send({ msg: "Please provide index." });
  try {
    const csvFilePath = `./public/csv/${index}.csv`;
    const imgFilePath = `./uploads/${index}.jpg`;

    csvToJson()
      .fromFile(csvFilePath)
      .then((jsonObj) => {
        res.send({
          msg: "Success",
          data: jsonObj,
          imgFilePath,
        });
      });
  } catch (error) {
    res.send({ msg: "Error", error });
  }
});

// start server on port 3000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
