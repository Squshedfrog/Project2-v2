const { render } = require('ejs')
const express = require('express')
const app = express()
const router = express.Router()
const db = require('../database/db');
const ensureLoggedIn = require('./../middleware/ensure_logged_in')


// ----------- routes --------------------




// router.post('/explore', ( req , res ) => {
//     const locat = req.body.location
    
//     const sql = `SELECT * FROM tracks WHERE location LIKE $1;`
//     db.query( sql ,[`${locat}%`], ( err , dbRes ) => {
//         //incomplete show results page

//         console.log(dbRes.rows)
//     })
//     res.render('./explore/results')
// })

router.get('/recipe/share', ensureLoggedIn , ( req , res ) => {
    res.render('./explore/share')
})

router.post('/recipe/share', ensureLoggedIn , ( req , res ) => {
      /*let entryArr = Object.keys(req.body)
        for ( let i = 0 ; i < entryArr.length ; i++ ){
        if (entryArr[i] === '' ) { 

        } 
      }
      */
    
    const pre_time = `{${req.body.pretimehr},${req.body.pretimemin}}`
    const cook_time = `{${req.body.cooktimehr} ,${req.body.cooktimemin}}`
    const user_id = req.session.userId
    const type = `${req.body.type1} ${req.body.type2}`
    const { name , skill , ingredients , img_url , recipe } = req.body
    
    console.log(pre_time)
    
    sql = `INSERT INTO recipes ( name , type , skill , ingredients , img_url , pre_time , cook_time, recipe , rating ,user_id ) values (  $1 , $2 , $3 , $4 , $5, $6 , $7 ,$8 , 1 , ${user_id} );`

    db.query( sql , [name , type ,skill , ingredients , img_url , pre_time , cook_time , recipe ] , ( err ,dbRes ) => {
        res.render("./explore/share")
    //res.redirect('/');

    })    
})

router.post('/recipe/search', ( req , res ) => {
    const { type } = req.body
    const sql = `SELECT * FROM recipes WHERE type LIKE $1;`
    db.query( sql ,[`%${type}%`], ( err , dbRes ) => {
        let arr = []
        for ( recipe of dbRes.rows ){
            arr.push(recipe.cook_time)
        }
        res.send(arr)
    })
})


router.get("/recipe/:id", ensureLoggedIn, (req, res) => {
    const sql = `select * from recipes where id = $1;`
    console.log(sql)
  
    db.query(sql, [req.params.id], (err, dbRes) => {
      if (err) {
        console.log(err)
      } else {
        const recipe = dbRes.rows[0]
        res.render("./explore/recipe_details", { recipe })
      }
    })
  })






// ---------------- export ---------------
module.exports = router