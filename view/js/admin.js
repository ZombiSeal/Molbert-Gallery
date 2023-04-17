$(document).on("click", ".popup-close", function(e) {
    e.preventDefault();
    $(this).parents('.popup-fade').fadeOut();
    return false;
})
$(document).on("input", ".number",function(e){
    e.preventDefault();
    $(this).val( $(this).val().replace(/[^\d]/gi, ""));
})

$(document).on("input", ".input", function (event){
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

$.ajax({
    url: "../handler/adminHandler.php?action=show",
    type: "get",
    data: $(location).attr("search"),
    async: true,
    dataType: "json",
    success: function (data) {
        console.log(data);
        $(".user-account__link").each( function (index, el) {
            if($(el).hasClass("user-account__link_active")) {
                $(el).removeClass("user-account__link_active");
            }
        })
        if (data["route"] === "users") {
            $(".user-account__link_data").addClass("user-account__link_active");
            showUsers(data["data"]);
            $(document).on("click", ".del-user", function (e) {
                e.preventDefault();
                let el = $(e.target);
                let answer = confirm("Хотите удалить пользователя?");
                if (answer) {
                    del(el,"delUser", "user-id")
                    console.log("del");
                }
            })
        }
        if(data["route"] === "products") {
            $(".user-account__link_products").addClass("user-account__link_active");
            showProducts(data["data"]);

            $(document).on("click", ".product-btn.del-btn", function (e) {
                e.preventDefault();
                let el = $(e.target);
                let answer = confirm("Хотите удалить товар? Все заказы с этим товаром также будут удалены.");
                if (answer) {
                    del(el,"delProduct", "product-id")
                    console.log("del");
                }
            })


            $(document).on("click", ".edit-btn.popup-open", function(e) {
                e.preventDefault();
                $('.popup-fade').remove();
                let productId = $(this).closest("tr").find(".td-id").html()
                let title = $(this).closest("tr").find(".td-title").html();
                let img = $(this).closest("tr").find(".td-img").html();
                let desc = $(this).closest("tr").find(".td-desc").html();
                let price = $(this).closest("tr").find(".td-price").html();
                let amount = $(this).closest("tr").find(".td-amount").html();
                let autherId = $(this).closest("tr").find(".td-auther").attr("id-auther");
                let categoryId = $(this).closest("tr").find(".td-cat").attr("id-category");
                let styleId = $(this).closest("tr").find(".td-style").attr("id-style");
                let materialId = $(this).closest("tr").find(".td-material").attr("id-material");
                let sizeId = $(this).closest("tr").find(".td-size").attr("id-size");


                let info = {action: "update",
                    id: productId,
                    title: title,
                    img: img,
                    desc:desc,
                    price:price,
                    auther: [autherId, data["authers"]],
                    category: [categoryId, data["categories"]],
                    style: [styleId, data["styles"]],
                    material: [materialId, data["materials"]],
                    size: [sizeId, data["sizes"]],
                    amount: amount
                };

                console.log(info["material"][1]);
                createPopup(info, createBodyPopupProduct);
                $('.popup-fade').fadeIn();
                return false;
            })

            $(document).on("click", ".add-btn.popup-open", function (e) {
                e.preventDefault();
                $('.popup-fade').remove();
                let info = {action: "add",
                    id: "",
                    title: "",
                    img: "",
                    desc:"",
                    price:"",
                    auther: ["", data["authers"]],
                    category: ["", data["categories"]],
                    style: ["", data["styles"]],
                    material: ["", data["materials"]],
                    size: ["", data["sizes"]],
                    amount: 1
                };

                console.log(info["material"][1]);
                createPopup(info, createBodyPopupProduct);
                $('.popup-fade').fadeIn();
                return false;

            })

            $(document).on("click", ".popup-edit", function(e) {
                e.preventDefault();
                edit("editProduct","product", e, checkProduct, createRow);
            })

        }

        if(data["route"] === "authers") {
            $(".user-account__link_authers").addClass("user-account__link_active");

            showAuthers(data["authers"]);

            $(document).on("click", ".update-btn", function(e) {
                e.preventDefault();
                let autherId = $(this).closest("tr").find(".td-id").html()
                let name = $(this).closest("tr").find(".td-auther").html();

                $(".auther-form").attr("action", "update");
                $(".form-wrapper h2").html("Изменить автора");
                $(".auther-name").val(name);
                $(".auther-form input[type='hidden']").val(autherId);

                $(".btn-wrapper").prepend($("<input>", {
                    class: "btn-white close-btn brn-wrapper-item",
                    value: "Отмена",
                    type: "submit"
                }))

            })

            $(document).on("click", ".close-btn", function(e) {
                e.preventDefault();
                $(".auther-form").attr("action", "add");
                $(".form-wrapper h2").html("Добавить автора");
                $(".auther-name").val("");
                $(".close-btn").remove();
            })

            $(document).on("click", ".edit-btn", function(e) {
                e.preventDefault();
                edit("editAuther","auther", e, checkAuther, createAutherRow);
                $(".auther-form").attr("action", "add");
                $(".form-wrapper h2").html("Добавить автора");
                $(".auther-name").val("");
                $(".close-btn").remove();
            })

            $(document).on("click", ".auther-btn.del-btn", function (e) {
                e.preventDefault();
                let el = $(e.target);
                let answer = confirm("Хотите удалить автора? Все товары и все, связанное с ними, также будут удалены.");
                if (answer) {
                    del(el,"delAuther", "auther-id");
                    console.log("del");
                }
            })
        }
        if(data["route"] === "sales") {
            $(".user-account__link_sales").addClass("user-account__link_active");

            showSales(data["sales"]);

            $(document).on("click", ".edit-btn", function(e) {
                e.preventDefault();
                edit("editSale","sale", e, checkSale, createSaleRow);
            })

            $(document).on("click", ".close-btn", function(e) {
                e.preventDefault();
                $(".code").val("");
                $(".sale").val("");
            })

            $(document).on("click", ".sale-btn.del-btn", function (e) {
                e.preventDefault();
                let el = $(e.target);
                let answer = confirm("Хотите удалить скидку?");
                if (answer) {
                    del(el,"delSale", "sale-id");
                    console.log("del");
                }
            })
        }

        if(data["route"] === "orders") {
            $(".user-account__link_order").addClass("user-account__link_active");
            console.log(data);
            showOrders(data["orders"], data["statuses"]);

            $(document).on("change", ".select-status", function(e) {
                e.preventDefault();
                let id_info = $(this).closest("tr").find(".td-num").attr("id_info");
                $.ajax({
                    url: "../handler/adminHandler.php?action=editOrder",
                    type: "post",
                    async: true,
                    data: {id_info: id_info, id_status: $(this).val()},
                    success: function() {
                        alert("Изменено");
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert("Что-то не так");
                        console.log(jqXHR,textStatus, errorThrown);
                    }
                });
            })
            //
            //
            // $(document).on("click", ".edit-btn", function(e) {
            //     e.preventDefault();
            //     console.log(edit("editSale","sale", e, checkSale, createSaleRow));
            // })
            //
            // $(document).on("click", ".close-btn", function(e) {
            //     e.preventDefault();
            //     $(".code").val("");
            //     $(".sale").val("");
            // })
            //
            // $(document).on("click", ".sale-btn.del-btn", function (e) {
            //     e.preventDefault();
            //     let el = $(e.target);
            //     let answer = confirm("Хотите удалить скидку?");
            //     if (answer) {
            //         del(el,"delSale", "sale-id");
            //         console.log("del");
            //     }
            // })
        }
        },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
    }
});

function edit(action,el, e, check, row) {
    $.ajax({
        url: "../handler/adminHandler.php?action=" + action,
        type: "post",
        async: true,
        data: {formAction: $("." + el + "-form").attr("action"),
            values: $("." + el + "-form").serialize()},
        dataType: "json",
        success: function(data) {
            // console.log(data);
            // return;
            if(data["act"] === "update"){
                if(data[el] !== null) {
                    alert("Изменено");
                    $("td[id_" + el + "=" + data[el][0]["id_" + el] + "]").closest("tr").replaceWith(row(data[el][0]));
                    $(e.target).parents('.popup-fade').fadeOut();
                } else {
                    alert("Запоните поля");
                    сheck(data["errors"]);
                }
            }
            if(data["act"] === "add"){
                if(data[el] !== null) {
                    alert("Добавлено");
                    $("tbody").prepend(row(data[el][0]));
                    $(e.target).parents('.popup-fade').fadeOut();
                } else {
                    alert("Запоните поля");
                    check(data["errors"]);
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Что-то не так");
            console.log(jqXHR,textStatus, errorThrown);
        }
    })
}
function del(el, action, attr) {
    console.log(el);
    $.ajax({
        url: "../handler/adminHandler.php?action=" + action,
        type: "post",
        async: true,
        data: {id: $(el).attr(attr)},
        dataType: "json",
        success: function(data) {
            $(el).closest("tr").remove();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Что-то не так");
            console.log(jqXHR,textStatus, errorThrown);
        }
    });
}

function showUsers(data) {
    const body = $(".user-account__info");
    const table = $("<table>", {
        class: "admin__table users-table"
    });

    const thead = $("<thead>", {
    });

    thead.append($("<th>", {
        text: "id"
    }))
    thead.append($("<th>", {
        text: "Имя"
    }))
    thead.append($("<th>", {
        text: "Фамилия"
    }))
    thead.append($("<th>", {
        text: "Email"
    }))

    thead.append($("<th>", {
        text: "Действие"
    }))
    const tbody = $("<tbody>");

    data.forEach(el => {
        console.log(el);
        const tr = $("<tr>");
        tr.append($("<td>", {
            text: el["id_user"]
        }))
        tr.append($("<td>", {
            text: el["firstname"]
        }))
        tr.append($("<td>", {
            text: el["lastname"]
        }))
        tr.append($("<td>", {
            text: el["email"]
        }))
        tr.append($("<td>", {class: "actions-btn"}).append($("<button>", {
            class: "del-user table-btn btn smaller-txt",
            "user-id": el["id_user"],
            text: "Удалить"
        })))

        tbody.append(tr);

    })

    table.append(thead);
    table.append(tbody);

    body.append(table);
}
function showProducts(data) {
    const body = $(".user-account__info");
    body.addClass("products-info");
    const table = $("<table>", {
        class: "admin__table table-product"
    });

    const thead = $("<thead>", {
    });

    thead.append($("<th>", {
        text: "id"
    }))
    thead.append($("<th>", {
        text: "Название"
    }))
    thead.append($("<th>", {
        text: "Изображение"
    }))
    thead.append($("<th>", {
        text: "Описание"
    }))

    thead.append($("<th>", {
        text: "Цена"
    }))

    thead.append($("<th>", {
        text: "Автор"
    }))

    thead.append($("<th>", {
        text: "Категория"
    }))

    thead.append($("<th>", {
        text: "Стиль"
    }))
    thead.append($("<th>", {
        text: "Материал"
    }))
    thead.append($("<th>", {
        text: "Размер"
    }))
    thead.append($("<th>", {
        text: "Продажа"
    }))
    thead.append($("<th>", {
        text: "Действие"
    }))
    const tbody = $("<tbody>");

    data.forEach(el => {
        tbody.append(createRow(el));
    })

    table.append(thead);
    table.append(tbody);

    body.append(table);
}

function showAuthers(data) {
    const body = $(".user-account__info");
    body.addClass("auther-info info");

    const tableWrapper = $("<div>", {class: "table-wrapper"});
    const table = $("<table>", {
        class: "admin__table table-auther"
    });

    const thead = $("<thead>", {
    });

    thead.append($("<th>", {
        text: "id"
    }))
    thead.append($("<th>", {
        text: "Автор"
    }))
    thead.append($("<th>", {
        text: "Действие"
    }))

    const tbody = $("<tbody>");

    data.forEach(el => {
        console.log(el);
        tbody.append(createAutherRow(el));
    })

    table.append(thead);
    table.append(tbody);

    tableWrapper.append(table);

    const formWrapper = $("<div>", {class: "form-wrapper"});
    formWrapper.append($("<h2>", {text: "Добавить автора"}));
    formWrapper.append(createAutherForm(data, data["action"] = "add"))
    body.append(tableWrapper);
    body.append(formWrapper);
}

function showSales(data) {
    const body = $(".user-account__info");
    body.addClass("sale-info info");

    const tableWrapper = $("<div>", {class: "table-wrapper"});
    const table = $("<table>", {
        class: "admin__table table-sale"
    });

    const thead = $("<thead>", {
    });

    thead.append($("<th>", {
        text: "id"
    }))
    thead.append($("<th>", {
        text: "Промокод"
    }))
    thead.append($("<th>", {
        text: "Скидка(%)"
    }))
    thead.append($("<th>", {
        text: "Действие"
    }))

    const tbody = $("<tbody>");

    data.forEach(el => {
        console.log(el);
        tbody.append(createSaleRow(el));
    })

    table.append(thead);
    table.append(tbody);

    tableWrapper.append(table);

    const formWrapper = $("<div>", {class: "form-wrapper"});
    formWrapper.append($("<h2>", {text: "Добавить промокод"}));
    formWrapper.append(createSaleForm(data));
    body.append(tableWrapper);
    body.append(formWrapper);
}
function showOrders(data, statuses) {
    const body = $(".user-account__info");
    body.addClass("order-info info");

    const table = $("<table>", {
        class: "admin__table table-order"
    });

    const thead = $("<thead>", {
    });

    thead.append($("<th>", {
        text: "Номер заказа"
    }))
    thead.append($("<th>", {
        text: "Статус"
    }))

    const tbody = $("<tbody>");

    data.forEach(el => {
        console.log(el);
        tbody.append(createOrderRow(el, statuses));
    })

    table.append(thead);
    table.append(tbody)
    body.append(table);
}

function createRow(el) {
    console.log(el);
    const tr = $("<tr>");
    tr.append($("<td>", {
        class: "td-id",
        "id_product": el["id_product"],
        text: el["id_product"]
    }))
    tr.append($("<td>", {
        class: "td-title",
        text: el["title"]
    }))
    tr.append($("<td>", {
        class: "td-img",
        text: el["img_path"]
    }))
    tr.append($("<td>").append($("<div>", {
        class: "admin__product-desc td-desc",
        text: el["description"]
    })))
    tr.append($("<td>", {
        class: "td-price",
        text: el["price"]
    }))
    tr.append($("<td>", {
        class: "td-auther",
        "id-auther": el["id_auther"],
        text: el["auther_name"]
    }))
    tr.append($("<td>", {
        class: "td-cat",
        "id-category": el["id_category"],
        text: el["category"]
    }))
    tr.append($("<td>", {
        class: "td-style",
        "id-style": el["id_style"],
        text: el["style"]
    }))
    tr.append($("<td>", {
        class: "td-material",
        "id-material": el["id_material"],
        text: el["material"]
    }))
    tr.append($("<td>", {
        class: "td-size",
        "id-size": el["id_size"],
        text: el["width"] + " x " + el["height"]
    }))
    tr.append($("<td>", {
        class: "td-amount",
        text: el["amount"]
    }))

    const btns = $("<div>", {class: "admin__btn-cont"});
    btns.append($("<button>", {
        class: "product-btn add-btn table-btn btn smaller-txt popup-open",
        text: "Добавить"
    }))
    btns.append($("<button>", {
        class: "product-btn del-btn table-btn btn smaller-txt",
        "product-id": el["id_product"],
        text: "Удалить"
    }))
    btns.append($("<button>", {
        class: "product-btn edit-btn table-btn btn smaller-txt popup-open",
        "product-id": el["id_product"],
        text: "Изменить"
    }))

    tr.append($("<td>").append(btns));

    return tr;
}
function createAutherRow(el) {
    const tr = $("<tr>");
    tr.append($("<td>", {
        class: "td-id",
        "id_auther": el["id_auther"],
        text: el["id_auther"]
    }))
    tr.append($("<td>", {
        class: "td-auther",
        text: el["auther_name"]
    }))

    const btns = $("<div>", {class: "admin__btn-cont"});

    btns.append($("<button>", {
        class: "auther-btn del-btn table-btn btn smaller-txt",
        "auther-id": el["id_auther"],
        text: "Удалить"
    }))
    btns.append($("<button>", {
        class: "auther-btn update-btn table-btn btn smaller-txt popup-open",
        "product-id": el["id_product"],
        text: "Изменить"
    }))

    tr.append($("<td>").append(btns));
    return tr;
}
function createSaleRow(el) {
    const tr = $("<tr>");
    tr.append($("<td>", {
        class: "td-id",
        "id_sale": el["id_sale"],
        text: el["id_sale"]
    }))
    tr.append($("<td>", {
        class: "td-code",
        text: el["_code"]
    }))
    tr.append($("<td>", {
        class: "td-sale",
        text: el["sale"]
    }))

    const btns = $("<div>", {class: "admin__btn-cont"});

    btns.append($("<button>", {
        class: "sale-btn del-btn table-btn btn smaller-txt",
        "sale-id": el["id_sale"],
        text: "Удалить"
    }))

    tr.append($("<td>").append(btns));
    return tr;
}

function createOrderRow(el, data) {
    const tr = $("<tr>");
    tr.append($("<td>", {
        class: "td-num",
        "id_info": el["id_info"],
        text: el["order_number"]
    }))

    const select = $("<select>", {
        id: "status",
        class: "input select-status",
        name: "_status",
    })

    data.forEach(st => {
        console.log(data);
        const option = $("<option>", {
            value:st["id_status"],
            text: st["id_status"] + " - " + st["_status"]
        });

        if(st["id_status"] === el["id_status"]) {
            option.attr("selected", true);
        }
        select.append(option);
    });

    tr.append($("<td>", {
        class: "td-status",
    }).append(select));


    return tr;
}


function createAutherForm(data) {
    const form = $("<form>", {
        class: "auther-form edit-form",
        action: "add"
    })

    const body = $("<div>", {
        class: "auther-body"
    })

    const item0 = $("<input>", {
        type: "hidden",
        name: "id_auther",
        value: data["id"]
    });


    const item1 = $("<div>", {class: "form__item"});
    item1.append($("<label>", {
        for: "auther",
        text: "Автор"
    }));
    item1.append($("<input>", {
        id: "auther",
        class: "input auther-name",
        type: "text",
        name: "auther",
        placeholder: "Введите название",
        value: data["auther_name"]
    }));


    body.append(item0);
    body.append(item1);

    const btnWrapper = $("<div>", {class: "btn-wrapper"});
    btnWrapper.append($("<input>", {
        class: "btn-white edit-btn btn-wrapper-item",
        value: "Сохранить",
        type: "submit"
    }))
    body.append(btnWrapper);
    form.append(body);
    return form;
}

function createSaleForm(data) {
    const form = $("<form>", {
        class: "sale-form edit-form",
        action: "add"
    })

    const body = $("<div>", {
        class: "sale-body"
    })

    const item0 = $("<input>", {
        type: "hidden",
        name: "id_sale",
        value: data["id"]
    });


    const item1 = $("<div>", {class: "form__item"});
    item1.append($("<label>", {
        for: "code",
        text: "Промокод"
    }));
    item1.append($("<input>", {
        id: "code",
        class: "input code",
        type: "text",
        name: "code",
        placeholder: "Введите промокод",
        value: data["_code"]
    }));

    const item2 = $("<div>", {class: "form__item"});
    item2.append($("<label>", {
        for: "sale",
        text: "Скидка"
    }));
    item2.append($("<input>", {
        id: "sale",
        class: "input sale  number",
        type: "text",
        name: "sale",
        placeholder: "Введите скидку",
        value: data["sale"]
    }));

    body.append(item0);
    body.append(item1);
    body.append(item2);


    const btnWrapper = $("<div>", {class: "btn-wrapper"});
    btnWrapper.append($("<input>", {
        class: "btn-white close-btn btn-wrapper-item",
        value: "Отмена",
        type: "submit"
    }))
    btnWrapper.append($("<input>", {
        class: "btn-white edit-btn btn-wrapper-item",
        value: "Сохранить",
        type: "submit"
    }))

    body.append(btnWrapper);
    form.append(body);
    return form;
}
function checkProduct(data) {
    if(data.titleErr != "") {
        $(".product-title").css({"border": "1px solid #FF4823FF"});
    } else {
        $(".product-title").css({"border": "1px solid #C4C4C4"});
    }

    if(data.imgErr != "") {
        $(".product-img").css({"border": "1px solid #FF4823FF"});
    } else {
        $(".product-img").css({"border": "1px solid #C4C4C4"});
    }

    if(data.descErr != "") {
        $(".product-desc").css({"border": "1px solid #FF4823FF"});
    } else  {
        $(".product-desc").css({"border": "1px solid #C4C4C4"});
    }

    if(data.priceErr != "") {
        $(".product-price").css({"border": "1px solid #FF4823FF"});
    } else  {
        $(".product-price").css({"border": "1px solid #C4C4C4"});
    }
}

function checkAuther(data) {
    if(data.nameErr != "") {
        $(".auther-name").css({"border": "1px solid #FF4823FF"});
    } else {
        $(".auther-name").css({"border": "1px solid #C4C4C4"});
    }

}

function checkSale(data) {
    if(data.codeErr != "" || data.dbCodeErr != "") {
        $(".code").css({"border": "1px solid #FF4823FF"});
    } else {
        $(".code").css({"border": "1px solid #C4C4C4"});
    }

    if(data.saleErr != "") {
        $(".sale").css({"border": "1px solid #FF4823FF"});
    } else {
        $(".sale").css({"border": "1px solid #C4C4C4"});
    }

}


function createBodyPopupProduct(data) {
    const form = $("<form>", {
        class: "product-form",
        action: data["action"]
    })

    const body = $("<div>", {
        class: "product-body"
    })

    const wrapper1 = $("<div>", {class: "popup__wrapper"});

    const item0 = $("<input>", {
        type: "hidden",
        name: "id_product",
        value: data["id"]
    });

    wrapper1.append(item0);


    const item1 = $("<div>", {class: "form__item"});
    item1.append($("<label>", {
        for: "title",
        text: "Название"
    }));
    item1.append($("<input>", {
        id: "title",
        class: "input product-title",
        type: "text",
        name: "title",
        placeholder: "Введите название",
        value: data["title"]
    }));

    const item2 = $("<div>", {class: "form__item"});
    item2.append($("<label>", {
        for: "img",
        text: "Изображение"
    }));
    item2.append($("<input>", {
        id: "img",
        class: "input product-img",
        type: "text",
        name: "img_path",
        placeholder: "Введите изоражение",
        value: data["img"]
    }));

    const item3 = $("<div>", {class: "form__item"});
    item3.append($("<label>", {
        for: "desc",
        text: "Описание"
    }));
    item3.append($("<textarea>", {
        id: "desc",
        class: "input product-desc",
        name: "description",
        placeholder: "Введите описание",
        text: data["desc"]
    }));

    const item4 = $("<div>", {class: "form__item"});
    item4.append($("<label>", {
        for: "price",
        text: "Цена"
    }));
    item4.append($("<input>", {
        id: "price",
        class: "input product-price number",
        type: "text",
        name: "price",
        placeholder: "Введите цену",
        value: data["price"]
    }));



    const item10 = $("<div>", {class: "form__item"});
    item10.append($("<label>", {
        text: "Продажа"
    }));

    const radioWrapper1 = $("<div>", {
        class: "form-radio"
    });
    const radioWrapper2 = $("<div>", {
        class: "form-radio"
    });

    const radio1 = $("<input>", {
        class: "product-amount",
        type: "radio",
        name: "amount",
        value: 1
    })
    radioWrapper1.append(radio1);

    radioWrapper1.append($("<p>", {
        text: "в наличии",
    }));

    const radio2 = $("<input>", {
        class: "product-amount",
        type: "radio",
        name: "amount",
        value: 0
    })

    radioWrapper2.append(radio2);
    radioWrapper2.append($("<p>", {
        text: "продано",
    }));

    if(data["amount"] == 1) {
        $(radio1).prop("checked", true);
    } else if (data["amount"] == 0) {
        $(radio2).prop("checked", true);
    } else {
        $(radio1).prop("checked", false);
        $(radio2).prop("checked", false);

    }


    item10.append(radioWrapper1);
    item10.append(radioWrapper2);



    wrapper1.append(item1);
    wrapper1.append(item2);
    wrapper1.append(item3);
    wrapper1.append(item4);
    wrapper1.append(item10);


    const wrapper2 = $("<div>", {class: "popup__wrapper"});

    const item5 = $("<div>", {class: "form__item"});
    item5.append($("<label>", {
        for: "auther",
        text: "Автор"
    }));

    item5.append(createSelect("auther", data, "_name"));

    const item6 = $("<div>", {class: "form__item"});
    item6.append($("<label>", {
        for: "category",
        text: "Автор"
    }));
    item6.append(createSelect("category", data));

    const item7 = $("<div>", {class: "form__item"});
    item7.append($("<label>", {
        for: "style",
        text: "Стиль"
    }));
    item7.append(createSelect("style", data));

    const item8 = $("<div>", {class: "form__item"});
    item8.append($("<label>", {
        for: "material",
        text: "Материал"
    }));
    item8.append(createSelect("material", data));

    const item9 = $("<div>", {class: "form__item"});
    item9.append($("<label>", {
        for: "size",
        text: "Размер"
    }));

    const select = $("<select>", {
        id: "size",
        class: "input product-size",
        name: "size",
    })

    data["size"][1].forEach(el => {
        const option = $("<option>", {
            value:el["id_size"],
            text: el["id_size"] + " - " + el["width"] + " x " + el["height"]
        });

        if(el["id_size"] === data["size"][0]) {
            option.attr("selected", true);
        }
        select.append(option);
    });
    item9.append(select);


    wrapper2.append(item5);
    wrapper2.append(item6);
    wrapper2.append(item7);
    wrapper2.append(item8);
    wrapper2.append(item9);



    body.append(wrapper1);
    body.append(wrapper2);

    form.append(body);
    return form;
}



function createSelect(elName, data, smth = ""){
    const select = $("<select>", {
        id: elName,
        class: "input product-" + elName,
        name: elName,
    })

    data[elName][1].forEach(el => {
        const option = $("<option>", {
            value:el["id_" + elName],
            text: el["id_" + elName] + " - " + el[elName + smth]
        });

        if(el["id_" + elName] === data[elName][0]) {
            option.attr("selected", true);
        }
        select.append(option);
    });
    return select;
}
function createPopup(data, func) {
    const body = $(".user-account__info");
    const popupFade = $("<div>", {class: "popup-fade"});
    const popup = $("<div>",{class: "popup"});
    popup.append($("<h2>", {text: "Изменить"}))

    popup.append(func(data));
    const popupBtns = $("<div>", {class: "popup__btn"});

    popupBtns.append($("<button>", {
        class: "popup__btn-item popup-close btn-white",
        text: "Отмена"
    }))
    popupBtns.append($("<input>", {
        class: "popup__btn-item popup-edit btn",
        value: "Сохранить",
        type: "submit"
    }))

    popup.append(popupBtns);
    popupFade.append(popup);
    body.append(popupFade);
}