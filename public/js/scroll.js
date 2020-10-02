$(document).ready(function() {
    $(".invisible").css("height",screen.height.toString()+"px")
    $(".bodyP").css("height",screen.height.toString()+"px")
    $(".translate").animate({transform :'translateY(-1150px)'})
    console.log(screen.height);
});