const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc    Get all profiles
// @route   GET /api/profile
// @access  Public
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate('user', ['name', 'avatar'])
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: profiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get profile by ID
// @route   GET /api/profile/:id
// @access  Public
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)
      .populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Create or update profile
// @route   POST /api/profile
// @access  Private
exports.createProfile = async (req, res) => {
  try {
    const {
      title,
      bio,
      skills,
      location,
      social,
      availability,
      collaborationPreferences,
      interests
    } = req.body;

    // Build profile object
    const profileFields = {
      user: req.user.id,
      title,
      bio,
      skills: skills.split(',').map(skill => skill.trim()),
      location,
      social,
      availability,
      collaborationPreferences,
      interests: interests.split(',').map(interest => interest.trim())
    };

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        data: profile
      });
    }

    // Create
    profile = new Profile(profileFields);
    await profile.save();
    res.status(201).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Add project to profile
// @route   POST /api/profile/project
// @access  Private
exports.addProject = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      githubUrl,
      liveUrl,
      image
    } = req.body;

    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const newProject = {
      title,
      description,
      technologies: technologies.split(',').map(tech => tech.trim()),
      githubUrl,
      liveUrl,
      image
    };

    profile.projects.unshift(newProject);
    await profile.save();

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete project from profile
// @route   DELETE /api/profile/project/:project_id
// @access  Private
exports.deleteProject = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // Get remove index
    const removeIndex = profile.projects
      .map(project => project.id)
      .indexOf(req.params.project_id);

    if (removeIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    profile.projects.splice(removeIndex, 1);
    await profile.save();

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
}; 