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


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use('/api/users', userRoutes);
app.use('/api', userRoutes);
app.use("/uploads", express.static("uploads"));


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// app.get("/", (req, res) => {
//   res.send("Hello, MongoDB is connected!");
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
