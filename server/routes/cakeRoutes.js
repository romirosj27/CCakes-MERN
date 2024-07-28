const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Cake = require('../models/Cake');

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Handle GET request to fetch all cakes
router.get('/', async (req, res) => {
  try {
    const cakes = await Cake.find({});
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Handle POST request to create a new cake with an image
router.post('/', upload.single('image'), async (req, res) => {
  const { name, category, unitPrice } = req.body;

  try {
    const newCake = new Cake({ name, category, unitPrice });

    if (req.file) {
      const imageId = await uploadImageToGridFS(req.file);
      newCake.imageId = imageId;
    }

    await newCake.save();
    res.status(201).json(newCake);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Function to handle image upload to GridFS
const uploadImageToGridFS = async (file) => {
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'cakeImagesTest',
  });

  const uploadStream = bucket.openUploadStream(file.originalname);
  uploadStream.end(file.buffer);

  return new Promise((resolve, reject) => {
    uploadStream.on('finish', (file) => resolve(file._id));
    uploadStream.on('error', reject);
  });
};

// Handle GET request to retrieve an image by its ID
router.get('/image/:id', async (req, res) => {
  try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'cakeImagesTest',
    });

    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(req.params.id));

    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });

    downloadStream.on('end', () => {
      res.end();
    });

    downloadStream.on('error', (err) => {
      console.error('Error downloading file:', err);
      res.status(500).json({ message: 'Error downloading file' });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
