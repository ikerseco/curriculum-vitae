const express = require('express')
const router = express.Router();



//PagesTorrent
//router.get("/allFilms/mejortorrentt/:data",null)

//Filsm 

//router.get("/oneFilms/:name",filmsCtrl.oneFimls)//(imdb)
router.get("/web",(req,res) =>{
    res.status(200).send("apa")
})




module.exports = router