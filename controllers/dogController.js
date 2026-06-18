const Dog = require("../models/Dog");
const cloudinary = require("../config/cloudinary");
const addDog = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        message: "Image file not received"
      });
    }

    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "dogs"
      }
    );

    const dog = await Dog.create({
      breed: req.body.breed,
      age: req.body.age,
      color: req.body.color,
      image: result.secure_url
    });

    res.status(201).json({
      message: "Dog Added Successfully",
      dog
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message
    });
  }
};
module.exports = { addDog, getDogs, getDogById, updateDog, deleteDog };