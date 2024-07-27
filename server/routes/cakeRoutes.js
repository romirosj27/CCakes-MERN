const express = require('express');
const Cake = require('../models/Cake');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cakes = await Cake.find({});
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post('/', async (req, res) => {
  const { name, category, unitPrice, imageBase64  } = req.body;

  try {
    const newCake = new Cake({ name, category, unitPrice, imageBase64  });
    await newCake.save();
    res.status(201).json(newCake);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
