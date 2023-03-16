const express = require('express')
const app = express()
const router = express.Router()
const db = require('../database/db');
const bcrypt = require('bcrypt');



router.get( "/session", ( req , res ) => {
    res.locals.message = ""
    res.render('./users/login-form')
})

router.post( "/sessions/login" , ( req, res ) => {
    const email = req.body.email
    const password = req.body.password
    const sql = `SELECT * FROM users WHERE email = $1;`

    db.query(sql, [email], (err, dbRes) => {
        //console.log(`**session controller ${Object.keys(dbRes.rows[0])}`)
        // console.log(`check db response ${dbRes.rows[0].first_name}`)
        if ( dbRes.rows.length == 0 ){

        // user not found re enter or .....
        res.locals.message =  'user not found re enter or .....'
           res.render('./users/login-form')
           return
        }   
        const user = dbRes.rows[0]
        bcrypt.compare(password, dbRes.rows[0].password_digest, (err ,result) => {
                if (result) {
                //logged in

                
                req.session.userId = user.id
                
                
                res.redirect('/')

            } else {
                //incorrect password
                res.locals.message = 'Incorrect password'
                res.render('./users/login-form' )
            }
        })
    })
})

router.post("/sessions/newuser" , ( req , res ) => {
    const email = locals.email

    const sql = `SELECT * FROM users WHERE email = $1;`
    
    db.query(sql, [email] , (err, dbRes) => {
        const user = dbRes.rows[0]
        req.session.userId = user.id
                
                
        res.redirect('/')
        
    })
})


router.delete( "/sessions/logout" , ( req , res ) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
})













// ---------------- export ---------------
module.exports = router