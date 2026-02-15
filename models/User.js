const mongoose = require('mongoose');

// Regex patterns
const cityRegex = /^[A-Za-z\s]+$/;
const zipRegex = /^\d{5}-\d{4}$/;
const phoneRegex = /^\d-\d{3}-\d{3}-\d{4}$/;
const urlRegex = /^https?:\/\/.+/;

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  suite: { type: String, required: true },

  city: {
    type: String,
    required: true,
    match: [cityRegex, "City must contain only letters and spaces"]
  },

  zipcode: {
    type: String,
    required: true,
    match: [zipRegex, "Zip code must be in format 12345-1234"]
  }
});

const userSchema = new mongoose.Schema({

  name: { type: String, required: true },

  username: {
    type: String,
    required: true,
    minlength: [4, "Username must be at least 4 characters"],
    maxlength: [100, "Username cannot exceed 100 characters"]
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Invalid email format"]
  },

  address: {
    type: addressSchema,
    required: true
  },

  phone: {
    type: String,
    required: true,
    match: [phoneRegex, "Phone must be in format 1-123-123-1234"]
  },

  website: {
    type: String,
    required: true,
    match: [urlRegex, "Website must start with http or https"]
  }

});

module.exports = mongoose.model("User", userSchema);