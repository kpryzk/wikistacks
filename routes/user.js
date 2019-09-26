const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const userList = require('../views/userList');
const userPages = require('../views/userPages');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const userId = await User.findOne({
      where: { id: req.params.id },
    });

    const pages = await Page.findAll({
      where: { authorId: req.params.id },
    });
    res.send(userPages(userId, pages));
  } catch (error) {
    res.status(404).send('Sorry, page not found!')
  }
});
module.exports = router;
