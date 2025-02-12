const express = require('express');
const User = require('../models/models');

const router = express.Router();

// ➤ Create a new user
router.post('/users', async (req, res) => {
    try {
        console.log(req.body,"req.body");
        
        const { name, email, number, age, image } = req.body;

        // Validate the request body
        // if (!name || !email || !number || !age) {
        //     return res.status(400).json({ error: "All fields are required" });
        // }

        const user = new User({ name, email, number, age });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ➤ Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ➤ Get a single user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ➤ Update a user by ID
router.put('/users/:id', async (req, res) => {
    try {
        console.log("INSIDE PUT ID",req.params.id);
        
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ➤ Delete a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        // console.log("INSIDE DELETE ID",req.body);
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
