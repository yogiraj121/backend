const express = require("express");
const multer = require("multer");
const { handleUpload, listHistory } = require("./controller");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/", upload.single("file"), handleUpload);

router.get("/history", listHistory);

module.exports = router;
