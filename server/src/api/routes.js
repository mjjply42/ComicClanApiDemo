require('dotenv').config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const dbUtils = require('../utils/dbFunctions.js')
const testRun = require('../tests/testRun.js')
const mysql = require('mysql')

//TOKEN EXPIRATION TIME (IN SECONDS)
//ie: 3600 is 1 Hour
const tokenExpiration = 3600

const pool = mysql.createPool({
    host: "db",
    port: "3306",
    user: 'root',
    password: "password",
    database: "mydb",
});

//Local DB pool for testing purposes
/*const pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: 'root',
    database: 'mydb',
    multipleStatements: true,
});*/

router.get("/", (req, res) => {
    pool.query(`select * from users`, (err, results) => {
        if (err)
            res.send({auth: false, err})
        else
            res.send(results)
        })
})

router.post("/comments", grabToken, async (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if (testRun)
    {
        let result = await dbUtils.postNewComment(pool, req, res)
        if (result)
            res.send({auth: true, message: "Comment added"})
        else
            res.status(403).send({auth: false, message: "Error adding comment, try again"})
        return
    }
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
            {
                let result = await dbUtils.postNewComment(pool, req, res)
                if (result)
                    res.send({auth: true, message: "Comment added"})
                else
                    res.status(403).send({auth: false, message: "Error adding comment, try again"})
            }
        }
    })
})

router.get("/comments", grabToken, async (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if (testRun)
    {
        let result = await dbUtils.retrieveCommentsByDate(pool, req, res)
            if (result)
            {
                let groupedPosts = {}
                result.forEach((item, index) => {
                    if (!groupedPosts[item['post_id']])
                        groupedPosts[item['post_id']] = []
                    groupedPosts[item['post_id']].push(item)
                })
                res.send({auth:true, message: groupedPosts})
            }
            else
                res.status(403).send({auth: false, message: "Error fetching comments"})
        return
    }
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
            let result = await dbUtils.retrieveCommentsByDate(pool, req, res)
            if (result)
            {
                let groupedPosts = {}
                result.forEach((item, index) => {
                    if (!groupedPosts[item['post_id']])
                        groupedPosts[item['post_id']] = []
                    groupedPosts[item['post_id']].push(item)
                })
                res.send({auth:true, message: groupedPosts})
            }
            else
                res.status(403).send({auth: false, message: "Error fetching comments"})
        }
    })
})

router.post("/posts", grabToken, async (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if (testRun)
    {
        let result = await dbUtils.postNewPost(pool, req, res)
        if (result)
            res.send({auth: true, message: "Post added"})
        else
            res.status(403).send({auth: false, message: "Error adding post, try again"})
        return
    }
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
            {
                let result = await dbUtils.postNewPost(pool, req, res)
                if (result)
                    res.send({auth: true, message: "Post added"})
                else
                    res.status(403).send({auth: false, message: "Error adding post, try again"})
            }
        }
    })
})

router.get("/posts", grabToken, async (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    if (testRun)
    {
        let result = await dbUtils.retrievePostsByDate(pool, req, res)
            if (result)
                res.send({auth:true, message: result})
            else
                res.status(403).send({auth: false, message: "Error fetching posts"})
        return
    }
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
            let result = await dbUtils.retrievePostsByDate(pool, req, res)
            if (result)
                res.send({auth:true, message: result})
            else
                res.status(403).send({auth: false, message: "Error fetching posts"})
        }
    })
})

router.post("/login", async (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    let user = null
    user = await dbUtils.checkForUser(pool, "login", req, res)
    if (user === false)
        res.send({auth: false, message: "Incorrect login information"})
    else
    {
        jwt.sign({user}, 'extraspecialsupersecretkey', { expiresIn: tokenExpiration },  async (err, token) => {
            if (err)
                res.status(403).send({auth: false, message: "Token creation error"})
            else
                res.json({auth: true, message: {token}})
        })
    }
})

router.post("/signup", async (req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    let user = null
    user = await dbUtils.checkForUser(pool, 'auth_verify', req, res)
    if (user === false)
    {
        user = await dbUtils.addNewUser(pool, req, res)
        jwt.sign({user}, 'extraspecialsupersecretkey', { expiresIn: tokenExpiration },  (err, token) => {
            if (err)
                res.status(403).send({auth: false, message: "Token creation error"})
            else
                res.json({auth: true, message: {token}})
        })
    }
    else
        res.send({auth: false, message: "User already exists"})
})

async function grabToken(req, res, next) {
    if (testRun)
    {
        next()
        return
    }
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