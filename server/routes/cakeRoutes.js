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

// Handle GET request to fetch a cake by imageId
router.get('/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;
    const cake = await Cake.findOne({ imageId });

    if (!cake) {
      return res.status(404).json({ message: 'Cake not found' });
    }

    res.json(cake);
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

// Handle PUT request to update cake details
router.put('/:imageId', upload.single('image'), async (req, res) => {
  const { imageId } = req.params;
  const { name, category, unitPrice } = req.body;

  try {
    const cake = await Cake.findOne({ imageId });

    if (!cake) {
      return res.status(404).json({ message: 'Cake not found' });
    }

    if (name) cake.name = name;
    if (category) cake.category = category;
    if (unitPrice) cake.unitPrice = unitPrice;

    if (req.file) {
      // Delete old image from GridFS
      if (cake.imageId) {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
          bucketName: 'cakeImagesTest',
        });
        await bucket.delete(new mongoose.Types.ObjectId(cake.imageId));
      }

      // Upload new image to GridFS
      const newImageId = await uploadImageToGridFS(req.file);
      cake.imageId = newImageId;
    }

    await cake.save();
    res.json(cake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
