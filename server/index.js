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
app.use("/api/user", authRoute);
app.use(
  "/api/board",
  passport.authenticate("jwt", {
    session: false,
  }),
  postRoute
);

app.get("/", (req, res) => {
  res.send("port8080");
});

app.listen(8080, () => {
  console.log("Server is running on port8080.");
});
