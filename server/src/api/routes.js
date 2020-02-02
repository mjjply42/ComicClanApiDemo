const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const dbUtils = require('../utils/dbFunctions.js')
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
            res.send({auth: false, err})
        else
            res.send(results)
        })
})

router.post("/posts", grabToken, (req, res) => {
    jwt.verify(req.token, 'extraspecialsupersecretkey', async (err, authData) => {
        if (err)
        {
            if (err.message === "jwt expired")
                res.status(403).send({auth: false, message: "Token Expired"})
            else
                res.status(403).send({auth: false, message: "Token Error"})
        }
        else
        {
            req.body['user_name'] = authData.user['user_name']
            req.body['user_id'] = authData.user['user_id']
            let user = await dbUtils.checkForUser(pool, 'auth_verify', req, res)
            if (!user)
                res.send({auth: false, message: "User does not exist"})
            else
                dbUtils.postNewComment(pool, req, res).then(() => {
                    res.send({auth: true, message: "Comment added"})
                }).catch(() => {
                    res.status(403).send({auth: false, message: "Error adding comment, try again"})
                })
        }
    })
})

router.post("/login", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    let user = null
    user = await dbUtils.checkForUser(pool, "login", req, res)
    if (user === false)
        res.send({auth: false, message: "Incorrect login information"})
    else
    {
        jwt.sign({user}, 'extraspecialsupersecretkey', { expiresIn: 3600 },  async (err, token) => {
            if (err)
                res.status(403).send({auth: false, message: "Token creation error"})
            else
                res.json({auth: true, message: {token}})
        })
    }
})

router.post("/signup", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    let user = null
    user = await dbUtils.checkForUser(pool, 'auth_verify', req, res)
    if (user === false)
    {
        user = await dbUtils.addNewUser(pool, req, res)
        jwt.sign({user}, 'extraspecialsupersecretkey', { expiresIn: 3600 },  (err, token) => {
            if (err)
                res.status(403).send({auth: false, message: "Token creation error"})
            else
                res.json({auth: true, message: {token}})
        })
    }
    else
        res.send({auth: false, message: "User already exists"})
})

function grabToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined')
    {
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }
    else
        res.status(403).send({auth: false, message: "No Token Provided"})
}

module.exports = router;