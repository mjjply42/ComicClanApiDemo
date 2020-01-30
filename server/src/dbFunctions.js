module.exports = {
    addNewUser: async function(pool, req, res) {
        return new Promise(async (resolve, reject) => {
            try
            {
                const query = `INSERT INTO users (user_name, password) VALUES ('${req.body['user_name']}', '${req.body['password']}')`
                pool.query(query, (err, result) => {
                    if (err)
                        throw(err)
                    else
                        resolve(req.body['user_name'])
                })
            }
            catch(err)
            {
                req.sendStatus(500)
                resolve(false)
            }
        })
    },
    checkForUser: async function(pool, req, res) {
        return new Promise(async (resolve, reject) => {
            try
            {
                pool.query(`select * from users where user_name = '${req.body['user_name']}'`, (err, results) => {
                    if (err)
                        throw(err)
                    else
                    {
                        if (results.length > 0)
                        {
                            console.log(results[0]['user_name'])
                            resolve(results[0]['user_name'])
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