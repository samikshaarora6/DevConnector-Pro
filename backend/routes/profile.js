const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
  getProfiles,
  getProfileById,
  createProfile,
  addProject,
  deleteProject
} = require('../controllers/profileController');

// @route   GET /api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', getProfiles);

// @route   GET /api/profile/:id
// @desc    Get profile by ID
// @access  Public
router.get('/:id', getProfileById);

// @route   POST /api/profile
// @desc    Create or update profile
// @access  Private
router.post('/', protect, createProfile);

// @route   POST /api/profile/project
// @desc    Add project to profile
// @access  Private
router.post('/project', protect, addProject);

// @route   DELETE /api/profile/project/:project_id
// @desc    Delete project from profile
// @access  Private
router.delete('/project/:project_id', protect, deleteProject);

module.exports = router; 