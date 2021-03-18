const express = require("express");
const router = express.Router(); //router의 컴포넌트화 ? = 클래스 모듈화
const { Actor } = require("../models/Actor");
const { auth } = require("../middleware/auth");

// actor

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.actor._id,
    isAdmin: req.actor.role === 0 ? false : true,
    isAuth: true,
    email: req.actor.email,
    name: req.actor.name,
    role: req.actor.role,
    image: req.actor.image,
  });
});

router.get("/logout", auth, (req, res) => {
  Actor.findOneAndUpdate(
    { _id: req.actor._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ 로그아웃: false, err });
      return res.status(200).send({
        로그아웃: "성공",
      });
    }
  );
});

router.post("/login", (req, res) => {
  Actor.findOne({ email: req.body.email }, (err, actor) => {
    if (err) return res.send("에러입니다");
    if (!actor)
      return res.json({
        로그인: "실패",
        메시지: "auth failed, email not found",
      });
    actor.genToken((err, actor) => {
      if (err) return res.status(400).send(err);
      res.cookie("authExp", actor.tokenExp);
      res.cookie("auth", actor.token).status(200).json({
        로그인: "성공",
        아이디: actor._id,
      });
    });
  });
});

router.post("/register", (req, res) => {
  //생성할떄 레지스터 db생김
  const actor = new Actor(req.body);

  actor.save((err, doc) => {
    if (err) return res.json({ 생성: false, err });
    return res.status(200).json({
      생성: true,
    });
  });
});

module.exports = router;
