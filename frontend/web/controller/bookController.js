let baseUrl = "http://localhost:8080/api/v1/";

$("#btnAdminAddBook").click(function () {
    let bid=$("#save_book_Id").val()
    addBook(bid);

})


function addBook(bid) {
    var vData = new FormData();

    let imageFile = $('.bookView')[0].files[0];
    let imageFileName = $('.bookView')[0].files[0].name;

    // console.log(imageFile);


    var bookDTO = {
        bookId: bid,
        category: $("#save_book_category").val(),
        title: $("#save-book-title").val(),
        author: $("#save-book-author").val(),
        price: $("#save-book-Price").val(),
        image: "uploads/" + imageFileName,
    }

    vData.append("bookFile", imageFile);
    vData.append("book", new Blob([JSON.stringify(bookDTO)], {type: "application/Json"}))

    $.ajax({
        url: baseUrl + "book",
        method: "POST",
        async: true,
        contentType: false,
        processData: false,
        data: vData,
        success: function (resp) {
            /*need to get user id from resp*/
            if (resp.status === 200) {
                alert(resp.message);
                // loadAllCars("allCarDetail");

                uploadBookImage(bid);

            }
        },error: function (err) {
            console.log(err);
        }
    })
}

function uploadBookImage(bookId) {
    let imageFile = $('.bookView')[0].files[0];
    let imageFileName = bookId + "-image1-" + $(".bookView")[0].files[0].name;

    var data = new FormData();

    data.append("image1", imageFile, imageFileName);

    $.ajax({
        url: baseUrl + "book/uploadImg/" + bookId,
        method: "Post",
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function () {
            console.log("Uploaded");
        },error:function (err) {
            let errorReason = JSON.parse(err.responseText);
        }
    })

}
