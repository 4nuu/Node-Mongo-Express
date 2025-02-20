const User = require('../models/user');
const express = require('express');
const router = express.Router();

// router.post('/postUser',(req,res) => {
    
// })

router.post('/postUserData', (req,res) => {
    // console.log("postaUserData");
    
    try {
        const data = [req.body]
        console.log(data);

    } catch (error) {
        console.log(error);
        
    }
    
})

module.exports = router;