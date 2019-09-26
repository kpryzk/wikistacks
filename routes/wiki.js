const express = require('express');
const router = express.Router();
const {addPage} = require('../views')
const { Page } = require('../models');


router.get('/', (req, res, next) => {
  res.send('retrieve all wiki pages')
})

router.post('/', async (req, res, next) => {
  // res.json(req.body)
  const page = new Page ({
    title: req.body.title,
    content: req.body.content,
    slug: String.replace(' ', req.body.title)
  })

  try {
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error)
  }
})

router.get('/add', (req, res, next) => {
  res.send(addPage())
})

module.exports = router;
