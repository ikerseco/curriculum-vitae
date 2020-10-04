$(document).ready(function() {
    $(".invisible").css("height",screen.height.toString()+"px")
    $(".bodyP").css("height",screen.height.toString()+"px")
   // $(".translate").animate({transform :'translateY(-1150px)'})
    $(window).scroll(function() {
        var zenbakia = $(document).scrollTop();
        if(zenbakia > 106){
            $(".Tid").removeClass("izenburu")
            $(".Tid").addClass("izenburuDEs")
        }else{
            $(".Tid").removeClass("izenburuDEs")
            $(".Tid").addClass("izenburu")
        }
        console.log(zenbakia);
    });
});
