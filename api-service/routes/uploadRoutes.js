const express = require('express');
const upload = require('../middlewares/multer');
const uploadToAzure = require('../utils/azureUpload');
const router = express.Router();

// POST: Upload image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Ensure a file is provided
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Upload image to Azure
    const imageUrl = await uploadToAzure(req.file.buffer, req.file.originalname);

    // Return the public URL
    res.status(200).json({ message: 'File uploaded successfully.', imageUrl });
  } catch (error) {
    console.error('Error uploading file:', error.message);
    res.status(500).json({ error: 'Failed to upload file.' });
  }
});

module.exports = router;
