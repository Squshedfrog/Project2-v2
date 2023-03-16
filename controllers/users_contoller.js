const express = require('express')
const app = express()
const router = express.Router()
const db = require('../database/db');
const bcrypt = require('bcrypt');



// ----------- routes --------------------


router.get('/users', (req , res ) => {
    res.render('./users/signup-form', { message : '' })
})

router.post('/users/new', ( req , res ) => {
    const email = req.body.email
    const firstName = req.body.first_name;
    const surname = req.body.surname;
    const myPlaintextPassword = req.body.password

    const sql = `SELECT * FROM users WHERE email = $1;`;
    
    db.query( sql , [email] , ( err , dbRes ) => {
        console.log(dbRes.rows.length)
        // check if email is i the database 
        if (dbRes.rows.length == 0) {
            //console.log(`***** dbRes ${(dbRes.rows.length)}`)
            bcrypt.genSalt(10, (err , salt) => {

            bcrypt.hash(myPlaintextPassword, salt, (err, digestedPassword) => {
    
                const sql = `
                INSERT INTO users ( points , email , first_name , last_name , password_digest)
                VALUES ( 0 , $1 , $2 , $3 , '${digestedPassword}');`
                
                db.query(sql,[ email , firstName , surname ] , (err , dbRes) => {
                //console.log(err)
                
                }) 
            
                
            })
            
                        
            db.query( `Select id from users;`, ( err , dbRes ) => {
               
                req.session.userId = dbRes.rows.length + 1
                res.locals.currentUser.first_name = firstName
                res.render('./users/welcome')
            })
            // res.locals.message = 'Welcom log in to Explore';
            // res.render('./users/login-form')    
        })} else {
            res.locals.message = '**The Email you have entered is already registed';
            res.render('./users/signup-form' )    
        }
    //------------------- need to update / path email already exists registered --------------------
    })
    
})

router.get("/user/pass", (( req , res ) => {
    console.log(req.locals.email)
    res.render('/')
}))














// ---------------- export ---------------
module.exports = router