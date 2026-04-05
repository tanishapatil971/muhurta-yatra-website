const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

// GET /api/packages - Get all packages (with fallback support)
router.get('/', packageController.getPackages);

// POST /api/packages - Create a new package
router.post('/', packageController.createPackage);

// PATCH /api/packages/:id - Update a package
router.patch('/:id', packageController.updatePackage);

// DELETE /api/packages/:id - Delete a package
router.delete('/:id', packageController.deletePackage);

module.exports = router;
