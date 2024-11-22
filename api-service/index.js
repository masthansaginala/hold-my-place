const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000
require('dotenv').config();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello Welcome , This is Hold My Place Application API Service')
})

app.listen(port, () => {
    console.log(`Server listening at  http://localhost:${port}`)
})
