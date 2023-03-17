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
        
        const recipes = dbRes.rows
    res.render("./explore/results", {
  recipes : recipes  })

    })
})


router.get("/recipe/:id", ensureLoggedIn, (req, res) => {
    const sql = `select * from recipes where id = $1;`
    console.log(sql)
  
    db.query(sql, [req.params.id], (err, dbRes) => {
      if (err) {
        console.log(err)
      } else {
        const userId = res.locals.currentUser.id
        const recipe = dbRes.rows[0]
        res.render("./explore/recipe_details", { recipe , userId })
      }
    })
  })

router.get("/recipe/edit/:id" ,ensureLoggedIn, ( req , res ) => {
    
  const sql = `select * from recipes where id = ${req.params.id};`
  
    db.query(sql , ( err , dbRes ) => {

    const recipe = dbRes.rows[0]
      //console.log(Object.keys(recipe))
    //  res.redirect('/')

      res.render("./explore/edit_recipe", { recipe  })
      }
  
    
)
})
    
router.delete('/recipe/delete/:id' ,ensureLoggedIn, ( req , res ) =>{
    const recipe = req.params.id
    const sql = `DELETE FROM recipes WHERE id = '${recipe}';`
    db.query( sql , ( err , dbRes ) => {
    res.redirect('/');
    })

    
})




// ---------------- export ---------------
module.exports = router