require('dotenv').config();
const DBconnect = require('./database/DBconnection')
const express = require('express')
const cors = require('cors')

const port = process.env.port
const app = express()
app.use(express.json())

app.use(cors())
try{
    DBconnect();
}catch(e){
    console.log(e)
}


app.use('/api/auth',require('./routes/auth'))

app.listen(port,()=>{
    console.log(`Backend running on http://localhost:${port}`)
})