$(window).scroll(function(){
    if($(document).scrollTop() > 50) {
        $(".navbar__bot").css("display", "flex").fadeOut("slow");
    }
})