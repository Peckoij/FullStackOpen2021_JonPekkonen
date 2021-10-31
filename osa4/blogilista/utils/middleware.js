const logger = require('./logger')
const jwt = require('jsonwebtoken')

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    logger.info("-------------- ERROR HAPPENED ---------------- ");
    logger.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.message === 'invalid token') {
        return res.status(401).json({ error: 'Invalid token' })
    } else if (error.message === 'jwt must be provided'){
        return res.status(401).json({ error: 'Missing token' })
    }
    next(error)
}

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    if (request.body.length > 0) { logger.info('Body:  ', request.body) }
    logger.info('---')
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        // console.log("Proper token");
        // console.log(authorization.substring(7));
        request.token = authorization.substring(7)
    }
    next()
}

const userExtractor = (request, response, next) => {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        } else {
            //console.log(decodedToken);
            const user = {
                username: decodedToken.username,
                id: decodedToken.id
            }
            request.user = user
        }
    
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}