const jwt = require('jsonwebtoken')

exports.requireLogin = (req, res, next) => {

    if(req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
    } else {
        return res.status(400).json({ message: 'Authorization required'})
    }

    next();
}

exports.middlewareForUsers = (req, res, next) => {
    if(req.user.role !== 'user') {
        return res.status(400).json({ message: 'User only!' })
    }
    
    next()
}

exports.middlewareForAdmin = (req, res, next) => {
    if(req.user.role !== 'admin') {
        return res.status(400).json({ message: 'Need admin privilege!' })
    }
    
    next()
}