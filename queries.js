const Pool = require('pg').Pool
// const pool = new Pool({
//     user: 'kino',
//     host: 'localhost',
//     database: 'api',
//     password: 'password',
//     port: 5432
// })
const pool = new Pool({
    user: 'ying@yingdb',
    host: 'yingdb.postgres.database.azure.com',
    database: 'test',
    password: 'Admin1234567',
    port: 5432
})

const getUsers = (req, res) => {
    pool.query('SELECT * FROM members ORDER BY id ASC', (error, results) => {
        console.log("error", error)
        console.log(results)
        res.status(200).json(results.rows)
    })
}

const createUser = (req, res) => {
    const {name, email, sex, age} = req.body
    console.log(name, email, req.body)
    pool.query('INSERT INTO members (name, email, sex, age) VALUES ($1, $2, $3, $4)', [name, email, sex, age]).then(results => {
        console.log(results)
        res.status(200).send(`User insert success`)
    }).catch(err => {
        console.log("error", err)
        res.status(201).send(`User added with ID: 還不知道怎麼拿到 id`)
    })
}

const updateUser = (req, res) => {
    const {name, email, sex, age} = req.body
    console.log(req.body)
    console.log(req.params.id)
    pool.query('UPDATE members SET name = $1, email = $2, sex = $3, age = $4 WHERE id = $5', [name, email, sex, age, req.params.id]).then(results => {
        console.log(results)
        res.status(200).send(`User UPDATE`)
    }).catch(err => {
        console.log("error", err)
        res.status(500).send('Failed')
    })
}

const deleteUser = (req, res) => {
    console.log("ID~~~", req.params.id)
    pool.query('DELETE FROM members WHERE id = $1', [req.params.id]).then(results => {
        res.status(200).send('DELETE!')
    }).catch(err => {
        console.log(err)
        res.status(500).send('Failed')
    })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}