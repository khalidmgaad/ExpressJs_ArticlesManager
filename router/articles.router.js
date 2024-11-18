const articleRouter = require('express').Router();
const validateArticle = require('../middlewares/validateArticle');
const articleValidator = require('../middlewares/validateArticle');
const listArticles = require('../datas/articles')
const fileManager = require('../utils/fileHandler')

//get articles
articleRouter.get('/', (req,res) => {

    res.status(200).json({
        articles: listArticles
    })
    
    //res.render('articles', {articles: listArticles})

})

//get article with id
articleRouter.get('/:id', (req,res) => {
    const id = parseInt(req.params.id)

    const article = listArticles.find(art => art.id === id)

    if (!article) {
        return res.status(404).json({
            error: "article not found"
        })
    }

    res.status(202).json({
        article
    })

    //res.render('article', article)
})

//create article
articleRouter.post('/', articleValidator, (req,res) => {

    const article = req.body

    listArticles.push({
        id: listArticles.length,
        ...article,
        createdAt: new Date()
    })

    console.log("write updates array to data file");
    
    fileManager.writeToDataFile('./datas/articles.json', listArticles)

    res.status(200).json({
        message: "Article has been added!",
        article: listArticles[listArticles.length-1]
    })

    
})

//update article
articleRouter.put('/:id',validateArticle, (req,res) => {

    const id = parseInt(req.params.id)
    const {...articleInfo} = req.body

    const article = listArticles.find(art => art.id === id)

    if (!article) {
        return res.status(404).json({message: "Article not found"})
    }

    Object.keys(articleInfo).forEach(key => {
        article[key] = articleInfo[key]
    })

    article.lastEdit = new Date()

    res.status(200).json({
        message: "Article updated successfuly!",
        article
    })

})

//delete article
articleRouter.delete('/:id', (req,res) => {

    const id = parseInt(req.params.id)
    const {...articleInfo} = req.body

    const articleIndex = listArticles.findIndex(art => art.id === id)

    if (!articleIndex) {
        return res.status(404).json({message: "Article not found"})
    }

    listArticles.splice(articleIndex, 1)

    res.status(200).json({
        message: "Article deleted successfuly!",
        articles: listArticles
    })

})

module.exports = articleRouter

