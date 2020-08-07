const { generateQuery, asyncQuery } = require('../helper/queryHelp')

module.exports = {
    getProducts : async (req, res) =>{
        const {sort, order } = req.query
        console.log(sort)
        const getData = 'SELECT * FROM produk'
        try {
            
           if(sort) {
               const query = `SELECT * FROM produk order by'${sort} ${order}'`
               const result1 = await asyncQuery(query)
               return res.status(200).send(result1)
           }
           const result = await asyncQuery(getData)
            res.status(200).send(result)
        } catch (err) {
            res.status(500).send(err)
        }

    },
    getProductById : async (req, res) => {
        const id = req.params.id
        const getDataById = `SELECT * FROM produk WHERE id='${id}'`
        try {
            const result = await asyncQuery(getDataById)
            res.status(200).send(result[0])
        } catch (err) {
            res.status(500).send(err)
        }
    },
    addProduct : async (req, res) => {
        console.log('body : ', req.body)
        const { nama_produk, deskripsi, harga, stok } = req.body
        try {
            const insert = `INSERT INTO produk (nama_produk, deskripsi, harga, stok)
                            VALUES ('${nama_produk}', '${deskripsi}', ${harga}, ${stok})` 
            const result =  await asyncQuery(insert)

            res.status(200).send(result)
        } catch (err) {
            res.status(500).send(err)
        }
    },
    deleteProduct : async (req, res) => {
        console.log('params : ', req.params.id)
        const id = req.params.id
        try {
            // cek produk ada apa kaga
            const checkProduct = `SELECT * FROM produk WHERE id='${id}'`
            const result = await asyncQuery(checkProduct)
            if (result.length === 0) return res.status(400).send('product doesn\'t exist.')

            // delete produtnya
            const del = `DELETE FROM produk WHERE id='${id}'`
            const result1 = await asyncQuery(del)

            
            res.status(200).send('product deleted')
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    },
    editProduct : async (req, res) => {
        const id = parseInt(req.params.id)
        try {
            // cek produk ada ga di database
            const checkProduct = `SELECT * FROM produk WHERE id=${id}`
            const result = await asyncQuery(checkProduct)
            if (result.length === 0) return res.status(400).send('product does not exist')

            // baru di edit product
            const edit = `UPDATE produk SET ${generateQuery(req.body)} WHERE id=${id}`
            const result1 =  await asyncQuery(edit)

            res.status(200).send(result1)

        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    },
    getProductByPage : async (req, res) => {
        console.log('params : ', req.params)
        console.log(req.params.total)
        try {
            const query = `SELECT * from produk LIMIT ${req.params.total} OFFSET ${req.params.halaman}`
            const result = await asyncQuery(query)
            res.status(200).send(result)

        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }
}