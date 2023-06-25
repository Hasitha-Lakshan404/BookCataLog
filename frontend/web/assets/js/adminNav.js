/*dashboard*/
$('#adDash').click(function () {
    $('#adminAddBook').css('display','none');
    $('#adminDashboard').css('display','block');
    $('#adminViewAllBook').css('display','none')
})


/*Add Book*/
$('#adViewAddBook').click(function () {

    $('#adminAddBook').css('display','block');
    $('#adminDashboard').css('display','none');
    $('#adminViewAllBook').css('display','none');

})

/*View Books*/
$('#adViewBookView').click(function () {

    $('#adminAddBook').css('display','none');
    $('#adminDashboard').css('display','none');
    $('#adminViewAllBook').css('display','block')

    /*ID, Category, Title, Author, Price, Image*/

})