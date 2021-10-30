const logger = require('./logger')

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
    }
    next(error)
}

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    if(request.body.length>0){logger.info('Body:  ', request.body)}
    logger.info('---')
    next()
  }

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
  }