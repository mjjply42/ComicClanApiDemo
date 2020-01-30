const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const dbUtils = require('../dbFunctions.js')
const mysql = require('mysql')

const pool = mysql.createPool({
    host: "db",
    port: "3306",
    user: 'root',
    password: "password",
    database: "mydb",
});

router.get("/", (req, res) => {
    pool.query(`select * from users`, (err, results) => {
        if (err)
            res.send(err)
        else
            res.send(results)
        })
})

router.post("/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, 'extraspecialsupersecretkey', (err, authData) => {
        if (err)
            res.status(403).send({message: "Token Error"})
        else
        {
            const user = {
                userName: "charles_tallerman"
            }
            if (!dbUtils.checkForUser(pool, user, res, req))
            {
                dbUtils.addNewUser(pool, user, res, req)
            }
            else
                res.send({message: "User exists!"})
        }
    })
})

router.post("/login", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    let user = null
    user = await dbUtils.checkForUser(pool, req, res)
    if (user === false)
        res.send({message: "User does not exist"})
    else
    {
        ///if(passwordMatches(user, res.body['password']))
        jwt.sign({user}, 'extraspecialsupersecretkey',  (err, token) => {
            if (err)
                res.status(403).send({message: "Token Error"})
            else
                res.json({message: {token}})
        })
    }
})

router.post("/signup", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    let user = null
    user = await dbUtils.checkForUser(pool, req, res)
    if (user === false)
    {
        user = await dbUtils.addNewUser(pool, req, res)
        jwt.sign({user}, 'extraspecialsupersecretkey',  (err, token) => {
            if (err)
                res.status(403).send({message: "Token Error"})
            else
                res.json({message: {token}})
        })
    }
    else
        res.send({message: "User already exists"})
})

function verifyToken(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization']
    //Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined')
    {
        const bearer = bearerHeader.split(" ")
        //Get token from array
        const bearerToken = bearer[1]
        //Set the token
        req.token = bearerToken
        next()
    }
    else
    {
        //Forbidden
        res.sendStatus(403)
    }
}

module.exports = router;