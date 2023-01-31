const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const postRoute = require("./routes").post;
const passport = require("passport");
///config/passport exports了一個function 所以直接放入他需要的passport
require("./config/passport")(passport);
const cors = require("cors");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("Connect to MongoDB.");
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); //一定要放在route上面
app.use("/api/user", authRoute); //"/api"<-之後跟前端(react)整合時，有加這個會比較方便
app.use(
  "/api/board",
  passport.authenticate("jwt", {
    session: false,
  }),
  postRoute
);

//第一個"/api/user"不用驗證是因為任何人都能來註冊/登入使用
//第二個就限制使用者才能看

app.get("/", (req, res) => {
  res.send("port8080");
});

app.listen(8080, () => {
  console.log("Server is running on port8080.");
});
