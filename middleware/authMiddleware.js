const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const User = require('../models/User');

const requireAuth = function (req, res, next) {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, "hello this is a secret signature", (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.redirect("/login")
            } else {
                next()
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

const checkUser = function (req, res, next) {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, "hello this is a secret signature", async (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.locals.user = null
                next()
            } else {
                console.log(decodedToken)
                const user = await User.findById(decodedToken.id)
                res.locals.user = user;
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }