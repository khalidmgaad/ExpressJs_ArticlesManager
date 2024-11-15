const router = require('express').Router();
const articlesList = require('../datas/articles')
const authorsList = require('../datas/authors')

router.get('/:id', (req,res) => {

    const id = parseInt(req.params.id)

    const author = authorsList.find(aut => aut.id === id)
    
    if (!author){
        return res.status(404).json({
            error: `No author with ID: ${id} was found`
        })
    }
    
    const authorArticles = articlesList.filter(art => art.authorId === id)

    if (!authorArticles || authorArticles.length == 0) {
        return res.status(404).json({
            message: `author with ID ${author.id} has no articles`
        })
    }

    res.status(200).json({
        articles : authorArticles
    })

})

module.exports = router