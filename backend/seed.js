const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const MONGO_URI = 'mongodb://localhost:27017/devconnector';

const dummyUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Full Stack Developer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    bio: 'Passionate full-stack developer with 5 years of experience in building web applications.',
    githubusername: 'johndoe',
    social: {
      youtube: 'https://youtube.com/johndoe',
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      instagram: 'https://instagram.com/johndoe'
    }
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: 'Frontend Developer',
    company: 'Web Solutions',
    location: 'New York, NY',
    skills: ['React', 'TypeScript', 'CSS', 'HTML'],
    bio: 'Frontend developer specializing in React and modern web technologies.',
    githubusername: 'janesmith',
    social: {
      youtube: 'https://youtube.com/janesmith',
      twitter: 'https://twitter.com/janesmith',
      linkedin: 'https://linkedin.com/in/janesmith',
      instagram: 'https://instagram.com/janesmith'
    }
  },
  {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'Backend Developer',
    company: 'Data Systems',
    location: 'Seattle, WA',
    skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    bio: 'Backend developer with expertise in Python and cloud technologies.',
    githubusername: 'mikejohnson',
    social: {
      youtube: 'https://youtube.com/mikejohnson',
      twitter: 'https://twitter.com/mikejohnson',
      linkedin: 'https://linkedin.com/in/mikejohnson',
      instagram: 'https://instagram.com/mikejohnson'
    }
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected...');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users...');

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      dummyUsers.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    // Insert users
    await User.insertMany(hashedUsers);
    console.log('Dummy users added successfully!');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
};

seedDatabase(); 