const router = require('express').Router()

const {userController} = require('../controllers')

router.post('/user/login', userController.login)
router.post('/user/register', userController.register)
router.patch('/user/active/:id',userController.activeAccount)
router.patch('/user/deactive/:id', userController.deactiveAccount)
router.patch('/user/close/:id', userController.closeAccount)

module.exports = router