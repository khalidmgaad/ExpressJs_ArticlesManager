const router = require('express').Router();

const articleRouter = require('./articles.router');
const notFoundRouter = require('./notfound.router');

router.use('/articles', articleRouter)
router.use('*', notFoundRouter)

module.exports = router