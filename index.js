const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const db = require('./queries')

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Hello!'
    })
})

app.get('/printHello', (req, res) => {
    console.log(req.body)
    res.json('Success! Hello~~~')
})

app.get('/users', db.getUsers)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`listening on ${port}`)
})