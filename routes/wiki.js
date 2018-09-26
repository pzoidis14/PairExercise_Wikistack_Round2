const express = require("express");
const router = express.Router();
const {Page} = require('../models')
const { addPage } = require("../views"); // <--- will link to index.js in views folder
const { wikiPage } = require("../views");
const {main} = require("../views")

router.get('/', async (req, res, next) => {
  try{
    const pages = await Page.findAll()
    console.log(pages)
    res.send(main(pages))
  } catch(err){
    res.send(next(err))
  }
})


router.get('/add', (req, res, next) => {
  try{
    res.send(addPage())
  } catch(err){
    res.send(next(err))
  }
})

router.get('/:slug', async (req, res, next) => {
  try {
    const page = Page.findOne({
      where: {slug: req.params.slug}
    })
    res.send(wikiPage(page))
  } catch (err) {
    res.send(next(err))}
});



router.post('/', async (req, res, next) => {
  const namePost = req.body.name;
  const emailPost = req.body.email
  const titlePost = req.body.title;
  const contentPost = req.body.content;

  const page = new Page({
    title: titlePost,
    content: contentPost
  });

  try {
    await page.save();
    res.redirect(page.slug);
  } catch(err){
    res.send(next(err));
  }
})

router.put('/:id', (req, res, next) => {
  try{
    res.send('this will update a specific page in the db')
  } catch(err){
    res.send(next(err))
  }
})

router.delete('/:id', (req, res, next) => {
  try{
    res.send('this will delete a specific page in the db')
  } catch(err){
    res.send(next(err))
  }
})

module.exports = router;
