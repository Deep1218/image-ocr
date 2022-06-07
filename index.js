const PORT = process.env.PORT || 3000;
const fs = require("fs");
const express = require("express");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const csv = require("csvtojson");
const { Parser } = require("json2csv");

// configuration
const app = express();
require("dotenv").config();
app.use(express.static(__dirname + "/public"));
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
    console.log(req.file.path);
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
  let jsonObj = req.body.data;
  if (!jsonObj) return res.send({ msg: "data should not be empty" });
  const filePath = "/output/invoice.csv";
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(jsonObj);
  fs.writeFileSync("./public" + filePath, csv);
  res.send({ msg: "successfully created csv", filePath });
});

// start server on port 3000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
