$.ajax({
    url: "../handler/basketHandler.php?action=show",
    type: "post",
    async: true,
    dataType: "json",
    success: function (data) {
        if(data["val"] !== null) {
            showBasket(data["val"]);
            $(".total-price__val").html(calcTotalPrice(data["val"]) + " р.");

        } else {
            $(".basket__wrapper").html("Корзина пустая");
        }
        console.log(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
    }
});


$(document).on("click", ".table__close", function (event) {
    event.preventDefault();
    id_product = $(event.target).attr("data-id");
    console.log(id_product);
    $.ajax({
        url: "../handler/basketHandler.php?action=del",
        type: "post",
        async: true,
        data: {id_product: id_product},
        dataType: "json",
        success: function (data) {
            console.log(data);
            $(event.target).closest("tr").remove();
            $(".total-price__val").html(calcTotalPrice(data["val"]) + " р.");

            if(data["val"] === null) {
                $(".basket__wrapper").html("Корзина пустая");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }

    });
    event.stopPropagation();

})

function isBasket() {
    $.ajax({
        url: "../handler/basketHandler.php?action=isBasket",
        type: "post",
        async: true,
        dataType: "json",
        success: function(data) {
            if (data.length !== 0) {
                let basket = [];
                $.each(data["val"], function (index, el) {
                    basket.push(el[0]["id_product"]);
                })
                console.log(basket);

                $('.buy').each(function () {
                    if(basket.includes($(this).attr("data-id"))) {
                        $(this).attr("disabled", true);
                        $(this).html("В корзине");
                    }
                });
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR,textStatus, errorThrown);
        }
    });
}
function addToBasket(){
    $(document).on("click", ".buy", function (e) {
        e.preventDefault();

        id_product = $(e.target).attr("data-id");

        console.log(id_product);
        $.ajax({
            url: "../handler/basketHandler.php?action=add",
            type: "post",
            async: true,
            data: {id_product: id_product},
            dataType: "json",
            success: function (data) {
                console.log(data);
                if(data.login === 1) {
                    alert("LOGIN");
                    if(data.res === 1) {
                        $(e.target).attr("disabled", true);
                        $(e.target).html("В корзине");
                        alert("Добавлено в корзину");
                    } else {
                        alert("Уже в корзине");
                    }

                } else{
                    window.location.href = "login.php";
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }

        });
        console.log("buy");
        e.stopPropagation();

    })
}
function showBasket(data){
    const body = $(".table-container");

    const table = $("<table>", {
        class: "basket__table table"
    })

    const thead = $("<thead>", {
        class: "table__header"
    });

    thead.append($("<th>", {
        text: "Товар"
    }))
    thead.append($("<th>", {
        text: "Размер"
    }))
    thead.append($("<th>", {
        text: "Цена"
    }))
    thead.append($("<th>", {
        text: ""
    }))

    const tbody = $("<tbody>");
    table.append(thead);

    $.each(data, function (key, el) {
        const tr = $("<tr>");
        const td1 = $("<td>");

        const product = $("<div>", {
            class: "table__product"
        });

        const productImg = $("<div>", {
            class: "table__img-container",
        });
        productImg.append($("<img>", {
            src: "img/" + el[0]["img_path"]
        }));

        const productDesc = $("<div>", {
            class: "table__product-desc"
        });
        productDesc.append($("<p>", {
            class: "table__product-title",
            text: el[0]["title"]
        }));
        productDesc.append($("<p>", {
            class: "table__product-auther",
            text: el[0]["auther_name"]
        }));

        product.append(productImg);
        product.append(productDesc);
        td1.append(product);

        const td2 = $("<td>");
        td2.append($("<p>", {
            class: "table__size",
            text: el[0]["width"] + " x " + el[0]["height"] + " cm"
        }));


        const td4 = $("<td>");
        td4.append($("<button>", {
            class: "table__close btn-table",
            "data-id": el[0]["id_product"]
        }));

        tr.append(td1);
        tr.append(td2);
        // tr.append(td3);
        tr.append($("<td>", {
            class: "table__price",
            text: el[0]["price"]
        }));
        tr.append(td4);

        tbody.append(tr);

    })
    table.append(tbody);
    body.html(table);
}

function calcTotalPrice(data){
    let prices = [];
    $.each(data, function (index, el) {
        prices.push(+el[0]["price"])
    });

    let totalPrice = prices.reduce((acc, num) => acc + num, 0);
    return totalPrice;
}
