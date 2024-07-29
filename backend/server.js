const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('./middleware'); 
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://zahra:zahra030702@cluster0.e6d8kvo.mongodb.net/session?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model('User', UserSchema);

app.post('/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to create user' });
  }
});

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
  
      // Check if password matches
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret');
      
      // Send success response with token
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error); // Log server-side errors
      res.status(500).json({ error: 'Failed to login' });
    }
  });
  

app.get('/protected/route', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

app.listen(6500, () => console.log("Server is running on port 6500"));
