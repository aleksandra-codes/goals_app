var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://sasha30stm:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.leqa1.mongodb.net/goalsDB?retryWrites=true&w=majority"
);

mongoose.Promise = Promise;

module.exports.Goal = require("./goal");