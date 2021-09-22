const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { Payment } = require("../models/Payment");
const async = require('async');

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
    // 숍 
    cart: req.user.cart,
    history: req.user.history
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

    if (!user.able && user.status === "withdrawal")
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found!!",
      });

    if (user.able && user.status === "dormant")
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
    const { password, birthDay } = req.body;
    if (password && typeof password !== "string")
      return res.status(400).send({ err: "password are string" });

    if (birthDay && typeof birthDay !== "string")
      return res.status(400).send({ err: "birthDay are string" });

    let user = await User.findById(userId);
    if (password) user.password = password;
    if (birthDay) user.birthDay = birthDay;
    await user.save();
    return res.send({ user, success: true });

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
    if (user.token !== "") user.token = "";
    if (user.tokenExp !== "") user.tokenExp = "";
    await user.save();
    return res.send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

// 카드 관련 api
router.post("/addToCart", auth, (req, res) => {

  //먼저  User Collection에 해당 유저의 정보를 가져오기 
  // req.user === user
  User.findOne({ _id: req.user._id },
      (err, userInfo) => {

          // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인 

          let duplicate = false;
          userInfo.cart.forEach((item) => {
              if (item.id === req.body.productId) {
                  duplicate = true;
              }
          })

          //상품이 이미 있을때
          if (duplicate) {
              User.findOneAndUpdate(
                  { _id: req.user._id, "cart.id": req.body.productId },
                  { $inc: { "cart.$.quantity": 1 } },
                  // 옵션을 줘야 새 정보 받아옴
                  { new: true },
                  (err, userInfo) => {
                      if (err) return res.status(200).json({ success: false, err })
                      res.status(200).send(userInfo.cart)
                  }
              )
          }
          //상품이 이미 있지 않을때 
          else {
              User.findOneAndUpdate(
                  { _id: req.user._id },
                  {
                      $push: {
                          cart: {
                              id: req.body.productId,
                              quantity: 1,
                              date: Date.now()
                          }
                      }
                  },
                  { new: true },
                  (err, userInfo) => {
                      if (err) return res.status(400).json({ success: false, err })
                      res.status(200).send(userInfo.cart)
                  }
              )
          }
      })
});

router.get('/removeFromCart', auth, (req, res) => {

  //먼저 cart안에 내가 지우려고 한 상품을 지워주기 
  User.findOneAndUpdate(
      { _id: req.user._id },
      {
          "$pull":
              { "cart": { "id": req.query.id } }
      },
      { new: true },
      (err, userInfo) => {
          let cart = userInfo.cart;
          let array = cart.map(item => {
              return item.id
          })

          //product collection에서  현재 남아있는 상품들의 정보를 가져오기 

          //productIds = ['5e8961794be6d81ce2b94752', '5e8960d721e2ca1cb3e30de4'] 이런식으로 바꿔주기
          Product.find({ _id: { $in: array } })
              .populate('writer')
              .exec((err, productInfo) => {
                  return res.status(200).json({
                      productInfo,
                      cart
                  })
              })
      }
  )
})



router.post('/successBuy', auth, (req, res) => {


  //1. User Collection 안에  History 필드 안에  간단한 결제 정보 넣어주기
  let history = [];
  let transactionData = {};

  req.body.cartDetail.forEach((item) => {
      history.push({
          dateOfPurchase: Date.now(),
          name: item.title,
          id: item._id,
          price: item.price,
          quantity: item.quantity,
          paymentId: req.body.paymentData.paymentID
      })
  })

  //2. Payment Collection 안에  자세한 결제 정보들 넣어주기 
  transactionData.user = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
  }

  transactionData.data = req.body.paymentData
  transactionData.product = history

  //history 정보 저장 
  User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { history: history }, $set: { cart: [] } },
      { new: true },
      (err, user) => {
          if (err) return res.json({ success: false, err })


          //payment에다가  transactionData정보 저장 
          const payment = new Payment(transactionData)
          payment.save((err, doc) => {
              if (err) return res.json({ success: false, err })


              //3. Product Collection 안에 있는 sold 필드 정보 업데이트 시켜주기 


              //상품 당 몇개의 quantity를 샀는지 

              let products = [];
              doc.product.forEach(item => {
                  products.push({ id: item.id, quantity: item.quantity })
              })


              async.eachSeries(products, (item, callback) => {

                  Product.update(
                      { _id: item.id },
                      {
                          $inc: {
                              "sold": item.quantity
                          }
                      },
                      { new: false },
                      callback
                  )
              }, (err) => {
                  if (err) return res.status(400).json({ success: false, err })
                  res.status(200).json({
                      success: true,
                      cart: user.cart,
                      cartDetail: []
                  })
              }
              )
          })
      }
  )
})


module.exports = router;
