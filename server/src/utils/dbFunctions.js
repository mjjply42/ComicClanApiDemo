const hashUtils = require('./hashFunctions.js')

async function getIdByName(pool, req, res)
{
    return new Promise((resolve, request) => {
        let query = `select user_id from users where user_name='${req.body['user_name']}'`
        pool.query(query, (err, result) => {
            if (err)
                throw(err)
            else
            {
                let userObj = {
                    user_id: result[0].user_id,
                    user_name: req.body['user_name']
                }
                resolve(userObj)
            }
        })
    })
}

module.exports = {
    postNewComment: async function(pool, req, res) {
        return new Promise((resolve, reject) => {
            try
            {
                console.log("USER ID: ", req.body['user_id'])
                let query = `insert into posts (user_id, content, image_link, date_posted) values 
                ('${req.body['user_id']}', '${req.body['content']}', '${req.body['image_link']}', '${req.body['date_posted']}')`
                pool.query(query, (err, result) => {
                    if (err)
                        throw(err)
                    else
                        resolve()
                })
            }
            catch
            {
                reject()
            }
        })
    },
    addNewUser: async function(pool, req, res) {
        return new Promise(async (resolve, reject) => {
            try
            {
                let query = `insert into users (user_name, password) values ('${req.body['user_name']}', '${await hashUtils.hashValue(req.body['password'])}')`
                pool.query(query, async (err, result) => {
                    if (err)
                        throw(err)
                    else
                        resolve(await getIdByName(pool, req, res))
                })
            }
            catch(err)
            {
                req.sendStatus(500)
                resolve(false)
            }
        })
    },
    checkForUser: async function(pool, mode = null, req, res) {
        return new Promise(async (resolve, reject) => {
            try
            {
                pool.query(`select * from users where user_name = '${req.body['user_name']}'`, async (err, results) => {
                    if (err)
                        throw(err)
                    else
                    {
                        if (results.length > 0)
                        {
                            if (mode === 'auth_verify' && results.length > 0)
                                resolve(true)
                            let result = await hashUtils.isMatched(req.body['password'],results[0]['password'])
                            if (result)
                                resolve(await getIdByName(pool, req, res))
                            else
                                resolve(false)
                        }
                        else
                            resolve(false)
                    }
                });
            }
            catch(err)
            {
                req.sendStatus(500)
                resolve(false)
            }
        })
    }
}