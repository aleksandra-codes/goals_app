var db = require("../models");

exports.getGoals = function (req, res) {
  db.Goal.find()
    .then(function (todos) {
      res.json(todos);
    })
    .catch(function (err) {
      res.send(err);
    });
};

exports.createGoal = function (req, res) {
  db.Goal.create(req.body)
    .then(function (newGoal) {
      console.log(newGoal);
      res.status(201).json(newGoal);
    })
    .catch(function (err) {
      res.send(err);
    });
};

exports.findGoal = function (req, res) {
  db.Goal.findById(req.params.goalId)
    .then(function (foundGaol) {
      res.json(foundGaol);
    })
    .catch(function (err) {
      res.send(err);
    });
};

exports.updateGoal = function (req, res) {
  db.Goal.findOneAndUpdate({ _id: req.params.goalId }, req.body, { new: true })
    .then(function (goal) {
      res.json(goal);
    })
    .catch(function (err) {
      res.send(err);
    });
};

exports.deleteGoal = function (req, res) {
  db.Goal.remove({ _id: req.params.goalId })
    .then(function () {
      res.json({ message: "It was deleted" });
    })
    .catch(function (err) {
      res.send(err);
    });
};



module.exports = exports;
