var mongoose = require("mongoose");

var goalSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: "Goal cannot be blank!",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  current: {
    type: Boolean,
    default: false,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  completed_date: {
    type: Date | null,
  },
});

var Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
