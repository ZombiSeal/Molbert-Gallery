$.ajax({
    url: "../handler/orderHandler.php?action=show",
    type: "post",
    async: true,
    dataType: "json",
    success: function (data) {
        console.log(data.products);

        if(data.length !== 0) {
            showRadio(data.delivery, "delivery");
            showRadio(data.pay, "payment");
            showBuyProducts(data.products);
            $(".order__total-price").html(calcTotalPrice(data.products) + " р.");
            $(".order__price-sale").html((calcTotalPrice(data.products)  + " р."));

        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
    }

});

$(document).on("change", "input[name='delivery']", function (e) {
    e.preventDefault();
    console.log("change");
    if($(this).val() != 1) {
        $(".adress").css({display: "block"});
    } else {
        $(".adress").css({display: "none"});

    }
});

$(".sale__form-btn").on("click", function (event) {
    event.preventDefault();
    $.ajax({
        url: "../handler/orderHandler.php?action=sale",
        type: "post",
        async: true,
        data: {sale: $(".sale__form-val").val()},
        dataType: "json",
        success: function (data) {
            if(data !== null) {
                let totalPrice = parseInt($(".order__total-price").html());
                let salePrice = totalPrice * data / 100;
                $(".order__sale").html(salePrice + " р.");
                $(".order__price-sale").html(totalPrice - salePrice + " р.")
                console.log(salePrice);
            } else {
                alert("Такого промокода нет(((");
                $(".sale__form-val").val("");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    })
})


$(".adress__form .input").on("input", function (event){
    event.preventDefault();
        $.ajax({
            url: "../handler/orderHandler.php?action=check",
            type: "post",
            async: true,
            data: {values: $(this).val()},
            dataType: "json",
            success: function(data) {
                if(data.error != "") {
                    $(event.target).css({"border": "1px solid #FF4823FF"});
                    console.log(data);
                } else {
                    $(event.target).css({"border": "1px solid #C4C4C4"});
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR,textStatus, errorThrown);
            }
        });
});

$(".order__submit").on("click", function (event) {
    event.preventDefault();
    let delivery = $(".delivery__form input:checked").val();
    let payment = $(".payment__form input:checked").val();

    let street = $(".adress__street-name").val();
    let house = $(".adress__street-house").val();
    let city = $(".adress__city").val();
    let country = $(".adress__country").val();

    let sale = $(".sale__form-val").val();

    $.ajax({
        url: "../handler/orderHandler.php?action=add",
        type: "post",
        async: true,
        data: {delivery: delivery,
                payment: payment,
                adress: {
                    street: street,
                    house:house,
                    city: city,
                    country: country
                },
                sale: sale

        },
        dataType: "json",
        success: function (data) {

            console.log(data);
            if(data.res === 1) {
                alert("Добавлено");
                window.location.href = "catalog.php";
                console.log(data);
            } else {
                alert("Заполните все поля");

                if(data.errors.delErr != "") {
                    $(".delivery__form").css({"border": "1px solid #FF4823FF"});
                } else {
                    $(".delivery__form").css({"border": "1px solid #C4C4C4"});
                }

                if(data.errors.payErr != "") {
                    $(".payment__form").css({"border": "1px solid #FF4823FF"});
                } else {
                    $(".payment__form").css({"border": "1px solid #C4C4C4"});
                }

                if(data.errors.streetErr != "") {
                    $(".adress__street-name").css({"border": "1px solid #FF4823FF"});
                } else  {
                    $(".adress__street-name").css({"border": "1px solid #C4C4C4"});
                }

                if(data.errors.houseErr != "") {
                    $(".adress__street-house").css({"border": "1px solid #FF4823FF"});
                } else  {
                    $(".adress__street-house").css({"border": "1px solid #C4C4C4"});
                }

                if(data.errors.cityErr != "") {
                    $(".adress__city").css({"border": "1px solid #FF4823FF"});
                } else  {
                    $(".adress__city").css({"border": "1px solid #C4C4C4"});
                }

                if(data.errors.countryErr != "") {
                    $(".adress__country").css({"border": "1px solid #FF4823FF"});
                } else  {
                    $(".adress__country").css({"border": "1px solid #C4C4C4"});
                }

                console.log(data.errors);
            }


            console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }

    });
})

function showRadio(data, radioName) {
    const body = $("." + radioName + "__form");
    let radios = [];

    data.forEach(el => {
        const radio = $("<div>", {
            class: "order__form-radio"
        });

        const input = $("<input>", {
            name: radioName,
            value: el["id_"+radioName],
            type: "radio"
        });

        radio.append(input);
        radio.append($("<p>", {
            text: el[radioName]
        }))

        radios.push(radio);
        body.html(radios);

    })
}
function  showBuyProducts(data) {
    const body = $(".products");

    $.each(data, function (index, el) {
        const product = $("<div>", {
            class: "order__product"
        });

        const imgContainer = $("<div>", {
            class: "img-container"
        });
        imgContainer.append($("<img>", {
            src: "img/" + el[0]["img_path"]
        }));

        product.append(imgContainer);

        const desc = $("<div>", {
            class: "order__product-desc"
        });
        desc.append($("<p>", {
            class: "order__product-desc-title",
            text: el[0]["title"]
        }));
        desc.append($("<p>", {
            class: "smaller-txt",
            text: el[0]["auther_name"]
        }));

        const size = $("<div>", {
            class: "order__product-desc-size"
        });
        size.append($("<p>", {
            text: "Размер"
        }));
        size.append($("<p>", {
            text: el[0]["width"] + " x " + el[0]["height"]
        }))

        desc.append(size);
        product.append(desc);

        const price = $("<div>" , {
            class: "order__product-price"
        });

        price.append($("<p>", {
            class: "bigger-txt",
            text: el[0]["price"] + " p."
        }))

        product.append(price);

        body.append(product);
    })

}