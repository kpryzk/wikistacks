const express = require('express');
const router = express.Router();
const { addPage } = require('../views');
const { Page, User } = require('../models');
const wikipage = require('../views/wikipage');
const main = require('../views/main');
const editPage = require('../views/editPage')

router.get('/', async (req, res, next) => {
  try {
    const allPages = await Page.findAll();
    res.send(main(allPages));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const [ourAuthor, wasCreated] = await User.findOrCreate({
      where: { name: req.body.name, email: req.body.email },
    });
    const page = await Page.create(req.body);
    page.setAuthor(ourAuthor);
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  try {
    res.send(addPage());
  } catch (error) {
    next(error);
  }
});

router.get('/:slug/edit', async (req, res, next) => {
  try {
    const ourPage = await Page.findOne({
      where: { slug: req.params.slug },
    });
    const user = await User.findOne({
      where: {
        id: ourPage.authorId,
      },
    });
    res.send(editPage(ourPage, user));
  } catch (error) {
    next(error)
  }
})

router.get('/:slug', async (req, res, next) => {
  try {
    const ourPage = await Page.findOne({
      where: { slug: req.params.slug },
    });
    const user = await User.findOne({
      where: {
        id: ourPage.authorId,
      },
    });
    res.send(wikipage(ourPage, user));
  } catch (error) {
    res.status(404).send('Sorry, page not found!')
  }
});



module.exports = router;
