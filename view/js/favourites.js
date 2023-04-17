showFav();

checkFav();
function checkFav() {
    $(document).on("click", ".fav", function (e) {
        e.preventDefault();
        id_product = $(e.target).attr("data-id");
        $.ajax({
            url: "../handler/favHandler.php?action=fav",
            type: "post",
            async: true,
            data: {id_product: id_product},
            dataType: "json",
            success: function(data) {
                console.log(data);
                if(data.login === 1) {
                    alert("LOGIN");
                    if(data.res === 1) {
                        $(e.target).addClass("active");
                        alert("Добавлено в избранное");
                    } else {
                        $(e.target).removeClass("active");
                        alert("Удалено из избранного");
                    }

                } else{
                    window.location.href = "login.php";
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR,textStatus, errorThrown);
            }
        });
        e.stopPropagation();
    })
}

function showFav() {
    $.ajax({
        url: "../handler/favHandler.php?action=isFav",
        type: "post",
        async: true,
        dataType: "json",
        success: function(data) {
            if (data.length !== 0) {
                $('.fav').each(function () {
                    data.forEach(el => {
                        if (el["id_product"] === $(this).attr("data-id")) {
                            $(this).addClass("active");
                        }
                    })
                });
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR,textStatus, errorThrown);
        }
    });
}

