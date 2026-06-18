const Dog = require("../models/Dog");
const cloudinary = require("../config/cloudinary");
const addDog = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, { folder: "dogs" });
    const dog = await Dog.create({
      breed: req.body.breed,
      age: req.body.age,
      color: req.body.color,
      image: result.secure_url,
    });
    res.status(201).json({ message: "Dog Added Successfully", dog });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getDogs = async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.status(200).json(dogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getDogById = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    res.status(200).json(dog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateDog = async (req, res) => {
  try {
    const dog = await Dog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(dog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteDog = async (req, res) => {
  try {
    await Dog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Dog Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { addDog, getDogs, getDogById, updateDog, deleteDog };