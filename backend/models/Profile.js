const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    required: true
  }],
  projects: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    technologies: [String],
    githubUrl: String,
    liveUrl: String,
    image: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  social: {
    github: String,
    linkedin: String,
    twitter: String,
    portfolio: String
  },
  location: {
    type: String
  },
  availability: {
    type: String,
    enum: ['Available', 'Busy', 'Not Available'],
    default: 'Available'
  },
  collaborationPreferences: {
    type: String,
    enum: ['Open to Collaborate', 'Selective', 'Not Available'],
    default: 'Open to Collaborate'
  },
  interests: [String],
  experience: [{
    title: String,
    company: String,
    location: String,
    from: Date,
    to: Date,
    current: Boolean,
    description: String
  }],
  education: [{
    school: String,
    degree: String,
    fieldofstudy: String,
    from: Date,
    to: Date,
    current: Boolean,
    description: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', ProfileSchema); 