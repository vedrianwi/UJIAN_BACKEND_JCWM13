const router = require('express').Router()

const {productCategoryController} = require('../controllers')

router.get('/produk-kategori/get', productCategoryController.getProductsCategory)
router.get('/produk-kategori/get/:id', productCategoryController.getProductCategoryByID)
router.post('/produk-kategori/add',productCategoryController.addProductCategory)
router.delete('/produk-kategori/delete/:id', productCategoryController.deleteProductCategory)
router.patch('/produk-kategori/edit/:id', productCategoryController.editCategory)
module.exports = router