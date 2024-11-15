const notFoundRouter = require('express').Router();


notFoundRouter.all('/', (req,res) => {
    // res.status(404).json({
    //     error: "No content found"
    // })
    res.render('notfound')
})

module.exports = notFoundRouter