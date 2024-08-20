const express = require('express');
const multer = require('multer');
const ImageRouter = express.Router();
const db = require('../../dbConnection');
const fs = require('fs');
const path = require('path');

const imagesDir  = path.join(__dirname, '../../', 'images');
if(!fs.existsSync(imagesDir)){
  fs.mkdirSync(imagesDir);
}

const fileStorage =  multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, imagesDir);
  },
  filename: (req, file, cb) =>{
    cb(null, Date.now() +file.originalname )
  }
});
const uploadFile = multer({storage: fileStorage})

// ImageRouter.get('/image/:imagename', (req, res) => {
//   res.sendFile(path.join(__dirname, `images/${req.params.imagename}`));
// });


ImageRouter.post('/send-image', uploadFile.single('image'), (req, res) => {
  const image = {
    imagePath: `http://10.0.2.2:3000/images/${req.file.filename}`,
  };
  const query = 'INSERT INTO images(image_path) VALUES (?)';
  const images = [image.imagePath];
     db.query(
      query, 
      images,
      (err, result) => {
        if(err){
          res.status(400).json({
            message: 'An error occurred while sending image to database'
          })
        }
        res.status(200).json({
          message: 'Image sent successfully',
          imagePath: image.imagePath
        })
      }
     )
  console.log(req.file.path);
  // console.log(image);
})

// const imagesDir = path.join(__dirname,'../../', 'images');
// if (!fs.existsSync(imagesDir)) {
//   fs.mkdirSync(imagesDir);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, imagesDir); // Specify the folder where you want to save the file
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);

//   },
// });

// const upload = multer({ storage: storage});

// // router.post('/upload-image', upload.single('photo'), (req, res) => {
// //   console.log(req.file.path); // The uploaded file details
// //   // Save other product details (name, price, etc.) to your database
// });

// Add this router to your main app
module.exports = ImageRouter;
