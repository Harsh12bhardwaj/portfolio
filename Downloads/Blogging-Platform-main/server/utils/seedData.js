require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Example Post schema
const postSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String
});

const Post = mongoose.model('Post', postSchema);

async function seedDatabase() {
  try {
    await Post.deleteMany({});
    await Post.create([
      { title: 'Welcome to Shivam Blog', slug: 'welcome', content: 'This is the first post!' },
      { title: 'Second Post', slug: 'second-post', content: 'This is another post.' }
    ]);
    console.log('✅ Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDatabase();
