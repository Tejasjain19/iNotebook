const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://tejas:tejas@cluster0.k3ifoeo.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    // Additional code or operations after successful connection
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}
connectToDatabase();