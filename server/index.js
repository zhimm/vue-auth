const express = require('express');
const app = express();
// const cors = require('cors');
const vb = require('volleyball');
const authRoutes = require('./auth/index.js');



//middlewares

app.use(express.json());
// app.use(cors());
app.use(vb)


app.use('/auth', authRoutes);


app.get('/', (req, res) => {
    res.json({
        message: "ok"
    })
})


const port = process.env.PORT || 1000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});