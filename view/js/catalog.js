
ajax("catalog", showProducts);
ajax("categories", showCategories);
ajax("styles", showStyles);
ajax("materials", showMaterials);

addToBasket();
isBasket();

$(document).on("click", ".card", function (e) {
    window.location.href = "page.php?page=" + $(this).attr("data-id");
    e.stopPropagation();
})

function ajax(action, func) {
    $.ajax({
        url: "../handler/catalogHandler.php?action=" + action,
        type: "post",
        async: true,
        dataType: "json",
        success: function (data) {
            if(data.length !== 0) {
                func(data);
                console.log(data);
            } else {
                $(".catalog__products").html("Нет товаров");
            }
            console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}
function showProducts(data) {
    const body = $(".catalog__products");
    let cards = [];

    data.forEach(el => {
        const card = $('<div>', {
            class: "card",
            "data-id": el["id_product"]
        });

        const cardHeader = $('<div>', {
            class: "card__img",
        });

        const btnFavourite = $('<button>', {
            class: "btn-icon btn-icon_fav fav",
            "data-id": el["id_product"]
        });

        const cardImg = $('<div>', {
            class: "card__img-container",
        });
        cardImg.append($('<img>', {src: "img/" + el["img_path"]}));



        cardHeader.append(btnFavourite);

        cardHeader.append(cardImg);

        const cardDesc =  $('<div>', {
            class: "card__desc",
        });
        cardDesc.append($('<p>', {
            class: "card__auth",
            text: el["auther_name"]
        }));
        cardDesc.append($('<p>', {
            class: "card__title",
            text: el["title"]
        }));


        const cardPrice = $('<div>', {
            class: "card__desc-price"
        });
        const buyBtn = $('<button>', {
            class: "btn-icon btn-icon_buy buy",
            "data-id": el["id_product"]
        });

        if(+el["amount"] === 0) {
            cardPrice.append($('<p>', {
                class: "card__price",
                text: "продано " + "(" + el["price"] + " р.)"
            }));
        } else {
            cardPrice.append($('<p>', {
                class: "card__price bigger-txt",
                text: el["price"] + " р."
            }));
            cardPrice.append(buyBtn);
        }

        cardDesc.append(cardPrice);

        card.append(cardHeader);
        card.append(cardDesc);

        cards.push(card);
        body.html(cards);
    })


}

function showCategories(data) {
    showFilters(data, "category");
}

function showStyles(data) {
    showFilters(data, "style");
}
function showMaterials(data) {
    showFilters(data, "material");
}
function showFilters(data, filterName) {
    const body = $("." + filterName);
    let filters = [];

    data.forEach(el => {
        const filter = $("<div>", {
            class: "filter__check"
        });

        const input = $("<input>", {
            class: "check",
            name: filterName + "[]",
            value: el["id_"+filterName],
            type: "checkbox"
        });

        filter.append(input);
        filter.append($("<p>", {
            text: el[filterName]
        }))

        filters.push(filter);
        body.html(filters);

    })
}


