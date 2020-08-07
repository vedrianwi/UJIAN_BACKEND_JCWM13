const router = require('express').Router()

const {productController} = require('../controllers')


router.get('/produk/get', productController.getProducts)
router.get('/produk/get/:id', productController.getProductById )
router.post('/produk/add', productController.addProduct)
router.delete('/produk/delete/:id', productController.deleteProduct)
router.patch('/produk/edit/:id', productController.editProduct)
router.get('/produk/get/page/:total/:halaman', productController.getProductByPage)
module.exports = router