const app = require("express")();
const multer = require("multer");

// Set storage engine for images
const storage = multer.diskStorage({
  // Destination for files
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/images");
  },

  // Add extension for files
  filename: (req, file, cb) => {
    cb(null, Date.now() + "." + file.originalname);
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 * 3 }, // set max. file size = 3 MB
});

app.post("/single", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send("Single file upload success");
});

app.post("/multiple", upload.array("images", 3), (req, res) => {
  console.log(req.files);
  res.send("Multiple files upload success");
});

app.listen(3000, () => console.log("Runnning on port 3000..."));
