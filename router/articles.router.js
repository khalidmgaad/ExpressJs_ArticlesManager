const articleRouter = require('express').Router();
const validateArticle = require('../middlewares/validateArticle');
const articleValidator = require('../middlewares/validateArticle');

const listArticles = [
    {
        id: 1,
        title: "Understanding JavaScript Closures",
        content: "Closures are an important concept in JavaScript that allow functions to access variables from an enclosing scope...",
        authorId: 1,
        createdAt: "03/10/2024"
    },
    {
        id: 2,
        title: "A Guide to Express.js Middleware",
        content: "Middleware functions are a powerful feature of Express.js. They allow you to execute code, modify requests and responses...",
        authorId: 2,
        createdAt: "03/11/2024"
    },
    {
        id: 3,
        title: "Exploring Node.js Streams",
        content: "Streams are a core feature of Node.js that enable you to work with large amounts of data efficiently...",
        authorId: 3,
        createdAt: "03/12/2024"
    },
    {
        id: 4,
        title: "Getting Started with MongoDB",
        content: "MongoDB is a NoSQL database that stores data in JSON-like documents. It's highly flexible and scalable...",
        authorId: 4,
        createdAt: "03/13/2024"
    },
    {
        id: 5,
        title: "Introduction to Asynchronous Programming in JavaScript",
        content: "Asynchronous programming allows JavaScript to perform non-blocking operations using callbacks, promises, or async/await...",
        authorId: 5,
        createdAt: "03/14/2024"
    }
];

//get articles
articleRouter.get('/', (req,res) => {
    
    res.status(200).json({
        articles: listArticles
    })

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
})
//create article
articleRouter.post('/', articleValidator, (req,res) => {

    const article = req.body

    listArticles.push({
        id: listArticles.length,
        ...article,
        createdAt: new Date()
    })

    
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

