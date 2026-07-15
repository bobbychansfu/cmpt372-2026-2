const express = require('express')
const cookieParser = require('cookie-parser')

var app = express()

var port = 3000

app.use(cookieParser())

app.get('/', (req, res) => {
    let cookie = req.cookies['randInt']
    if (cookie === undefined){
        let randInt = Math.random().toString();
        randInt = randInt.substring(2, randInt.length);
        res.cookie('randInt', randInt, {maxAge: 10000})
        res.send(`cookie set to ${randInt}`)
    }
    else{
        res.send(`Cookie exists ... cookie value is ${cookie}`)
    }
})

app.get('/delete', (req, res) => {
    res.clearCookie('randInt')
    res.send('cookie deleted')
})

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)
})
