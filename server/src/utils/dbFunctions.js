const hashUtils = require('./hashFunctions.js')
const itemsPerPage = 7
/*async function makeDemoHashes(){
    console.log("CAT123: ", await hashUtils.hashValue("cat123"))
    console.log("DOG123: ", await hashUtils.hashValue("dog123"))
    console.log("CAT: ", await hashUtils.hashValue("cat"))
    console.log("DOG: ", await hashUtils.hashValue("dog"))
}
makeDemoHashes()*/
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
    postNewPost: async function(pool, req, res) {
        return new Promise((resolve, reject) => {
            try
            {
                if (!req.body['content'] || !req.body['user_id'] || !req.body['image_link'])
                {
                    resolve(false)
                    return
                }
                let query = `insert into posts (user_id, content, image_link, date_posted) values 
                ('${req.body['user_id']}', "${req.body['content']}", '${req.body['image_link']}', now())`
                pool.query(query, (err, result) => {
                    if (err)
                        throw(err)
                    else
                        resolve(true)
                })
            }
            catch
            {
                resolve(false)
            }
        })
    },
    postNewComment: async function(pool, req, res) {
        return new Promise ((resolve, reject) => {
            try
            {
                if (!req.body['comment'] || !req.body['post_id'] || !req.body['user_id'] || !req.body['image_link'])
                {
                    resolve(false)
                    return
                }
                let query = `insert into comments (post_id, user_id, comment, image_link, date_posted) 
                values ('${req.body['post_id']}', '${req.body['user_id']}', "${req.body['comment']}", '${req.body['image_link']}', now())`
                pool.query(query, async (err, result) => {
                    if (err)
                        throw(err)
                    else
                        resolve(true)
                    })
                }
            catch
            {
                resolve(false)
            }
        })
    },
    addNewUser: async function(pool, req, res) {
        return new Promise(async (resolve, reject) => {
            try
            {
                if (!req.body['user_name'] || !req.body['password'])
                {
                    resolve(false)
                    return
                }
                let query = `insert into users (user_name, password, date_joined) values 
                ('${req.body['user_name']}', '${await hashUtils.hashValue(req.body['password'])}', now())`
                pool.query(query, async (err, result) => {
                    if (err)
                        throw(err)
                    else
                        resolve(await getIdByName(pool, req, res))
                })
            }
            catch(err)
            {
                resolve(false)
            }
        })
    },
    checkForUser: async function(pool, mode = null, req, res) {
        return new Promise(async (resolve, reject) => {
            try
            {
                if (!req.body['user_name'])
                {
                    resolve(false)
                    return
                }
                let query = `select * from users where user_name = '${req.body['user_name']}'`
                pool.query(query, async (err, results) => {
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
                resolve(false)
            }
        })
    },
    retrievePostsByDate: async function(pool, req, res) {
        return new Promise ((resolve, reject) => {
            try
            {
                if ((req.body['page'] === null || req.body['page'] < 0 || req.body['page'] === undefined 
                || typeof req.body['page'] !== 'number'))
                {
                    resolve(false)
                    return
                }
                let query = `select * from posts order by date_posted desc limit ${req.body['page']},${itemsPerPage}`
                pool.query(query, async (err, results) => {
                    if (err)
                        throw(err)
                    else
                        resolve(results)
                });
            }
            catch
            {
                reject(false)
            }
        })
    },
    retrieveCommentsByDate: async function(pool, req, res) {
        return new Promise((resolve, reject)=> {
            if ((req.body['page'] === null || req.body['page'] < 0 || req.body['page'] === undefined 
            || typeof req.body['page'] !== 'number'))
            {
                resolve(false)
                return
            }
            let query = `select comments.* from posts inner join comments on comments.post_id = posts.post_id 
            order by post_id asc, date_posted desc limit ${req.body['page']},${itemsPerPage}`
                pool.query(query, async (err, results) => {
                    if (err)
                        throw(err)
                    else
                        resolve(results)
                });
        })
    },

}