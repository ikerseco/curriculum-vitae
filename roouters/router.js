const express = require('express')
const router = express.Router();
const filmsCtrl = require('../controlers/filmsCTR.js')



//PagesTorrent
//router.get("/allFilms/mejortorrentt/:data",null)

//Filsm 

//router.get("/oneFilms/:name",filmsCtrl.oneFimls)//(imdb)
router.get("/filmPG/:name",filmsCtrl.FilmPG)


//web
router.get("/listFilms/:data",filmsCtrl.listFilms)
router.get("/filmsDescription/:url",filmsCtrl.filmDescription)




module.exports = router