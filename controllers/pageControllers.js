const mongoose = require('mongoose')



module.exports.getMainPage = function getMainPage(req, res) {
    res.render('home')
}

module.exports.getRecipesPage = function getMainPage(req, res) {
    res.render('smoothies')
}