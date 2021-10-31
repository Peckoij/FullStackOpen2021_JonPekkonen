const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    /*
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        }).catch(error => next(error))
        */
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})


blogsRouter.post('/', middleware.userExtractor, async (request, response,) => {
    const body = request.body
    const decodedUser = request.user 
    // Token check
    //  const token = getTokenFrom(request)
    // console.log("New BLOG posting");
    // console.log(body);
    const user = await User.findById(decodedUser.id)
    //console.log(body);
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    //console.log(blog);
    await User.findByIdAndUpdate(user._id, user)
    response.json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res,) => {
    /* const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
    } */
    //console.log(decodedToken);
    const user = req.user 
    const blog = await Blog.findById(req.params.id).populate('user')
    if (!blog) {
        return res.status(401).json({ error: 'Blog is already removed' })
    }
    //console.log(blog);
     //await User.findById(decodedToken.id)
    if (!blog.user) {
        return res.status(401).json({ error: 'Blog has no authorized user' })
    }
    if (blog.user._id.toString() === user.id) {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } else {
        return res.status(401).json({ error: 'Unauthorized or wrong user' })
    }

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