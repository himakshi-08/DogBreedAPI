const Dog = require("../models/Dog");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const addDog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "dogs",
      }
    );

    fs.unlinkSync(req.file.path);

    const dog = await Dog.create({
      breed: req.body.breed,
      age: req.body.age,
      color: req.body.color,
      image: result.secure_url,
    });

    res.status(201).json({
      message: "Dog Added Successfully",
      dog,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const getDogs = async (req, res) => {
  try {
    const dogs = await Dog.find();

    res.status(200).json({
      count: dogs.length,
      dogs,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getDogById = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);

    if (!dog) {
      return res.status(404).json({
        message: "Dog Not Found",
      });
    }

    res.status(200).json(dog);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateDog = async (req, res) => {
  try {
    const dog = await Dog.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!dog) {
      return res.status(404).json({
        message: "Dog Not Found",
      });
    }

    res.status(200).json({
      message: "Dog Updated Successfully",
      dog,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteDog = async (req, res) => {
  try {
    const dog = await Dog.findByIdAndDelete(
      req.params.id
    );

    if (!dog) {
      return res.status(404).json({
        message: "Dog Not Found",
      });
    }

    res.status(200).json({
      message: "Dog Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  addDog,
  getDogs,
  getDogById,
  updateDog,
  deleteDog,
};
