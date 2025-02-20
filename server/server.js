require("dotenv").config();
const mongoose = require ('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const PORT = process.env.PORT || 9000

app.use(cors());
app.use(express.json());
app.use('/user/', userRoutes);
mongoose.connect(process.env.URL).then( () => console.log("MongoDB Connected Successfully"))
.catch( (err) => console.log("MongoDB Error",err));

app.get('/', (req,res) => {
    res.send("athul")
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

