const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },

    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120
    },

    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"]
    },

    department: {
      type: String,
      required: true,
      trim: true
    },

    level: {
      type: Number,
      required: true,
      enum: [100, 200, 300, 400, 500, 600]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", studentSchema);