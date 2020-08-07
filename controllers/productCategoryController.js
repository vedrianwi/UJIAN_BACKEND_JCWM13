const { generateQuery, asyncQuery } = require('../helper/queryHelp')

module.exports = {
    getProductsCategory: async (req, res) => {
        const getData = 'SELECT * FROM product_category_details'
        try {
            const result = await asyncQuery(getData)
            // console.log(result)
            res.status(200).send(result)
        } catch (err) {
            res.status(500).send(err)
        }
    },
    getProductCategoryByID: async (req, res) => {
        const getDataById = `SELECT * FROM product_category_details WHERE id=${parseInt(req.params.id)}`
        try {
            const result = await asyncQuery(getDataById)
            res.status(200).send(result[0])
        } catch (err) {
            res.status(500).send(err)
        }
    },
    addProductCategory: async (req, res) => {
        console.log('body : ', req.body)
        const { product_id, category_id } = req.body
        try {
            // get parent category_id
            const getCategoryId = `WITH RECURSIVE category_path (id, kategori, parent_id) AS
                                (
                                    SELECT id, kategori, parent_id
                                        FROM kategori
                                        WHERE id = ${category_id} -- child node
                                    UNION ALL
                                    SELECT c.id, c.kategori, c.parent_id
                                        FROM category_path AS cp JOIN kategori AS c
                                        ON cp.parent_id = c.id
                                )
                                SELECT id FROM category_path;`
            const categoryId = await asyncQuery(getCategoryId)

            // insert query
            let value = ''
            categoryId.forEach(item => value += `(${product_id}, ${item.id}),`)
            const insertQuery = `INSERT INTO pro_kat (produk_id, kategori_id)
                                VALUES ${value.slice(0, -1)}`
            console.log(insertQuery)
            const result = await asyncQuery(insertQuery)

            // sent response to client
            res.status(200).send(result)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    },
    deleteProductCategory: async (req, res) => {
        console.log('params : ', req.params)
        const id = parseInt(req.params.id)
        try {
            const del = `DELETE FROM pro_kat WHERE produk_id = ${id}`
            const result = await asyncQuery(del)

            res.status(200).send(result)

        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    },
    editCategory : async (req, res) => {
            const id = parseInt(req.params.id)
            const {kategori_id} = req.body
            const edit = `UPDATE pro_kat SET ${generateQuery(kategori_id)} WHERE id = ${id}`
            try {
                const result = await asyncQuery(edit)
                res.status(200).send(result)
            } catch (err) {
                console.log(err)
                res.status(500).send(err)
            }
    }
}