const router = require('express').Router();

const articleRouter = require('./articles.router');
const authorRouter = require('./authors.router');
const notFoundRouter = require('./notfound.router');
const authorArticlesRouter = require('./authorArticles.router')

router.use('/articles', articleRouter)
router.use('/authors', authorRouter)
router.use('/authorArticles', authorArticlesRouter)
router.use('*', notFoundRouter)

module.exports = router