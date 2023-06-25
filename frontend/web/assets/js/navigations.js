$(window).on('load', function () {
    $("#HomepageHome").css("display","block");
    $("#HomepageAdmin").css("display","none");
    $('#adminAddBook').css('display','none');
    $('#adminViewAllBook').css('display','none');
})


$(".HomeLogin").click(function () {
    $("#HomepageHome").css("display","none");
    $("#HomepageAdmin").css("display","block");
    $("#mainHomeTitle").css("color","#012970");
})