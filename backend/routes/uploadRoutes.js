const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// POST /api/upload - Secure admin route to upload a single image to Cloudinary
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }
    
    // Cloudinary automatically returns a very helpful 'path' string directly
    res.status(200).json({ 
      success: true, 
      imageUrl: req.file.path,
      message: 'Image successfully uploaded to Cloudinary' 
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
});

module.exports = router;
