var express = require("express");
var router = express.Router();
var db = require("../models");
var helpers = require("../helpers/goals");

router.route("/").get(helpers.getGoals).post(helpers.createGoal);

router
  .route("/:goalId")
  .get(helpers.findGoal)
  .put(helpers.updateGoal)
  .delete(helpers.deleteGoal);

module.exports = router;
