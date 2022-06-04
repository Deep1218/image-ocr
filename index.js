const PORT = process.env.PORT || 3000;
const path = require("path");
const express = require("express");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const csv = require("csvtojson");

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
const upload = multer({ storage }).single("invoice");
// var upload = multer({ storage });

// routes
app.post("/upload", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      res.status(500).send({ msg: "can not upload invoice" });
      return;
    }

    //TODO save img file and process through python...

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
  });
});

// start server on port 3000
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
