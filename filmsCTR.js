var https = require("https")
const cheerio = require('cheerio');
const YouTubeNO = require('youtube-node');
const youTube = new YouTubeNO();
youTube.setKey('AIzaSyDzJatfvex_U-St_dPZdxvBCpeuhRi2Qaw');
//AIzaSyBK-8Rir5F7Z_8dmDwJZYXRAsgDRTg7os0
/*firebase
const admin = require("firebase-admin");
const serviceAccount = require("../firebase/secosplay-9628d-firebase-adminsdk-5z377-c4f0c0a603.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://secosplay-9628d.firebaseio.com"
});*/

// Get a database reference to our posts

//firebase


//funtzioak
function getHtmlData(url,callback){
    let data = ""
    https.get(url,(resp) => {
        
       resp.on('data',(chunk) => {
                 data += chunk
       });
       resp.on('end', () =>{  
          //console.log(data)
            callback(data) 
       });  
        
     }).on("error",(err) => {
       console.log(err)
     }); 
};



var splitALL = (value) => {
    var data = value.data + value.banatzaie[0]
    var kaxa = [] 
    var hitza = ""
    for(var i=0 ;i <= data.length; i++ ){
       var ka = data.charAt(i)
       var valid = false
       value.banatzaie.forEach(function(dat){
           if(ka == dat){
             valid = true
           }
       })
       valid == true ? (
          kaxa.push(hitza.trim()),
          hitza = ""
       ):(
          hitza += ka 
       ); 
    }
    return kaxa
;}

//funtzioak



/*WEB*/



//PelisGratis
exports.FilmPG = (req,res) =>{
    console.log(req.params.name)
    getHtmlData(`https://pelis-gratis.com/index.php?${req.params.name}=search`,function(html){
        var $ = cheerio.load(html)
        $("div.owl-carousel a").each(function(i,elem){
            var title = $(this).find("img").attr("title")
            var url = $(this).attr("href")
            if(String(title.toLowerCase()) == String(req.params.name.toLowerCase())){
                console.log(url)
                var JsonPeli = new Object()
                getHtmlData(url,function(html){
                   let $ = cheerio.load(html)
                   JsonPeli.server = "PelisGratis" 
                   function scrAsinc(callback){
                        var arrSrc = []
                        $("#tab_holder a").each(function(i,elem){
                            var jsonSrc = new Object()
                            var src = $(this).attr("data-src")
                            if(src.length != 0){
                                var objSrc = new Object()
                                var postSrc = src+"&post=1&http_referer="+url+"#iss=ODUuODQuMTY2Ljc5"
                                objSrc.src = postSrc
                                objSrc.language = $(this).html()
                                arrSrc.push(objSrc)
                            }
                        })
                        callback(arrSrc)
                   }
                   scrAsinc(function(data){
                        console.log(data)
                        res.status(200).send(data)
                   })
                })
            }
        })
    }) 
}

//listfiml
exports.listFilms = (req, res) =>{
    console.log(req.params.data)
    var jsonDatAr = []
    getHtmlData("https://www.filmaffinity.com/es/advsearch.php?stext="+req.params.data,function(html){
        var $ = cheerio.load(html)
        //console.log($("div.z-search").html())
        $("div.adv-search-result-wrapper div.adv-search-item").each(function(i,elem){
            var jsonDat = new Object()
            //sconsole.log($(this).html())
            var name = $(this).find("div.mc-title a").attr('title')
            var url = $(this).find("div.mc-title a").attr('href')
            var img = $(this).find('div.mc-poster a img').attr('src')
            var puntuacion = $(this).find('div.avgrat-box').text()
            jsonDat.name = name
            jsonDat.img = img
            jsonDat.puntuacion = puntuacion
            jsonDat.url = url
            jsonDatAr.push(jsonDat)
        })
        res.status(200).send(jsonDatAr)
    })
}

//descriptionFimls

exports.filmDescription = (req,res) =>{
    var idDes = req.params.url
    getHtmlData(`https://www.filmaffinity.com/es/${idDes}`,function(html){
       var $ = cheerio.load(html)
       var description = []
       var nameA = []
       var dataA = []
       $("dl.movie-info dt").each(function(i,elem){
            var name = $(this).text()
            nameA.push(name)
       })
       $("dl.movie-info dd").each(function(i,elem){
            var data = $(this).text()
            dataA.push(data)
       }) 
       for (var i = 0; i < nameA.length; i++) {
           var obj = new Object()
           if(nameA[i] == "Género" || nameA[i] == "Grupos" || nameA[i] == "Reparto"){
                var dat = splitALL({data:dataA[i],banatzaie:["|",".",","]})
                obj.data =  dat
                obj.name = nameA[i]
                description.push(obj) 
           }else{
                obj.name = nameA[i]
                obj.data = dataA[i].trim()
                description.push(obj)  
           }
       }
       var obj = new Object()
       let img = $("div#movie-main-image-container a").attr("href")
       obj.name = "image"
       obj.data = img
       description.push(obj)
       const titulo = description.filter(word => word.name ==  "Título original")
       youTube.search(`${titulo[0].data} Tráiler`, 2, function(error, result) {
        if (error) {
           // console.log(error);
        }
        else {
            var obj = new Object()
            var dataFil =`https://www.youtube.com/watch?v=${result.items[0].id.videoId}`  
            console.log(dataFil)
            obj.name = "trailer"
            obj.data = dataFil
            description.push(obj)
            res.status(200).send(description)        
        }
       }); 
    })
}




