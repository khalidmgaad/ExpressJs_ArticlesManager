const express = require('express');
const router = require('./router');

const app = express();
app.set('view engine', 'pug')
app.set('views', './views')

const PORT = 8000;

app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
    console.log("App Running on localhost:", PORT);
})