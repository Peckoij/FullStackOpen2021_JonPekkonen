const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')




const url = config.MONGODB_URI

logger.info('connecting to', url)
mongoose.connect(url)
    .then(result => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.info('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
// blogs router
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

//const Blog = mongoose.model('Blog', blogSchema)

//const mongoUrl = config.MONGODB_URI
//mongoose.connect(mongoUrl)

module.exports = app