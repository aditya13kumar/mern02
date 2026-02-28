require('dotenv').config();
const app = require('./src/app');
const coonectdb = require('./src/db/db');

coonectdb();


app.listen(3000,()=>{
    console.log('server is running on port 3000');
})