const express = require('express');
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
var cors = require('cors')
const app = express();

app.use(cors())

const connectDB = require('./server/database/connection')

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 3000

//Log Requests
app.use(morgan('tiny'))

// Mongo Conecction
connectDB()

// Parserequest to body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

// Routes
app.use('/', require('./server/routes/router'))
// Run Server
app.listen(3000, () => { console.log(`Server running on http://localhost:${PORT}`) })