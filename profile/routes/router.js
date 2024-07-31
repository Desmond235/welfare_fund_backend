const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../../dbConnection');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname,'../../', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagesDir); // Specify the folder where you want to save the file
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);

  },
});

const upload = multer({ storage: storage });

router.post('/upload-image', upload.single('photo'), async (req, res) => {
  console.log(req.file.path); // The uploaded file details
  // Save other product details (name, price, etc.) to your database
});

// Add this router to your main app
module.exports = router;
