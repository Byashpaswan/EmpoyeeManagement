require('dotenv').config();
const express = require('express')
const morgan = require('morgan');
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))



const PORT = process.env.PORT || 6000;

app.listen(PORT,()=>{
    console.log(`server is running on port :${PORT}`)
})

