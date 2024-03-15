import * as mongoose from "mongoose";
import * as process from "process";
import * as console from "console";
require("dotenv").config();
const app = require(".")

const {DB_HOST } = process.env

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    console.log(`listning on port ${PORT}`)
})

mongoose.connect(DB_HOST!)
.then(():void=>console.log('Database connection successful'))
.catch((error)=>{
    console.log(error.message)
    process.exit(1)
})