// const fs = require("fs");
// const cors = require("cors");
// const express = require("express");
// const app = express();
// const multer = require("multer");
// const path = require("path");
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage: storage });

// const filePath = "./data.json";

// const readFile = () => {
//   try {
//     let data = fs.readFileSync(filePath);
//     return JSON.parse(data);
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       return []; // Return empty array if the file doesn't exist
//     }
//     throw error;
//   }
// };

// const writeFile = (data) => {
//   fs.writeFileSync(filePath, JSON.stringify(data));
// };

// app.get("/getAllUserData", (req, res) => {
//   try {
//     const data = readFile();
//     // res.json(data)

//     res.status(200).json({
//       success: true,
//       message: "Data fetched successfully",
//       data: data,
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error. Could not fetch data.",
//       // errorDetails: error.message
//     });
//   }
// });

// app.post("/postAllUserData", (req, res) => {
//   console.log(req.body);

//   try {
//     const arr = [req.body.data];
//     // console.log(arr);
//     writeFile(arr);

//     res.status(201).json({
//       success: true,
//       message: "User data added successfully",
//       data: arr,
//     });
//   } catch (error) {
//     console.error("Error saving user data:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error. Could not save new user data.",
//       // errorDetails: error.message
//     });
//   }
// });

// app.put("/editSingleUserData", (req, res) => {
//   const userID = req.body.id;
//   const userName = req.body.newText;
//   // console.log(userID);
//   // console.log(userName);
//   console.log("***");

//   const filterData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//   // console.log(filterData);
//   console.log("____");

//   let userUpdated = false;

//   const updatedData = filterData.map((user) => {
//     if (user.id === userID) {
//       user.name = userName;
//       userUpdated = true;
//     }
//     return user;
//   });

//   if (!userUpdated) {
//     return res.status(404).json({
//       success: false,
//       message: "User not found",
//     });
//   }

//   try {
//     fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
//     console.log("Data after update:", updatedData);

//     const data = readFile();
//     // res.json(data)

//     res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       data: updatedData,
//     });
//   } catch (error) {
//     console.log("Error writing to file:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error. Could not save updated data.",
//       // errorDetails: error.message
//     });
//   }
// });

// app.delete("/deleteAllUserData", (req, res) => {
//   try {
//     writeFile([]);
//     res.status(200).json({
//       success: true,
//       message: "All users deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting all user data:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error. Could not delete all user data.",
//       errorDetails: error.message,
//     });
//   }
// });

// app.delete("/deleteSingleUserData", (req, res) => {
//   const userID = parseInt(req.query.id);
//   // const userID = (req.query.id)
//   // console.log(userID);
//   // console.log("*************");

//   try {
//     const filterData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//     const filteredData = filterData.filter(
//       (value, index) => value.id !== userID
//     );
//     // console.log(filteredData);

//     if (filteredData.length === filterData.length) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     fs.writeFileSync(filePath, JSON.stringify(filteredData));

//     res.status(200).json({
//       success: true,
//       message: "User deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting user data:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error. Could not delete user data.",
//       errorDetails: error.message,
//     });
//   }
// });

// app.post("/fileupload", upload.single("imgFile"), (req, res) => {
//   console.log(req.file);
//   if (!req.file) {
//     return res.status(400).json({ message: "No File Uploaded" });
//   }

//   res
//     .status(200)
//     .json({ success: true, message: "File Uploaded Successfully" });
// });

// // app.get("/filedownload", (req, res) => {
// //   const file = `${__dirname}/uploads/imgFile-1631562212922.jpg`;
// //   res.download(file);
// // });

// app.get('/filedownload', (req, res) => {
//     fs.readdir('./uploads', (err, files) => {
//       if (err) {
//         return res.status(500).json({ message: 'Unable to fetch files' });
//       }
//       res.json(files); // Send the list of uploaded files
//     });
//   });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
