const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
  console.log("MongoDB connected");
});

mongoose.connection.on('error', err => {
  console.error(err);
});

app.use('/', userRoutes);

const PORT = 8081;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);