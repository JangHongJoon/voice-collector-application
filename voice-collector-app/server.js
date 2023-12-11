const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/home/database/webServer/tempDir/wav'); // Set the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original filename
  },
});

const upload = multer({ storage: storage });

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    // Access the uploaded file details using req.file
    console.log('File uploaded:', req.file);

    res.status(200).json({ success: true, message: 'File uploaded successfully.' });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
