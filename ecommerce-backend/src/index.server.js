const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

//routes
const userRoutes = require('../src/routes/user');

const app = express();
env.config();
//middleware
app.use(bodyParser.json())
app.use('/api', userRoutes)

//Database connection
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.zdrps.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Database Connected....")
    })

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
