const validateArticle = (req,res,next) => {
    const article = req.body
    console.log("ARTICLE > ", article)

    if(Object.keys(article).length == 0) {
        return res.status(400).json({
            error: "no content was sent in body"
        })
    }

    const isCreateRequest = req.method === 'POST'
    

    //Check title constraint when creating OR when aditing is on title
    if (isCreateRequest || (!isCreateRequest && article.title)) {
        //verify title is not null and it's length
        if(!article.title || article.title.length < 10) {
            return res.status(206).json({
                error : "Title must be at least 10 characters"
            })
        }
    }
    
    if (isCreateRequest || (!isCreateRequest && article.content)) {
        if (!article.content || article.content.length < 20) {
            return res.status(206).json({
                error : "Content must be at least 20 characters"
            })
        }
    }
    
    if (isCreateRequest || (!isCreateRequest && article.authorId)) {        
        if (!article.authorId || !Number.isInteger(article.authorId) /* typeof article.authorId !== 'number' */) {
            return res.status(206).json({
                error : "authorId must be a number"
            })
        }
    }

    next()
}

module.exports = validateArticle