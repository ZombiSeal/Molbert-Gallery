$.ajax({
    url: "../handler/accountHandler.php?action=show",
    type: "get",
    data: $(location).attr("search"),
    async: true,
    dataType: "json",
    success: function (data) {
        $(".user-account__link").each( function (index, el) {
            if($(el).hasClass("user-account__link_active")) {
                $(el).removeClass("user-account__link_active");
            }
        })
        if (data["route"] === "data") {
            $(".user-account__link_data").addClass("user-account__link_active");
            let userEmail = data["info"][0]["email"];
            showData(data["info"]);
            editInfo(userEmail);
            editPass();
        }
        if (data["route"] === "order") {
            $(".user-account__link_order").addClass("user-account__link_active");
            $(document).on("click", ".accordion-header", function(e) {
                $('.accordion-body').not($(this).next()).slideUp(300);
                $(this).next().slideToggle(800);
            });
            showOrders(data["orders"]);
        }

        if (data["route"] === "fav") {
            $(".user-account__link_fav").addClass("user-account__link_active");
            console.log(data["info"]);
            if(data["info"].length !== 0) {
                isBasket();
                showFav();
                showUserFav(data["info"]);
                $(document).on("click", ".user-fav", function (e) {
                    e.preventDefault();
                    let el = e.target;
                    delFav(el);
                    console.log("eee");
                })
            } else {
                console.log("empty");
                $(".user-account__info").html("В избранном пусто");
            }
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
    }
});

function delFav(el) {
    let id_product = $(el).attr("data-id");
    console.log(id_product);
    $.ajax({
        url: "../handler/accountHandler.php?action=delFav",
        type: "post",
        async: true,
        data: {id_product: id_product},
        dataType: "json",
        success: function (data) {
            console.log(id_product);
            $(el).closest(".card").remove();
            if(data["info"] === null) {
                $(".user-account__info").html("В избранном пусто");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }

    });
}
function editInfo(userEmail) {
    checkInput();
    $(".user-account__form-data").on("submit", function( event ) {
        event.preventDefault();
        $.ajax({
            url: "../handler/accountHandler.php?action=editInfo",
            type: "post",
            async: true,
            data: {firstName: $(".firstname").val(),
                lastName: $(".lastname").val(),
                email: $(".email").val(),
                userEmail: userEmail},
            dataType: "json",
            success: function(data) {
                if(data["email"] !== "") {
                    alert(data["email"]);
                }

                if(data["res"] === 1){
                    alert("Данные изменены");
                } else {
                    alert("Что-то не так");
                }
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR,textStatus, errorThrown);
            }
        });
    });
}

function editPass() {
    checkInput();
    checkRepeatPass();
    $(".user-account__form-pass").on("submit", function( event ) {
        event.preventDefault();
        $.ajax({
            url: "../handler/accountHandler.php?action=editPass",
            type: "post",
            async: true,
            data: {userPassword: $(".user-password").val(),
                password: $(".password").val(),
                passwordRepeat: $(".repeat-password").val()},
            dataType: "json",
            success: function(data) {
                if(data["res"] === 1){
                    alert("Пароль изменены");
                } else {
                    alert("Что-то не так");
                }
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR,textStatus, errorThrown);
            }
        });
    });
}

function showData(data) {
    const body = $(".user-account__info");

    const userInfo = $("<div>", {
        class: "user-account__block"
    });
    userInfo.append($("<h2>", {text: "Личные данные"}));

    const form = $("<form>", {
        method: "post",
        class: "user-account__form-data form-inf",
        name: "inf"
    })


    const formItem1 = $("<div>", {
        class: "form-inf__item"
    })

    formItem1.append($("<label>", {
        for: "inf-firstname",
        text: "Имя"
    }));
    formItem1.append($("<input>", {
        id: "inf-firstname",
        class: "input edit firstname",
        type: "text",
        name: "firstName",
        placeholder: "Введите имя",
        value: data[0]["firstname"]
    }));
    formItem1.append($("<span>", {
        class: "error",
    }));

    const formItem2 = $("<div>", {
        class: "form-inf__item"
    })

    formItem2.append($("<label>", {
        for: "inf-lastname",
        text: "Фамилия"
    }));
    formItem2.append($("<input>", {
        id: "inf-lastname",
        class: "input edit lastname",
        type: "text",
        name: "lastName",
        placeholder: "Введите фамилию",
        value: data[0]["lastname"]
    }));
    formItem2.append($("<span>", {
        class: "error",
    }));


    const formItem3 = $("<div>", {
        class: "form-inf__item"
    })

    formItem3.append($("<label>", {
        for: "inf-email",
        text: "E-mail"
    }));
    formItem3.append($("<input>", {
        id: "inf-email",
        class: "input edit email",
        type: "text",
        name: "email",
        placeholder: "Введите e-mail",
        value: data[0]["email"]
    }));
    formItem3.append($("<span>", {
        class: "error",
    }));

    form.append(formItem1);
    form.append(formItem2);
    form.append(formItem3);

    form.append($("<input>", {
        type: "submit",
        class: "btn user-account__btn",
        value: "Изменить"
    }))

    userInfo.append(form);
    body.append(userInfo);




    const userPassword = $("<div>", {
        class: "user-account__block"
    });
    userPassword.append($("<h2>", {text: "Смена пароля"}));

    const formPass = $("<form>", {
        method: "post",
        class: "user-account__form-pass form-inf",
        name: "inf"
    })


    const formItemPass1 = $("<div>", {
        class: "form-inf__item"
    })

    formItemPass1.append($("<label>", {
        for: "inf-user-pass",
        text: "Ваш текущий пароль"
    }));
    formItemPass1.append($("<input>", {
        id: "inf-user-pass",
        class: "input user-password",
        type: "password",
        name: "user-password",
        placeholder: "Введите ваш пароль",
    }));
    formItemPass1.append($("<span>", {
        class: "error",
    }));

    const formItemPass2 = $("<div>", {
        class: "form-inf__item"
    })

    formItemPass2.append($("<label>", {
        for: "inf-password",
        text: "Новый пароль"
    }));
    formItemPass2.append($("<input>", {
        id: "inf-password",
        class: "input edit password",
        type: "password",
        name: "password",
        placeholder: "Введите новый пароль",
    }));
    formItemPass2.append($("<span>", {
        class: "error",
    }));


    const formItemPass3 = $("<div>", {
        class: "form-inf__item"
    })

    formItemPass3.append($("<label>", {
        for: "inf-pass-repeat",
        text: "Повторите новый пароль"
    }));
    formItemPass3.append($("<input>", {
        id: "inf-pass-repeat",
        class: "input repeat-password",
        type: "password",
        name: "passwordRepeat",
        placeholder: "Повторите пароль",
    }));
    formItemPass3.append($("<span>", {
        class: "error",
    }));

    formPass.append(formItemPass1);
    formPass.append(formItemPass2);
    formPass.append(formItemPass3);

    formPass.append($("<input>", {
        type: "submit",
        class: "btn user-account__btn",
        value: "Изменить"
    }))

    userPassword.append(formPass);
    body.append(userPassword);
}

function showOrders(data) {
    const body = $(".user-account__info");
    body.css({display:"block"});

    const header = $("<div>", {
        class: "order-header"
    });
    header.append($("<p>", {
        text: "Дата"
    } ));
    header.append($("<p>", {
        text: "Номер заказа"
    } ));
    header.append($("<p>", {
        text: "Статус заказа"
    } ))

    body.append(header);

    let orders = [];
    console.log(data);

    for(key in data) {
        // console.log(data[key]);
        // return;
        const accordion= $("<div>", {
            class: "accordion"
        });

        const accTitle = $("<div>", {
            class: "accordion-header"
        })

        accTitle.append($("<p>", {
            text: data[key]["date"]
        }))
        accTitle.append($("<p>", {
            text: key
        }))
        accTitle.append($("<p>", {
            text: data[key]["status"]
        }))

        accordion.append(accTitle);

        const accBody = $("<div>", {
            class: "accordion-body",
        });

        let products = [];
        data[key]["info"].forEach(el => {
            const product = $("<div>", {
                class: "order__product order__product_acc"
            });

            const imgContainer = $("<div>", {
                class: "img-container"
            });
            imgContainer.append($("<img>", {
                src: "img/" + el["img_path"]
            }));

            product.append(imgContainer);

            const desc = $("<div>", {
                class: "order__product-desc"
            });
            desc.append($("<p>", {
                class: "order__product-desc-title",
                text: el["title"]
            }));
            desc.append($("<p>", {
                class: "smaller-txt",
                text: el["auther_name"]
            }));


            product.append(desc);

            const price = $("<div>" , {
                class: "order__product-price"
            });

            price.append($("<p>", {
                class: "bigger-txt",
                text: el["price"] + " p."
            }))

            product.append(price);

            const sale = $("<div>" , {
                class: "sale",
            });

            sale.append($("<p>", {
                text: "-" + (el["price"] * el["sale"]/100) + " p."
            }))


            price.append(sale);
            products.push(product);

        })


        accBody.append(products);
        accordion.append(accBody);

        orders.push(accordion);
    }

    body.append(orders);


}

function showUserFav(data) {
    const body = $(".user-account__info");
    body.css({display: "grid", "grid-template-columns": "repeat(3, 1fr)", gap:"20px"})
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
            class: "btn-icon btn-icon_fav fav user-fav",
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
