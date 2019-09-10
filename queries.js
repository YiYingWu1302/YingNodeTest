const Pool = require('pg').Pool
const pool = new Pool({
    user: 'ying@yingdb',
    host: 'yingdb.postgres.database.azure.com',
    database: 'test',
    password: 'Admin1234567',
    port: 5432
})

const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        console.log("error", error)
        console.log(results)
        res.status(200).json(results.rows)
    })
}

const createUser = (req, res) => {
    const {name, email} = req.body
    console.log(name, email, req.body)
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]).then((error, results) => {
        if (error) {
            throw error
        }
        console.log(results)
        res.status(201).send(`User added with ID: 還不知道怎麼拿到 id`)
    })
}

const updateUser = (req, res) => {
    const {name, email} = req.body
    console.log(req.body)
    console.log(req.params.id)
    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, req.params.id]).then(results => {
        console.log(results)
        res.status(200).send(`User UPDATE`)
    }).catch(err => {
        console.log("error", err)
        res.status(err.status).send('Failed')
    })
}

const deleteUser = (req, res) => {
    console.log("ID~~~", req.params.id)
    pool.query('DELETE FROM users WHERE id = $1', [req.params.id]).then(results => {
        res.status(200).send('DELETE!')
    }).catch(err => {
        console.log(err)
        res.status(err.status).send('Failed')
    })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}