const mongoose = require('mongoose')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

function handleErrors(err) {
    let errors = { email: "", password: "" }

    if (err.message === 'Incorrect email') {
        errors.email = "That email is not registered"
    }

    if (err.message === 'Incorrect password') {
        errors.password = "That password is incorrect"
    }


    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach((err) => {
            errors[err.properties.path] = err.properties.message

        })

    }

    if (err.code === 11000) {
        errors.email = "that email is already in use"
    }
    return errors
}

const maxAge = 3 * 24 * 60 * 60
const createToken = function (id) {
    return jwt.sign({ id }, "hello this is a secret signature", {
        expiresIn: maxAge
    })
}

module.exports.getSighUp = function (req, res) {
    res.render('signup')
}

module.exports.postSighUp = async function (req, res) {
    const { email, password } = req.body

    try {
        const user = await User.create({ email, password })
        const token = createToken(user._id)
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id })
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.getLogIn = function (req, res) {
    res.render("login")
}


module.exports.postLogIn = async function (req, res) {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id })
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors: errors })

    }

}

module.exports.getLogout = function (req, res) {
    res.cookie("jwt", "", { maxAge: 1000 })
    res.redirect("/")
}