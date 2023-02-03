const router = require("express").Router();
const Post = require("../models").postModel;
const User = require("../models").userModel;
const Reply = require("../models").replyModel;
const postValidation = require("../validation").postValidation;
const replyValidation = require("../validation").replyValidation;
const passport = require("passport");
require("../config/passport")(passport);

router.use((req, res, next) => {
  console.log("A request is coming into api...");
  next();
});

let category = ["game", "food", "holo"];

category.forEach((Element) => {
  router.get("/" + Element, (req, res) => {
    Post.find({ category: Element })
      .then((data) => {
        res.send(data);
      })
      .catch(() => {
        res.status(400).send("Cannot get the data.");
      });
  });
});

router.get("/profile/:ID", (req, res) => {
  let { ID } = req.params;
  Post.find({ auther: ID })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.send("Cannot get the page.");
    });
});

router.get("/essay/:_id", (req, res) => {
  let { _id } = req.params;
  Post.findById({ _id })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(404).send("Cannot find the post.");
    });
});

router.post("/postessay", async (req, res) => {
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { title, category, content } = req.body;
  let newPost = new Post({
    title,
    category,
    content,
    auther: req.user.ID,
    owner: req.user._id,
  });
  try {
    await newPost.save();
    res.status(200).send("New post has been saved.");
  } catch (err) {
    console.log(err);
    res.status(400).send("Cannot save the post.");
  }
});

router.post("/essay/:_id", async (req, res) => {
  const { error } = replyValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let replyTo = req.params._id;
  let { view, comment } = req.body;
  let newReply = new Reply({
    name: req.user.ID,
    view,
    comment,
    replyTo,
  });

  Post.findOne({ _id: replyTo })
    .then(async (data) => {
      data.reply.push(newReply);
      try {
        await data.save();
        res.status(200).send("New comment has been saved.");
      } catch (err) {
        res.status(400).send("Cannot save the comment.");
        console.log(err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.patch("/essay/:_id", async (req, res) => {
  const { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  let post = await Post.findOne({ _id });
  if (!post) {
    res.status(400);
    return res.json({
      success: false,
      message: "Post not found",
    });
  }
  if (post.auther === req.user.ID || req.user.isAdmin()) {
    Post.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then(() => {
        console.log(req.body);
        res.send("Post updated.");
      })
      .catch((error) => {
        res.send({
          success: false,
          message: error,
        });
      });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message: "Only the auther of this post or admin can edit this post.",
    });
  }
});

router.delete("/essay/:_id", async (req, res) => {
  let { _id } = req.params;
  let post = await Post.findOne({ _id });
  if (!post) {
    res.status(400);
    return res.json({
      success: false,
      message: "Post not found",
    });
  }
  if (post.auther === req.user.ID || req.user.isAdmin()) {
    Post.deleteOne({ _id })
      .then(() => {
        res.send("Post deleted.");
      })
      .catch((error) => {
        res.send({
          success: false,
          message: error,
        });
      });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message: "Only the auther of this post or admin can delete this post.",
    });
  }
});

router.get("/search/:board/:keyword", async (req, res) => {
  let { board, keyword } = req.params;
  function setNext(pat) {
    const next = [0];
    let i = 1;
    while (i < pat.length) {
      if (pat[i] === pat[next[i - 1]]) {
        next.push(next[i - 1] + 1);
        i++;
      } else if (next[i - 1] !== 0 && pat[i] === pat[0]) {
        next.push(1);
        i++;
      } else {
        next.push(0);
        i++;
      }
    }

    return next;
  }

  function KMP(mainString, pat) {
    let next = setNext(pat);
    let i = 0,
      j = 0;
    while (i < mainString.length && j < pat.length) {
      if (mainString[i] === pat[j]) {
        i++;
        j++;
      } else if (j === 0) {
        i++;
      } else {
        j = next[j - 1];
      }
    }
    if (j === pat.length) {
      return true;
    } else {
      return false;
    }
  }
  Post.find({ category: board })
    .then((data) => {
      let result = [];
      data.map((item) => {
        if (KMP(item.title, keyword)) {
          result.push(item);
        }
      });
      res.send(result);
    })
    .catch(() => {
      res.status(400).send("Not found");
    });
});

router.get("/mostpopular", (req, res) => {
  Post.find()
    .then((data) => {
      let list = [];
      data.map((d) => {
        list.push(d);
      });

      function merge(arr1, arr2) {
        let result = [];
        let i = 0,
          j = 0;
        while (i < arr1.length && j < arr2.length) {
          if (arr1[i].reply.length < arr2[j].reply.length) {
            result.push(arr2[j]);
            j++;
          } else {
            result.push(arr1[i]);
            i++;
          }
        }
        while (i < arr1.length) {
          result.push(arr1[i]);
          i++;
        }
        while (j < arr2.length) {
          result.push(arr2[j]);
          j++;
        }
        return result;
      }
      function mergeSort(arr) {
        if (arr.length === 1) {
          return arr;
        } else {
          let middle = Math.floor(arr.length / 2);
          let right = arr.slice(0, middle);
          let left = arr.slice(middle, arr.length);
          return merge(mergeSort(right), mergeSort(left));
        }
      }
      list = mergeSort(list);
      list = list.slice(0, 10);

      res.send(list);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.delete("/account/:_id", (req, res) => {
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
