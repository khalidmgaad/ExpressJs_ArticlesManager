const authorRouter = require('express').Router();
const listAuthors = require('../datas/authors')

//get authors
authorRouter.get('/', (req,res) => {
    
    res.status(200).json({
        Authors: listAuthors
    })

})

//get author with id
authorRouter.get('/:id', (req,res) => {
    const id = parseInt(req.params.id)

    const author = listAuthors.find(aut => aut.id === id)

    if (!author) {
        return res.status(404).json({
            error: "author not found"
        })
    }

    res.status(202).json({
        author
    })

})
//create author
authorRouter.post('/', (req,res) => {

    const author = req.body

    listAuthors.push({
        id: listAuthors.length+1,
        ...author,
    })

    
    res.status(200).json({
        message: "author has been added!",
        author: listAuthors[listAuthors.length-1]
    })
})

//update author
authorRouter.put('/:id', (req,res) => {

    const id = parseInt(req.params.id)
    const {...authorInfo} = req.body

    const author = listAuthors.find(art => art.id === id)

    if (!author) {
        return res.status(404).json({message: "author not found"})
    }

    Object.keys(authorInfo).forEach(key => {
        author[key] = authorInfo[key]
    })

    res.status(200).json({
        message: "author updated successfuly!",
        author
    })

})

//delete author
authorRouter.delete('/:id', (req,res) => {

    const id = parseInt(req.params.id)
    const {...authorinfo} = req.body

    const authorIndex = listAuthors.findIndex(art => art.id === id)

    if (!authorIndex) {
        return res.status(404).json({message: "author not found"})
    }

    listAuthors.splice(authorIndex, 1)

    res.status(200).json({
        message: "author deleted successfuly!",
        authors: listAuthors
    })

})

module.exports = authorRouter

