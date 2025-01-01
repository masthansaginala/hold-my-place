const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001 ;
require('dotenv').config();
const routes = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello Welcome , This is Hold My Place Application API Service')
})

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server listening at  http://localhost:${port}`)
})