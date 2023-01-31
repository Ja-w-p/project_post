const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    minlength: 6,
    maxlength: 50,
    required: true,
  },
  ID: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  role: {
    type: String,
    default: "user",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  postCount: {
    type: Number,
    default: 0,
  },
  favorite: {
    type: [String],
    default: [],
  },
});

userSchema.methods.isAdmin = function () {
  return this.role == "admin";
};

//middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  }
  return next();
});
//使用者登入輸入的密碼
userSchema.methods.comparePassword = function (password, cb) {
  //(使用者登入輸入的密碼,儲存在資料庫已加密的密碼)
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err, isMatch);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
