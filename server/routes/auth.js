const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");

//middleware
router.use((req, res, next) => {
  console.log("A request is coming in to auth.js.");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working.",
  };
  return res.json(msgObj);
});

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const IDExist = await User.findOne({ ID: req.body.ID });
  if (IDExist) return res.status(400).send("此ID已有人使用。");
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("該email已被註冊。");

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    ID: req.body.ID,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).send({
      msg: "success",
      savedObject: savedUser,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) res.status(400).send(err);
    if (!user) {
      res.status(401).send("User not found.");
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return res.status(400).send(err);
        if (isMatch) {
          const tokenObject = { _id: user._id, email: user.email };
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
          res.send({ success: true, token: "JWT " + token, user });
        } else {
          console.log(err);
          res.status(401).send("Wrong password or email.");
        }
      });
    }
  });
});

module.exports = router;
