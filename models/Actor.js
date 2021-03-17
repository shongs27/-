const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); //비번 해쉬화
const saltRounds = 10; //비번 해쉬화 2
const jwt = require("jsonwebtoken"); // 토큰
const moment = require("moment");

const actorSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    // unique: 1,
  },
  password: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    //토큰 유효기간
    type: Number,
  },
});

actorSchema.methods.genToken = function (cb) {
  console.log("actor", this);

  const token = jwt.sign(this._id.toHexString(), "av");
  const oneHour = moment().add(1, "hour").valueOf();

  this.tokenExp = oneHour;
  this.token = token;
  this.save((err, actor) => {
    if (err) return cb(err);
    cb(null, actor);
  });
};

actorSchema.statics.findByToken = function (token, cb) {
  var ho = this;
  jwt.verify(token, "av", function (err, decode) {
    ho.findOne({ _id: decode, token: token }, function (err, actor) {
      if (err) return cb(err);
      cb(null, actor);
    });
  });
};

const Actor = mongoose.model("Actor", actorSchema);

module.exports = { Actor };
