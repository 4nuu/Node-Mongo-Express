const express = require("express");
const User = require("../models/models");
const multer = require("multer");
const path = require("path");
const app = express();

const router = express.Router();
// app.use("/uploads", express.static("uploads"));


const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, "imgFile-" + Date.now() + path.extname(file.originalname)); 
},
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      image: req.file.filename,
    });
    
    await newUser.save();
    res.json({ message: 'User created', user: newUser });
    // console.log(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error uploading', error });
  }
});

// ➤ Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// ➤ Get a single user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Update a user by ID
router.put("/users/:id", async (req, res) => {
  try {
    // console.log("INSIDE PUT ID",req.params.id);
    // console.log("INSIDE PUT TEXT",req.body.newText);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.newText },
      { new: true }
    );
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Delete a user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    // console.log("INSIDE DELETE ID",req.body);
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
