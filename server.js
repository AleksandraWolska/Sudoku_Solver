const PORT = 8000
const express = require('express')
const axios = require('axios').default      //http client
require('dotenv').config()
const cors = require('cors')    //allows backend server to access API data
const app = express()           //creates an express app
app.use(cors())                 
app.use(express.json())         //parses incoming JSON requests and puts the parsed data in req.body


app.listen(PORT, () => console.log("listening the port"))

app.post('/solve', (req, res) => {

    const options = {
        method: 'POST',
        url: 'https://solve-sudoku.p.rapidapi.com/',
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'solve-sudoku.p.rapidapi.com',
            'x-rapidapi-key': process.env.RAPID_API_KEY
            },
        data: {
            puzzle: req.body.numbers
            }
        };

        axios.request(options).then((response) => {
            console.log(response.data)
           res.json(response.data)
        }).catch((error) => {
            console.error(error)
    })
})