import express from 'express'
import {config} from 'dotenv'
config()
const app= express()
const port =process.env.PORT


app.listen(port,()=>{
    console.log(`server is up and listinig on port ${3000}`)
})


