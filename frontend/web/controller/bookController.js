const baseUrl = "http://localhost:8080/api/v1/";

$("#btnAdminAddBook").click(function () {
    let bid = $("#save_book_Id").val()
    addBook(bid);

})

/*Book Add*/
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
                // alert(resp.message);

                uploadBookImage(bid);

            }
        }, error: function (err) {
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
            loadBooks("allBookDetail");
            console.log("Uploaded");
        }, error: function (err) {
            let errorReason = JSON.parse(err.responseText);
        }
    })
}


function loadBooks(path) {
    $("#admin-view-book").empty();

    $.ajax({
        url: baseUrl + "book/" + path,
        method: "GET",
        success: function (resp) {
            uImage=resp.image
            for (const book of resp.data) {
                let row = `<tr><td>${book.bookId}</td><td>${book.category}</td><td>${book.title}</td><td>${book.author}</td><td>${book.price}</td><td><img style="width: 152px;" src=${"http://localhost:8080/" + book.image} alt=""></td></tr>`;
                $("#admin-view-book").append(row);

                $("#admin-view-book").off("click");
                $("#admin-view-book").click(function () {

                });
            }
            bindRowClickEvents();

        }
    });
}


function bindRowClickEvents() {
    $("#admin-view-book>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let category = $(this).children(":eq(1)").text();
        let title = $(this).children(":eq(2)").text();
        let author = $(this).children(":eq(3)").text();
        let price = $(this).children(":eq(4)").text();
        uImage = $(this).children(":eq(5)").text();



        $('#update-book-Id').val(id);
        $('#update-book-category').val(category);
        $('#update-book-Title').val(title);
        $('#update-book-Author').val(author);
        $('#update-book-price').val(price);

    });
}



/*Update*/
$("#btnUpdateBook").click(function () {
    viewUpdate();

})


function viewUpdate() {
    let bId=$('#update-book-Id').val();
    let category=$('#update-book-category').val();
    let title=$('#update-book-Title').val();
    let auth=$('#update-book-Author').val();
    let price=$('#update-book-price').val();

    var view ={
        bookId: bId,
        category: category,
        title: title,
        author: auth,
        price: price,
        image:uImage
    }

    $.ajax({
        url: baseUrl + "book",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(view),
        success: function (res) {
            loadBooks("allBookDetail");
            if (res.status === 200) {
                clearBookTextUpdate();
                // alert(res.message)
            } else {

                clearBookTextUpdate();
            }
        }
    });

}





/*Delete*/
$("#btnDeleteBook").click(function () {
    $.ajax({
        url:"http://localhost:8080/api/v1/book?id="+$("#update-book-Id").val(),
        method:"delete",
        success(resp){
            loadBooks("allBookDetail");
        }
    });
    clearBookTextUpdate();

})


function clearBookTextUpdate() {
    $('#update-book-Id,#update-book-category,#update-book-Title,#update-book-Author,#update-book-price').val("");
}

function loadAllBookCards(path) {
    $("#bookCardContainer").empty();

    $.ajax({
        url: baseUrl + "book/" + path,
        method: "GET",
        success: function (resp) {
            for (const book of resp.data) {
                let div = `<div class="col-xl-3 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                <div class="icon-box">
                    <div class="icon"><img  class="bookCardMainImg" alt ="" src="assets/images/book1C.jpg"
                                            style="width: 200px;height: 248px;"></i></div>
                    <h4><a href="">${book.title}</a></h4>
                    <p>${book.author}</p>
                    
                    <!--Title-->
                    <div class="row">
                                <div class="d-flex align-items-sm-stretch col-xl-6 justify-content-center"
                                     style="font-size: 13px">Category
                                </div>
                                
                                <div class="d-flex align-items-sm-stretch col-xl-6 justify-content-center"
                                     style="font-size: 13px">LKR
                                </div>
                    </div>
                    
                    <!--Price-->
                            <div class="row">
                                <div class="d-flex align-items-sm-stretch col-xl-6 text-danger justify-content-center"
                                     style="font-weight: 900">${book.category}
                                </div>
                                
                                <div class="d-flex align-items-sm-stretch col-xl-6 text-danger justify-content-center"
                                     style="font-weight: 900">${book.price}
                                </div>
                            </div>
                    
                </div>
            </div>`;


                $("#bookCardContainer").append(div);


            }

        }
    });
}


$('#searchInput').keypress(function(event) {
    if (event.which === 13) {
        const searchWord = $(this).val();

        $("#bookCardContainer").empty();

        $.ajax({
            url: baseUrl + `book/searchBooks?p=${encodeURIComponent(searchWord)}`,
            method: "GET",
            success: function (resp) {
                for (const book of resp.data) {
                    let div = `<div class="col-xl-3 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                <div class="icon-box">
                    <div class="icon"><img  class="bookCardMainImg" alt ="" src="assets/images/book1C.jpg"
                                            style="width: 200px;height: 248px;"></i></div>
                    <h4><a href="">${book.title}</a></h4>
                    <p>${book.author}</p>
                    
                    <!--Title-->
                    <div class="row">
                                <div class="d-flex align-items-sm-stretch col-xl-6 justify-content-center"
                                     style="font-size: 13px">Category
                                </div>
                                
                                <div class="d-flex align-items-sm-stretch col-xl-6 justify-content-center"
                                     style="font-size: 13px">LKR
                                </div>
                    </div>
                    
                    <!--Price-->
                            <div class="row">
                                <div class="d-flex align-items-sm-stretch col-xl-6 text-danger justify-content-center"
                                     style="font-weight: 900">${book.category}
                                </div>
                                
                                <div class="d-flex align-items-sm-stretch col-xl-6 text-danger justify-content-center"
                                     style="font-weight: 900">${book.price}
                                </div>
                            </div>
                    
                </div>
            </div>`;


                    $("#bookCardContainer").append(div);


                }

            }
        });


    }
});