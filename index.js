const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const db = require('./queries')

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.get('/', db.getUsers)

app.get('/printHello', (req, res) => {
    console.log(req.body)
    res.json('Success! Hello~~~')
})

app.get('/members', db.getUsers)
app.post('/members', db.createUser)
app.put('/members/:id', db.updateUser)
app.delete('/members/:id', db.deleteUser)

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`listening on ${port}`)
})