const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/users', userController.createUser);
// router.get('/', userController.checkPermission);

// Read all users
router.get('/users', userController.getAllUsers);
// router.get('/users/show', userController.getUserById);

// Read a single user by ID
router.get('/users/show/:id', userController.getUserById);

// Update a user by ID
router.put('/users/:id', userController.updateUser);

// Delete a user by ID
router.delete('/users/:id', userController.deleteUser);

module.exports = router;