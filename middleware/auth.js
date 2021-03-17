const { Actor } = require("../models/Actor");

let auth = (req, res, next) => {
  let token = req.cookies.auth;

  Actor.findByToken(token, (err, actor) => {
    if (err) throw err;
    if (!actor)
      return res.json({
        isAuth: false,
        error: true,
      });

    req.token = token;
    req.actor = actor;
    next();
  });
};

module.exports = { auth };
