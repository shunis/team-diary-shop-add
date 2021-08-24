const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const { mongoose, isValidObjectId } = require("mongoose");

//* auth 정보
router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  });
});

//* 전체 user 조회
router.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    return res.send({ users: users });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

//* 특정 user 조회
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!isValidObjectId(userId))
      return res.status(400).send({ err: "invalid userId" });
    const user = await User.findOne({ _id: userId });
    return res.send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});
//?  isValidObjectId(): 유요한 id인지 검증하는 mongoose 내장 메소드

//* 회원가입
router.post("/register", (req, res) => {
  try {
    const user = new User(req.body);

    if (!user.email || !user.name)
      return res.status(400).send({ err: "Both email and name are required!" });

    user.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

//* 로그인
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found!",
      });

    if (!user.able && !user.status === "active")
      return res.json({
        loginSuccess: false,
        message: "Withdrawal user!",
      });

    if (user.able && user.status === "Dormant")
      return res.json({
        loginSuccess: false,
        message: "Dormant user!",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password!" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

//* logout
router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

//* 특정 user 수정
router.put("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!isValidObjectId(userId))
      return res.status(400).send({ err: "invalid userId" });
    const { name } = req.body;
    if (name && typeof name !== "string")
      return res.status(400).send({ err: "name are string" });

    let user = await User.findById(userId);
    if (name) user.name = name;
    await user.save();
    return res.send({ user });

    // let updateBody = {};
    // if (name) updateBody.name = name;

    // const user = await User.findByIdAndUpdate(userId, updateBody, {
    //   new: true,
    // });
    //? 위에 주석부분 처럼 mongoDB 내장 메소드 findByIdAndUpdate로 바로 수정할 수 있지만
    //? {name {firstName: '', lastName: ''}} 이렇게 들어가는 경우에 firstName과 lastName이 모두 있는지 검사를 하지 않음
    //? 그래서 findById 먼저하고 해당 값을 찾은 다음 req.body로 입력받은 값을 save하는 방식 사용
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

//* 특정 user 삭제
router.delete("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!isValidObjectId(userId))
      return res.status(400).send({ err: "invalid userId" });
    const user = await User.findById(userId);
    if (user.able) user.able = false;
    if (user.status === "active") user.status = "withdrawal";
    await user.save()
    return res.send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

module.exports = router;
