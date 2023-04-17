$(".input-search").on("focus", function (event) {
    ajaxSearch();
    $(".input-search").on("input", function(event) {
        event.preventDefault();
       ajaxSearch();
    });
});


$(".input-search").on("focusout", function (event) {
    event.preventDefault();
    $(".search__result").html("");
});


$(".search__form").on("submit", function( event ) {
    event.preventDefault();
    let search = $(".input-search").val();
    if((search !== "") && (search.length) > 1 ) {
        $.ajax({
            url: "../handler/searchHandler.php",
            type: "post",
            async: true,
            data: {search: search,
                    name: $(this).attr("name")},
            dataType: "json",
            success: function (data) {
                if(data.length !== 0) {
                    showProducts(data);
                    showFav();
                    resetAll();
                    console.log(data);
                } else {
                    $(".catalog__products").html("Ничего не найдено");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }

        });
    }
});

function ajaxSearch() {
    let search = $(".input-search").val();

    if((search !== "") && (search.length) > 1 ){
        $.ajax({
            url: "../handler/searchHandler.php",
            type: "post",
            async: true,
            data: {search: search,
                name: $(".input-search").attr("name")},
            dataType: "json",
            success: function(data) {
                if(data.length !== 0) {
                    getSearchData(data);
                } else {
                    $(".search__result").html("Нет товаров");
                }
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR,textStatus, errorThrown);
            }
        });
    } else {
        $(".search__result").html("");
    }
    console.log("hello");
}

function getSearchData(data) {
    const body = $(".search__result");

    let rows = [];

    data.forEach(el => {
        const row = $('<div>', {
            class: "search__row"
        });

       const rowInfo = $('<div>', {
           class: "search__info"
       }) ;

       const imgContainer = $('<div>', {
           class: "img-container"
       });

       imgContainer.append($('<img>', {
           src: "img/" + el["img_path"]
       }));

       const desc = $('<div>', {
           class: "search__desc"
       });

       desc.append($('<p>', {
           class: "search__title",
           text: el["title"]
       }));

        desc.append($('<p>', {
            class: "search__auther",
            text: el["auther_name"]
        }));

       rowInfo.append(imgContainer);
       rowInfo.append(desc);

        row.append($('<a>', {
            href: "page.php",
            class: "search__link"
        }));

        row.append(rowInfo);
        row.append($('<p>', {
            class: "search__price",
            text: el["price"] + " p."
        }));

        rows.push(row);
        body.html(rows);

    })


}

