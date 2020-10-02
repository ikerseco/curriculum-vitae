  
  $("#getFimsl").hide()
  $(".search_icon").click(function() {
    console.log("bai")
    var search = $(".search_input").val();
      $.ajax({
        url: 'http://127.0.0.1:30001/listFilms/'+search,
        type: 'GET',
        success: function(data) {
          var html_ALL = "" 
          data.forEach(element => {
            var html = `<div class="card mb-3 shadow p-3 mb-5 bg-white rounded" style="max-width: 540px;">
                          <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="`+element.img+`" class="card-img" alt="...">
                            </div>
                            <div class="col-md-8">
                              <div class="card-body">
                                <h5 class="card-title">`+element.name+`</h5>
                                <p class="card-text"><small class="text-muted">`+element.puntuacion+`</small></p>
                                <i class="fa fa-check w-25 p-3" aria-hidden="true"></i>
                                <input  class="btn btn-primary w-100 p-3 mt-5" type="button" data-url="`+element.url+`" data-name="`+element.name+`" value="GetFimls">
                              </div>
                            </div>
                          </div>
                        </div>`
            html_ALL += html
          });
          $(".fims").html(html_ALL)  
          $(".btn-primary").click(function(){
            let id = $(this).data("url").split(`/`)
            let len = id.length
            let name = $(this).data("name")
            var miPrimera = new Promise((resolve,reject) =>{ 
              //ajax des
              var obj = new Object()
              $.ajax({
                url: `http://127.0.0.1:30001/filmsDescription/${id[len -1]}`,
                type: 'GET',
                success: function(data) {
                 obj.name = name
                 obj.description = data
                 $("#exampleModalLabel").html(name)
                 let Descrip = obj.description.filter(data => data.name != "Título original")
                 let htmlCo =''
                 Descrip.forEach(element =>{
                    htmlCo += `  <div class="card">
                    <div class="card-header" id="headingOne">
                      <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          ${element.name}
                        </button>
                      </h2>
                    </div>
                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div class="card-body">
                      ${element.data}
                      </div>
                    </div>
                  </div>`
                 })
                 $("#accordionExample").html(htmlCo)
                 $("#getFimsl").show()
                 collapse()
                 resolve(obj)
                }
              })
            }).then(function(data){
              console.log(data)
            })
          })
        }
      })
  });

  //functions 

  function collapse(){
    $(".card-header").click(function(){
       $(".collapse").removeClass("show")
       let dat =  $(this).parent().children(".collapse").addClass("collapse show")
       console.log(dat)
    })
  }