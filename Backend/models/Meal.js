const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MealSchema = new Schema({
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"]
  },
  bmi: {
    type: Number,
    required: true
  },
  activityLevel: {
    type: String,
    required: true,
    enum: ["sedentary", "lightly_active", "moderately_active", "very_active"]
  },
  goal: {
    type: String,
    required: true,
    enum: ["weight_loss", "muscle_gain", "maintenance", "performance_boost"]
  },
  dietType: {
    type: String,
    required: true,
    enum: ["vegetarian", "vegan", "keto", "paleo", "balanced"]
  },
  mealsPerDay: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Meal = mongoose.model("Meal", MealSchema);

module.exports = Meal;
