$(".reset").on("click", (e) => {
    e.preventDefault();
    resetAll();

})

let priceFrom = $(".price-from");
let priceTo = $(".price-to");

priceFrom.on("input", function (event) {
    event.preventDefault();
    priceFrom.val( priceFrom.val().replace(/[^\d]/gi, ""));

});

priceTo.on("input", function (event) {
    event.preventDefault();
    priceTo.val( priceTo.val().replace(/[^\d]/gi, ""));
})

$(".filter__form").on("submit", function (event) {
    event.preventDefault();

    getData();
})

$(".short").on("change", function (event) {
    event.preventDefault();
    getData();
})


function getData() {
    let categories = [];
    $(".category input:checked").each(function(){
        categories.push($(this).val());
    });

    let styles = [];
    $(".style input:checked").each(function(){
        styles.push($(this).val());
    });

    let materials = [];
    $(".material input:checked").each(function(){
        materials.push($(this).val());
    });

    $.ajax({
        url: "../handler/filterHandler.php",
        type: "post",
        async: true,
        data: {categories: categories, styles:styles, materials:materials, priceFrom: priceFrom.val(), priceTo: priceTo.val(), sort:$(".short").val()},
        dataType: "json",
        success: function(data) {
            if (data.length !== 0) {
                showProducts(data);
                showFav();
            } else {
                $(".catalog__products").html("Ничего не найдено");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR,textStatus, errorThrown);
        }
    });
}


function resetAll() {
    $(".filter__check input:checked").prop('checked', false);
    $(".filter__price input").val("");
}