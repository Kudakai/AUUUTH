const express = require('express')
const pageControllers = require('../controllers/pageControllers')
const authControllers = require('../controllers/authControllers')
const authMiddleware = require('../middleware/authMiddleware')



const router = express.Router();

router.get('*', authMiddleware.checkUser);

router.get("/signup", authControllers.getSighUp)

router.post("/signup", authControllers.postSighUp)

router.get("/login", authControllers.getLogIn)

router.post("/login", authControllers.postLogIn)

router.get("/", pageControllers.getMainPage)

router.get('/smoothies', authMiddleware.requireAuth, pageControllers.getRecipesPage)

router.get("/logout", authControllers.getLogout)



module.exports = router;