const bcrypt = require('bcryptjs')
const salt = 10

module.exports = {
    hashValue: function(password)
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                bcrypt.hash(password, salt, (err, hash) => resolve(hash))
            }
            catch (err)
            {
                reject(err)
            }
        })
    },
    isMatched: async function(recPass, dbPass)
    {
        return new Promise(async(resolve, reject) => {
            try
            {
                    bcrypt.compare(recPass, dbPass, function(err, res) {
                        resolve(res)
                    })
            }
            catch (err)
            {
                resolve(null)
            }
        })
    }
}