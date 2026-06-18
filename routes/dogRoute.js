const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const passport = require("../middleware/passport");
const { addDog, getDogs, getDogById, updateDog, deleteDog } = require("../controllers/dogController");
router.post(
  "/dogs",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  addDog
);
router.get("/dogs", getDogs);
router.get("/dogs/:id", getDogById);
router.put("/dogs/:id", updateDog);
router.delete("/dogs/:id", deleteDog);
module.exports = router;