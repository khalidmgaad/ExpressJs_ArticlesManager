const express = require('express');
const router = require('./router');

const app = express();

const PORT = 8000;

app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
    console.log("App Running on localhost:", PORT);
})