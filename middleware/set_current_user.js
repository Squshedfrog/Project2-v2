const db = require('./../database/db')

function setCurrentUser(req, res , next )  {
    //console.log(`setCurrentUser req , res ${Object.keys(req.session)} ${res}` );
    const { userId } = req.session
    res.locals.currentUser = {}
    if (userId) {
        // user is logged in - setup currentUser object
        const sql = `SELECT id, email, first_name FROM users WHERE id = ${userId}`

        db.query(sql, (err, dbRes) => {
            if (err) {
                console.log(err)
            } else {
                res.locals.currentUser = dbRes.rows[0]
                next()
            }
        })
    } else {
        next()
    }
}

module.exports = setCurrentUser;