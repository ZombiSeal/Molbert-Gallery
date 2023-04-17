$.ajax({
    url: "../handler/pageHandler.php",
    type: "get",
    async: true,
    data: $(location).attr("search"),
    dataType: "json",
    success: function(data) {
        console.log(data);
        showFav();
        isBasket();
        addToBasket();
        showProductPage(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR,textStatus, errorThrown);
    }
});

function showProductPage(data) {
    const body = $(".page");
    const pageMainInfo = $("<div>", {
        class: "page__main-inf"
    });

    const imgContainer = $("<div>", {
        class: "img-container"
    })
    imgContainer.append($("<img>", {
        src: "img/" + data["img_path"]
    }))

    const infContainer = $("<div>", {
        class: "page__inf-container"
    });

    infContainer.append($("<h2>", {
        class: "page__product-title",
        text: data["title"]
    }))
    infContainer.append($("<p>", {
        class: "page__product-auther",
        text: data["auther_name"]
    }))

    const cardPrice = $('<div>', {
        class: "card__desc-price"
    });

    const btnCont = $("<div>", {
        class: "btn-container"
    });

    const buyBtn = $('<button>', {
        class: "btn-white buy",
        text:"Купить",
        "data-id": data["id_product"]
    });

    if(+data["amount"] === 0) {
        cardPrice.append($('<p>', {
            class: "card__price",
            text: "продано " + "(" + data["price"] + " р.)"
        }));
    } else {
        cardPrice.append($('<p>', {
            class: "card__price bigger-txt",
            text: data["price"] + " р."
        }));
        btnCont.append(buyBtn);
    }

    infContainer.append(cardPrice);




    const btnFavourite = $('<button>', {
        class: "btn-icon btn-icon_fav fav",
        "data-id": data["id_product"],
    });


    btnCont.append(btnFavourite);

    infContainer.append(btnCont);

    pageMainInfo.append(imgContainer);
    pageMainInfo.append(infContainer);

    const pageMainDesc = $("<div>", {
        class: "page__desc"
    });

    const pageDetail = $("<div>", {
        class: "page__desc-item"
    })
    pageDetail.append($("<h2>", {
        text: "Детали"
    }));

    const table = $("<table>", {
        class: "page__table"
    })

    const tbody = $("<tbody>");


    const tr1 = $("<tr>");

    tr1.append($("<td>", {
        text: "Категория"
    }));
    tr1.append($("<td>", {
        text: data["category"]
    }))

    const tr2 = $("<tr>");
    tr2.append($("<td>", {
        text: "Стиль"
    }));
    tr2.append($("<td>", {
        text: data["style"]
    }))

    const tr3 = $("<tr>");
    tr3.append($("<td>", {
        text: "Материал"
    }));
    tr3.append($("<td>", {
        text: data["material"]
    }))

    const tr4 = $("<tr>");
    tr4.append($("<td>", {
        text: "Размер"
    }));
    tr4.append($("<td>", {
        text: data["width"] + " x " + data["height"] + " см"
    }))

    tbody.append(tr1);
    tbody.append(tr2);
    tbody.append(tr3);
    tbody.append(tr4);


    table.append(tbody);

    pageDetail.append(table);

    const pageDesc = $("<div>", {
        class: "page__desc-item"
    })
    pageDesc.append($("<h2>", {
        text: "Описание"
    }))
    pageDesc.append($("<div>", {text: data["description"]}))

    pageMainDesc.append(pageDetail);
    pageMainDesc.append(pageDesc);

    body.append(pageMainInfo);
    body.append(pageMainDesc)
}