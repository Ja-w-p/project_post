const router = require("express").Router();
const User = require("../models").userModel;
const changeEmailValidation = require("../validation").changeEmailValidation;
const passport = require("passport");
require("../config/passport")(passport);

router.use((req, res, next) => {
  console.log("A request comming into account-router...");
  next();
});

router.delete("/:_id", (req, res) => {
  let _id = req.params;
  let user_id = req.user._id.toString();
  let theUser = User.findById({ _id });
  if (!theUser) {
    res.status(400);
    return res.json({
      success: false,
      message: "User not found",
    });
  }
  if (_id._id === user_id || req.user.isAdmin())
    User.deleteOne({ _id })
      .then(() => {
        res.send("User deleted");
      })
      .catch((error) => {
        res.send({
          success: false,
          message: error,
        });
      });
});

router.patch("/email/:_id", (req, res) => {
  const { error } = changeEmailValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(error);
  let _id = req.params;
  console.log(_id);
  let user_id = req.user._id.toString();
  console.log(user_id);
  let theUser = User.findById({ _id });
  if (!theUser) {
    res.status(400);
    return res.json({
      success: false,
      message: "User not found",
    });
  }
  console.log(req.body);
  if (_id._id === user_id) {
    User.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then(() => {
        res.send("data updated");
      })
      .catch((error) => {
        res.send({
          success: false,
          message: error,
        });
      });
  } else {
    res.status(401);
    return res.json({
      success: false,
      message: "Unauthorized",
    });
  }
});

module.exports = router;
