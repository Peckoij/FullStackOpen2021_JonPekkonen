const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    /*
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        }).catch(error => next(error))
        */
    const blogs = await Blog.find({})
    response.json(blogs)
})


blogsRouter.post('/', async (request, response,) => {
    const blog = new Blog(request.body)
    /*
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        }).catch(error => next(error))
    */
    const savedBlog = await blog.save()
    response.json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res,) => {
    /*
    Blog.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
        */
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

blogsRouter.put('/:id', async (req, res,) => {    
    const updatedBlog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    }

    await Blog.findByIdAndUpdate(req.params.id, updatedBlog)
})

module.exports = blogsRouter