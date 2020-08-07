const database = require('../database')
const { generateQuery, asyncQuery } = require('../helper/queryHelp')


module.exports = {
    login: async (req, res) => {
        console.log('req : ', req.body)
        const {username, password} = req.body
       try {
        
        const checkUser = `SELECT * FROM users WHERE username = '${username}'`
        const result = await asyncQuery(checkUser)

        if (password !== result[0].password) {
            return res.status(500).send('wrong password')
        }

        if(result[0].status == 0) {
            return res.status(500).send('can not login, activate first')
        }

        if(result[0].status == 3) {
            return res.status(500).send('your acc, is closed! ')
        }


        delete result[0].password

        res.status(200).send(result[0])
       } catch (err) {
           console.log(err)
           res.status(500).send(err)
       }
    },
    register: async (req, res) => {
        console.log('req : ', req.body)
        const { username, email, password, confpassword } = req.body
        try {
        if (password !== confpassword) {
            return res.status(400).send('password doesn\'t match.')
         }

         const insertData = `INSERT INTO users (username, password, email, role,status) 
         values ('${username}', '${password}', '${email}', 'user', 0)`
         
         const result = await asyncQuery(insertData)

         res.status(200).send(result)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    },
    activeAccount : async (req, res) => {
        console.log('params : ', req.params.id)
        const id = req.params.id

        try { 
            
        const checkUser = `SELECT * FROM users WHERE id = ${parseInt(req.params.id)}`
        const result = await asyncQuery(checkUser)


        if(result[0].status == 0) {
            const patch = `UPDATE users SET status = 1 WHERE id='${id}'`
            const result = await asyncQuery(patch)
            return res.status(200).send('account activate')
        }

        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    },
    deactiveAccount : async (req, res) => {
        console.log('params : ', req.params.id)
        const id = req.params.id
        try {
            const checkUser = `SELECT * FROM users WHERE id = ${parseInt(req.params.id)}`
            const result = await asyncQuery(checkUser)

            if(result[0].status == 1) {
                const patch = `UPDATE users SET status = 0 WHERE id='${id}'`
                const result = await asyncQuery(patch)
                return res.status(200).send('account deactive')
            }

        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    },
    closeAccount : async (req, res) => {
        console.log('params :', req.params.id)
        const id = req.params.id

        try {
            const checkUser = `SELECT * FROM users WHERE id = ${parseInt(req.params.id)}`
            const result0 = await asyncQuery(checkUser)

            const closeAcc = `UPDATE users SET status = 3 WHERE id=${id}`
            const result = await asyncQuery(closeAcc)

            res.status(200).send('your account is closed')

        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    }
}