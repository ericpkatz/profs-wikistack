const express = require("express");
const router = express.Router();
const { Page, User } = require("../models");
const { userList, userPages } = require("../views");

// GET /users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

// GET /users/:id
router.get("/:id", async (req, res, next) => {
  try {
    /*
    const user = await User.findByPk(req.params.userId);
    const pages = await Page.findAll({
      where: {
        authorId: req.params.userId
      }
    });
    const [user, pages] = await Promise.all([
      User.findByPk(req.params.userId),//promise 1
      Page.findAll({
        where: {
          authorId: req.params.userId
        }
      })//promise2
    ]);
    */
    const user = await User.findByPk(
      req.params.id,
      {
        include: [
          Page
        ]
      }
    );
    const pages = user.pages;

    res.send(userPages(user, pages));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
